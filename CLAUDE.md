# Mattekompisen

Matteövningsapp för åk 6 som förbereder elever inför nationella matematikprovet.
Adaptiv svårighet (E → C → A), AI-driven frågegenerering och bedömning via Claude API.

## Instruktioner för Claude Code

Efter varje slutförd modul eller större förändring:
1. Uppdatera **Modulstatus** i denna fil
2. Lägg till eventuella nya **Arkitekturbeslut**
3. Uppdatera **Nästa steg**

## Stack

- **React 18** + **Vite** — SPA utan router, vy styrs av `modul`-state i App.jsx
- **Tailwind CSS** — utility-first, ingen extern komponentbibliotek
- **Claude API** (`claude-sonnet-4-6`) — två anrop per fråga: generering + bedömning
- **localStorage** — all progress sparas lokalt, ingen backend

## Modulstatus

- [x] Bråk & procent (`brak-procent`) — klar
  - 8 frågor: E1–E3, C1–C3, A1–A2 | subtopics: jämförelse, omvandling, tallinje, procent
- [x] Geometri & mätning (`geometri-matning`) — klar 2026-03-17
  - 10 frågor: GE1–GE4, GC1–GC4, GA1–GA4 | subtopics: area_omkrets, vinklar, enhetsomvandling, skala
  - A-nivå: sammansatt_figur (L/U-form), omvänd_area, mönster_generalisering
  - SVG-figurer inline i bank + Claude-genererade; valideras i FigureRenderer
- [x] Statistik & sannolikhet (`statistik-sannolikhet`) — klar 2026-03-17
  - 10 frågor: SE1–SE4, SC1–SC4, SA1–SA2 | subtopics: diagram, lägesmått, sannolikhet
  - `figure_svg: null` på alla frågor — data beskrivs i text (diagram är för komplexa för M/L-SVG)
- [x] Algebra & mönster (`algebra-monster`) — klar 2026-03-17
  - 10 frågor: AE1–AE4, AC1–AC4, AA1–AA2 | subtopics: ekvation, mönster
  - A-nivå kräver generell formel för godtyckligt n — "enbart korrekt talföljd ger inte A-poäng"
- [x] Taluppfattning & aritmetik (`taluppfattning-aritmetik`) — klar 2026-03-17
  - 10 frågor: TE1–TE4, TC1–TC4, TA1–TA2 | subtopics: aritmetik, stora_tal, rimlighetsbedömning
  - A-nivå betonar systematisk genomgång och metodförklaring

Ny modul aktiveras i `src/data/moduler.js` (`implementerad: true`) och routas i `App.jsx`.

## Arkitekturbeslut

### Adaptiv motor — `src/utils/adaptiveEngine.js`
Fullt generisk: alla funktioner tar `(storageKey, initialProgress, bank)` som parametrar.
- **Tröskel uppgradering:** ≥ 4 rätt av senaste 6, med ≥ 2 olika subtopics i fönstret
- **Tröskel nedgradering:** ≤ 1 rätt av senaste 4
- **Rullande fönster:** `recentResults[]` (max 10, FIFO) — booleans (true=rätt, false=fel)
- **Nivåbyte:** föreslås via `LevelSuggestionModal` — eleven bekräftar eller avfärdar
- **Manuellt:** "För svårt"-knapp (alltid aktiv), "Prova nästa nivå" (aktiv vid ≥ 50% rätt i fönstret, min 2 svar)
- **`consecutiveCorrect` / `consecutiveWrong`:** behålls i progress för bakåtkompatibilitet men används ej längre för nivåbeslut
- **Viktat subtopic-val:** `weight = 1 − (correct / max(attempts, 1))`
- **seenIds:** roterar frågorna i banken, återanvänds inte förrän alla är sedda

### Frågeschema
Alla moduler delar samma grundschema:
```
{ id, level, subtopic, type, question, figure_svg, options, correct_answer, hint, evaluation_criteria }
```
- `type`: `multiple_choice` | `numeric` → rättas i kod; `open` → bedöms av Claude API
- `figure_svg`: SVG-sträng eller `null`. Valideras i FigureRenderer (whitelist + forbidden-check)

### Claude API — `src/api/claudeApi.js`
- **Anrop 1** `genereraFråga(prompt, customSystemPrompt?)` — max 600 tokens, returnerar JSON
- **Anrop 2** `bedömSvar({question, correct_answer, evaluation_criteria, elevensSvar, recentMistakes, level, systemPrompt?})` — max 400 tokens
  - `level` ('E'|'C'|'A') skickas med i user-meddelandet för nivåanpassad feedback
  - `systemPrompt` — modulens egna bedömningsprompt; faller tillbaka på intern fallback om null
  - Returnerar JSON: `{ correct: bool, feedback: string, hint: string|null }`
- JSON-rensning: strippar markdown-fences innan `JSON.parse`

### SVG-figurer
Claude genererar SVG-strängar inline i fråge-JSON (`figure_svg`).
FigureRenderer validerar före rendering:
- Måste börja med `<svg`
- Får ej innehålla: `circle`, `ellipse`, `clipPath`, `linearGradient`, `radialGradient`, `transform=`, `filter`
- Vid fel: fallback-ruta + `console.warn` + räknare i `localStorage["svg_fallback_count"]`
- SVG-regler för Claude: viewBox `0 0 300 220`, tillåtna element `path/line/text/rect`, endast M/L i path

### Progress i localStorage
```js
{
  levels:             { E: { completed, score, total }, C: {...}, A: {...} },
  subtopics:          { [key]: { correct, attempts, lastSeen } },
  recentMistakes:     [],          // max 5 FIFO, skickas till Claude vid bedömning
  recentResults:      [],          // max 10 FIFO, booleans — används av adaptiv motor
  currentLevel:       'E'|'C'|'A',
  seenIds:            [],
  consecutiveCorrect: 0,           // behålls för bakåtkompatibilitet
  consecutiveWrong:   0,           // behålls för bakåtkompatibilitet
}
```
Nycklar: `progress_bråk_procent`, `progress_geometri`, `progress_statistik`, `progress_algebra`, `progress_taluppfattning`

### Startsida — modulkort
`src/data/moduler.js` har `implementerad: true/false`. Oimplementerade moduler renderas som `<div>` (ej klickbara), `opacity-50`, badge "Kommer snart".
Badge på implementerade moduler visar **högsta klarade nivå** (A → C → E, första träff) — inte alltid E.

## Beroenden mellan moduler

```
App.jsx
  └── Startsida.jsx          ← läser framsteg från localStorage via progress.js
  └── BrakProcentModule.jsx  ← storageKey: 'progress_bråk_procent'
  └── GeometriModule.jsx      ← storageKey: 'progress_geometri'
  └── StatistikModule.jsx     ← storageKey: 'progress_statistik'
  └── AlgebraModule.jsx       ← storageKey: 'progress_algebra'
  └── TaluppfattningModule.jsx ← storageKey: 'progress_taluppfattning'
        └── QuestionCard.jsx ← delad av alla moduler
              └── FigureRenderer.jsx
              └── FeedbackCard.jsx
        └── LevelIndicator.jsx
        └── StreakBar.jsx     ← importerar UPGRADE_THRESHOLD, DOWNGRADE_THRESHOLD
        └── SubtopicStrengths.jsx

src/utils/adaptiveEngine.js  ← ingen modul-import, helt generisk
src/api/claudeApi.js         ← ingen modul-import, customSystemPrompt per modul
src/data/moduler.js          ← MODULER-lista med implementerad-flagga
```

**Ny modul kräver:**
1. `src/data/[modul]Bank.js` — frågbank med rätt schema
2. `src/components/[Modul]Module.jsx` — egen `INITIAL_PROGRESS`, `SUBTOPIC_NAMN`, `byggPrompt`, `SYSTEM_PROMPT`
   - **OBS:** `INITIAL_PROGRESS` måste inkludera `recentResults: []`
3. Rad i `moduler.js` med `implementerad: true`
4. Route i `App.jsx`

### Pedagogiska systempromptar per modul
Varje modul har två systemprompt-konstanter:

**Frågegenerering** (`MODUL_FRÅGE_SYSTEM`) — domänspecifika regler för Claude att generera frågor:
- **GeometriModule**: SVG-regler, viewBox 0 0 300 220, tillåtna path-kommandon M/L
- **StatistikModule**: `figure_svg: null` alltid — data beskrivs i text
- **AlgebraModule**: A-nivå kräver generell formel (inte bara nästa tal i följden)
- **TaluppfattningModule**: A-nivå kräver systematisk genomgång + förklaring av VARFÖR metoden fungerar

**Bedömning** (`SYSTEM_PROMPT`) — gemensam struktur för alla moduler, rad 1 anger ämnesområde:
- Returnerar JSON med `correct`, `feedback`, `hint` (hint=null om correct=true)
- Feedback: max 3 meningar, uppmuntrande, börjar med vad eleven gjort rätt
- Hint: en mening som pekar mot rätt tankesätt utan att avslöja svaret
- Nivåanpassning via `level`-parametern: E=enkel bekräftelse, C=lyft fram samband, A=kräv generalisering
- Skickas från modul → QuestionCard (prop `systemPrompt`) → `bedömSvar`

## Deploy

### GitHub Pages
Byggs via `.github/workflows/deploy.yml` vid push till `main` (med ändringar i `mattekompisen/`).
Build-steget kräver GitHub Secret: `VITE_PROXY_URL` = Worker-URL.

### Cloudflare Worker (`worker/`)
Proxy som vidarebefordrar anrop till Anthropic API — API-nyckeln lagras aldrig i webbläsaren.
```
cd worker/
npm install
wrangler secret put ANTHROPIC_KEY     # klistra in Anthropic API-nyckel
wrangler secret put ALLOWED_ORIGIN    # t.ex. https://gunnarhirschfeldt-advisense.github.io
wrangler deploy
```
- **Lokal dev:** `wrangler dev` i `worker/`, sätt `VITE_PROXY_URL=http://localhost:8787` i `mattekompisen/.env.development`
- **API-nyckel:** lagras som Worker-secret `ANTHROPIC_KEY`, exponeras aldrig i klientkod
- **Ursprungskontroll:** Worker-secret `ALLOWED_ORIGIN` = `https://[användarnamn].github.io`

## Nästa steg

**Alla planerade moduler är klara** (2026-03-17). Inga kvarvarande åtgärder i implementationsplanen.

**Backlogg**
- `recentMistakes` visas inte för eleven — kan lyftas in i FeedbackCard som "Det här har du missat"
- Överväg att lägga till fler bankfrågor (>10 per modul) för bredare variation innan AI-generering
- Möjlig förbättring: visa sammanfattning av alla modulers progress på Startsidan
