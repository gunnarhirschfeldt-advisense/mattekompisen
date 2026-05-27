# Mattekompisen

Adaptiv matteövningsapp för åk 6 som förbereder elever inför nationella matematikprovet.  
Byggd med React + Vite, Claude API och Cloudflare Worker-proxy.

**Live:** https://gunnarhirschfeldt-advisense.github.io/mattekompisen/

---

## Funktioner

- **Fem moduler:** Bråk & procent, Geometri, Statistik, Algebra, Taluppfattning
- **Adaptiv svårighet:** Tre nivåer (E → C → A) med automatiska nivåförslag
- **AI-genererade frågor** när frågbanken är slut
- **AI-bedömning** av öppna svar med pedagogisk feedback
- **Handskriftsinmatning:** Rita svar med finger (eller stylus) på iPad — Claude Vision tolkar handskriften
- **Progress i localStorage** — ingen inloggning, ingen backend

---

## Stack

| Del | Teknologi |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| AI | Claude API (`claude-sonnet-4-6`) via Cloudflare Worker |
| Deploy | GitHub Pages via GitHub Actions |
| Lagring | localStorage (per enhet) |

---

## Kom igång lokalt

> **OBS:** Cloudflare Worker-koden (`worker/`) finns inte i repot — den är deployad separat och hanteras utanför versionshanteringen. Kontakta projektägaren för Worker-URL och setup-instruktioner.

```bash
# 1. Installera beroenden
npm install

# 2. Sätt proxy-URL (peka mot befintlig Worker eller lokal wrangler dev)
echo "VITE_PROXY_URL=https://<din-worker>.workers.dev" > .env.development

# 3. Starta dev-server
npm run dev
```

---

## Deploy

### Cloudflare Worker (proxy)
```bash
cd worker/
wrangler secret put ANTHROPIC_KEY     # Anthropic API-nyckel
wrangler secret put ALLOWED_ORIGIN    # https://gunnarhirschfeldt-advisense.github.io
wrangler deploy
```

### GitHub Pages
Sätt `VITE_PROXY_URL` som secret i GitHub-repot (Settings → Secrets → Actions).  
Deploy sker automatiskt vid push till `main`.

---

## Projektstruktur

```
src/
├── api/claudeApi.js          — frågegenerering, bedömning, Vision (handskrift)
├── components/
│   ├── QuestionCard.jsx      — delad frågkomponent (alla moduler)
│   ├── HandwritingCanvas.jsx — rityta med stroke-historik och ångra
│   ├── FeedbackCard.jsx
│   ├── FigureRenderer.jsx    — SVG-validering och rendering
│   ├── [Modul]Module.jsx     — en per ämnesmodul
│   └── ...
├── data/[modul]Bank.js       — statiska frågbankar
├── utils/adaptiveEngine.js   — nivålogik, subtopic-vikter, progress-helpers
└── pages/Startsida.jsx
```

---

## Ny modul — checklista

1. `src/data/[modul]Bank.js` med frågor enligt standardschema
2. `src/components/[Modul]Module.jsx` med `INITIAL_PROGRESS`, `byggPrompt`, `SYSTEM_PROMPT`
3. Lägg till rad i `src/data/moduler.js` med `implementerad: true`
4. Lägg till route i `App.jsx`

Se `CLAUDE.md` för fullständig arkitekturöversikt.
