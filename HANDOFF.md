# Handoff — Mattekompisen

**Datum:** 2026-04-28  
**Från:** Claude Sonnet 4.6 (session avslutas pga. kontosmigration)  
**Till:** Nästa AI-instans (Claude/Codex) som fortsätter arbetet  
**Live:** https://gunnarhirschfeldt-advisense.github.io/mattekompisen/  
**Repo:** https://github.com/gunnarhirschfeldt-advisense/mattekompisen

---

## Vad appen är

Mattekompisen är en adaptiv matteövningsapp för åk 6 (ca 12 år) i Sverige. Den förbereder elever inför nationella matematikprovet. Fem moduler är implementerade och klara. Appen är live på GitHub Pages och använder Claude API via en Cloudflare Worker-proxy.

Läs `CLAUDE.md` för fullständig arkitektursbeskrivning. Det här dokumentet fokuserar på **vad som gjordes i senaste sessionen** och **vad som är prioriterat härnäst**.

---

## Vad som gjordes i senaste sessionen (2026-04-27/28)

### 1. Handskriftsinmatning (`HandwritingCanvas.jsx` + `QuestionCard.jsx`)
Ny funktion: elever kan rita svar med fingret (iPad utan Apple Pencil).

**Flöde:**
1. Toggle ⌨️/✍️ visas för `numeric`- och `open`-frågor i `QuestionCard`
2. `HandwritingCanvas` renderar en 600×260px canvas med touch/mushändelser
3. Stroke-historik sparas i `useRef` — **Ångra** tar bort senaste drag och ritar om
4. Canvas exporteras som JPEG base64 → `tolkaHandskrift()` i `claudeApi.js`
5. Claude Vision returnerar `{ text: "..." }` → skickas till befintlig `hanteraSvar()`

**Viktigt om canvas-koordinater:**
Canvas har `width={600} height={260}` som logiska pixlar men skalas med `w-full` CSS. Koordinaterna normaliseras via `canvas.getBoundingClientRect()` och `canvas.width / rect.width` — annars hamnar strecken fel på iPad.

### 2. Prompt caching (`claudeApi.js`)
System-promptar skickas nu som array med `cache_control: { type: 'ephemeral' }`:
```js
system: [{ type: 'text', text: systemprompt, cache_control: { type: 'ephemeral' } }]
```
`claude-sonnet-4-6` stödjer detta utan beta-header. **Lägg inte tillbaka `anthropic-beta`-headern** — se gotcha nedan.

### 3. Prompt injection-skydd (`claudeApi.js`)
- `elevensSvar` wrappas i `<elevens_svar>…</elevens_svar>`
- `recentMistakes` wrappas i `<tidigare_misstag>…</tidigare_misstag>`
- `elevensSvar` trunkeras till 2 000 tecken, varje misstag till 200 tecken
- `tolkaHandskrift()` har ett dedikerat `VISION_SYSTEM`-prompt som låser Claude till OCR-rollen

---

## Kritiska gotchas att känna till

### CORS och Cloudflare Worker
Worker-koden finns **inte** i repot. Den är deployad på Cloudflare och tillåter endast headers:
- `Content-Type: application/json`
- `anthropic-version: 2023-06-01`

**Lägg aldrig till nya request-headers i `claudeApi.js` utan att samtidigt uppdatera workerns `Access-Control-Allow-Headers`.** Det här misstaget gjordes 2026-04-27 med `anthropic-beta`-headern och bröt hela API-integrationen. Promptcaching fungerar ändå utan den headern för `claude-sonnet-4-6`.

### `system` som array, inte sträng
`anropa()`-funktionen skickar nu `system` som en array. Anthropic API stödjer båda formaten, men om workern gör någon form av body-parsning kan detta orsaka problem. Funkar idag — var uppmärksam om du ändrar workern.

### Vision-anropet går direkt, ej via `anropa()`
`tolkaHandskrift()` gör ett eget `fetch()` utan prompt caching (bilden är unik varje gång). Det har sitt eget `VISION_SYSTEM`-prompt och **inget** `cache_control`. Håll det separerat.

### `recentMistakes` är en persistent injection-vektor
Elevens råa svar lagras (filtrerat) i `recentMistakes` i localStorage och skickas med varje efterföljande bedömningsanrop. XML-taggarna är skyddet — ta inte bort dem.

---

## Aktuell backlogg (prioritetsordning)

### Hög prioritet
1. **Visa `recentMistakes` för eleven** — i `FeedbackCard` som "Det här har du haft svårt för tidigare". Data finns redan, saknas bara UI.
2. **Fler bankfrågor** — nuvarande banker har 8–10 frågor per modul. Under 10 frågor per nivå (E/C/A) är lite tunt innan Claude tar över genereringen. Sikta på 15+.

### Medel
3. **Progress-sammanfattning på startsidan** — visa % rätt per modul direkt på modulkorten, inte bara "högsta klarade nivå".
4. **Utvärdera Vision-kvalitet i verkligt bruk** — fungerar bra för ensamma siffror, mer osäkert för matematiska uttryck (bråkstreck, potenser, algebraiska uttryck). Kan behöva justerad prompt eller fallback.

### Låg
5. **Fler bankfrågor med SVG-figurer** i Geometri-modulen — de AI-genererade SVG:erna är opålitliga (FigureRenderer har fallback-counter i localStorage `svg_fallback_count`).
6. **TypeScript-migrering** — inte planerat men lyfts av ESLint-config.

---

## Infrastruktur

| Komponent | Var | Status |
|---|---|---|
| Frontend | GitHub Pages | Live, auto-deploy vid push till `main` |
| Cloudflare Worker | Cloudflare (ej i repo) | Deployad, `ANTHROPIC_KEY` + `ALLOWED_ORIGIN` som secrets |
| `VITE_PROXY_URL` | GitHub Secret | Satt sedan 2026-03-19 |

**Lokal utveckling:** Sätt `VITE_PROXY_URL=https://<worker-url>` i `.env.development` och kör `npm run dev`. Worker-URL:en finns i Cloudflare-dashboarden.

---

## Filerna du förmodligen kommer röra

| Fil | Varför |
|---|---|
| `src/api/claudeApi.js` | Alla API-anrop. Ändra prompts här, inte i komponenterna. |
| `src/components/QuestionCard.jsx` | Frågevisning + inputlägen. Dela upp om den växer. |
| `src/components/HandwritingCanvas.jsx` | Canvas-logiken. Stroke-historik i `useRef`. |
| `src/components/FeedbackCard.jsx` | Enkel presentationskomponent, lätt att utöka. |
| `src/utils/adaptiveEngine.js` | Nivålogik. Vältestad, rör den försiktigt. |
| `src/data/[modul]Bank.js` | Lägg till frågor här. Följ exakt samma schema. |
| `src/components/[Modul]Module.jsx` | Modulspecifik logik och system-prompts. |

---

## Kom igång

```bash
git clone https://github.com/gunnarhirschfeldt-advisense/mattekompisen.git
cd mattekompisen
npm install
echo "VITE_PROXY_URL=https://<worker-url>" > .env.development
npm run dev
```

Läs `CLAUDE.md` för fullständig arkitektur och konventioner innan du gör större ändringar.
