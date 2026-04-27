export const TALUPPFATTNING_BANK = [
  // ─── NIVÅ E ───────────────────────────────────────────────────────────────
  {
    id: 'TE1',
    level: 'E',
    subtopic: 'aritmetik',
    type: 'numeric',
    question: 'Beräkna: 347 + 285',
    figure_svg: null,
    options: null,
    correct_answer: '632',
    hint: 'Addera hundratal, tiotal och ental var för sig.',
    evaluation_criteria: null,
  },
  {
    id: 'TE2',
    level: 'E',
    subtopic: 'aritmetik',
    type: 'numeric',
    question: 'Beräkna: 12,5 × 4',
    figure_svg: null,
    options: null,
    correct_answer: '50',
    hint: 'Tänk: 12 × 4 = 48, och 0,5 × 4 = 2.',
    evaluation_criteria: null,
  },
  {
    id: 'TE3',
    level: 'E',
    subtopic: 'stora_tal',
    type: 'multiple_choice',
    question: 'En stad har 23,1 miljoner invånare.\nSkriv detta antal med enbart siffror.',
    figure_svg: null,
    options: ['23 100 000', '2 310 000', '231 000 000', '23 100'],
    correct_answer: '23 100 000',
    hint: 'En miljon är 1 000 000.',
    evaluation_criteria: null,
  },
  {
    id: 'TE4',
    level: 'E',
    subtopic: 'rimlighetsbedömning',
    type: 'multiple_choice',
    question: 'Vilket uttryck ger det MINSTA värdet? Använd överslagsräkning.',
    figure_svg: null,
    options: ['198 × 4', '51 × 8', '11 × 31', '99 × 3'],
    correct_answer: '99 × 3',
    hint: 'Avrunda varje tal till närmaste hundra eller tiotal och jämför.',
    evaluation_criteria: null,
  },

  // ─── NIVÅ C ───────────────────────────────────────────────────────────────
  {
    id: 'TC1',
    level: 'C',
    subtopic: 'aritmetik',
    type: 'numeric',
    question: 'En tröja kostar 280 kr. Den är rabatterad med 15%.\nHur mycket kostar tröjan efter rabatten?',
    figure_svg: null,
    options: null,
    correct_answer: '238',
    hint: 'Beräkna 15% av 280 och subtrahera.',
    evaluation_criteria: null,
  },
  {
    id: 'TC2',
    level: 'C',
    subtopic: 'aritmetik',
    type: 'open',
    question:
      'En bil kör 8 liter per mil. En resa är 15 mil.\n' +
      'Bränslet kostar 20 kr per liter.\n\n' +
      'Hur mycket kostar bränslet för resan?\n' +
      'Visa dina beräkningar steg för steg.',
    figure_svg: null,
    options: null,
    correct_answer: '2 400 kr.',
    hint: 'Räkna först ut hur mycket bränsle som behövs totalt.',
    evaluation_criteria:
      'Eleven ska: (1) beräkna totalt bränsle: 8 × 15 = 120 liter, ' +
      '(2) beräkna kostnad: 120 × 20 = 2 400 kr, ' +
      '(3) visa beräkningarna steg för steg. ' +
      'Delvisa poäng om rätt metod men räknefel.',
  },
  {
    id: 'TC3',
    level: 'C',
    subtopic: 'stora_tal',
    type: 'open',
    question:
      'Sveriges befolkning är ungefär 10 miljoner.\n' +
      'Göteborg har ungefär 600 000 invånare.\n\n' +
      'Ungefär hur stor andel (i procent) av Sveriges befolkning bor i Göteborg?\n' +
      'Förklara hur du räknar.',
    figure_svg: null,
    options: null,
    correct_answer: 'Ungefär 6%.',
    hint: 'Dela Göteborgs invånare med Sveriges totala befolkning.',
    evaluation_criteria:
      'Eleven ska: (1) dela Göteborgs invånare med Sveriges befolkning, ' +
      '(2) få ett svar nära 6% — godkänn svar mellan 5% och 7% om ' +
      'beräkningsgången visas. Godkänn "ungefär 6%" och liknande ' +
      'avrundningar. Exakt svar är 6%.',
  },
  {
    id: 'TC4',
    level: 'C',
    subtopic: 'rimlighetsbedömning',
    type: 'open',
    question: 'En elev påstår att 3,2 × 47 ≈ 200. Är det ett rimligt svar? Visa med överslagsräkning och förklara hur du bedömer rimligheten.',
    figure_svg: null,
    options: null,
    correct_answer: null,
    hint: 'Avrunda 3,2 och 47 till enkla tal och räkna.',
    evaluation_criteria: 'Godkänt (C-nivå): Eleven avrundar båda talen (t.ex. 3 × 50 = 150 eller 3 × 47 = 141) och drar slutsatsen att 200 är för högt — inte rimligt. Godkänn svar som visar avrundning + korrekt slutsats. Exakt svar är 150,4. Välutvecklat (A-nivå, ej krav här): eleven förklarar åt vilket håll avrundningsfelen drar och varför 200 är klart för högt.',
  },

  // ─── NIVÅ A ───────────────────────────────────────────────────────────────
  {
    id: 'TA1',
    level: 'A',
    subtopic: 'aritmetik',
    type: 'open',
    question:
      'En affär säljer ägg i kartonger om 6 ägg eller 12 ägg.\n' +
      'Lina vill köpa totalt 60 ägg.\n' +
      'Hon måste köpa minst 2 kartonger av varje storlek.\n\n' +
      'Hur många olika kombinationer av kartonger kan Lina köpa?\n' +
      'Visa hur du löser uppgiften systematiskt.',
    figure_svg: null,
    options: null,
    correct_answer: '3 kombinationer: (2×12 + 6×6), (3×12 + 4×6), (4×12 + 2×6).',
    hint: 'Prova systematiskt: börja med minsta möjliga antal 12-kartong (minst 2).',
    evaluation_criteria:
      'Systematisk lösning krävs: Låt x = antal 12-kartong, y = antal 6-kartong. ' +
      'Villkor: 12x + 6y = 60 → 2x + y = 10. Med x ≥ 2 och y ≥ 2: ' +
      'x=2 ger y=6 ✓, x=3 ger y=4 ✓, x=4 ger y=2 ✓. Svar: 3 kombinationer. ' +
      'A-nivå: eleven visar systematisk genomgång av alla möjligheter och ' +
      'motiverar varför inga fler finns. Enbart svar utan systematik ger inte A-nivåpoäng.',
  },
  {
    id: 'TA2',
    level: 'A',
    subtopic: 'aritmetik',
    type: 'open',
    question:
      '"Dubbla ett tal, lägg sedan till hälften av ursprungstalet.\n' +
      'Resultatet är 75."\n\n' +
      'Vilket är ursprungstalet?\n' +
      'Skriv en ekvation, lös den och förklara varför din lösningsmetod fungerar.',
    figure_svg: null,
    options: null,
    correct_answer: 'Ursprungstalet är 30. Ekvation: 2x + x/2 = 75 → 2,5x = 75 → x = 30.',
    hint: 'Låt x vara ursprungstalet. Dubbla = 2x, hälften = x/2.',
    evaluation_criteria:
      'Eleven ska: (1) sätta upp ekvation: 2x + x/2 = 75 → 2,5x = 75, ' +
      '(2) lösa: x = 30, ' +
      '(3) förklara varför metoden fungerar. ' +
      'A-nivå: eleven inser att "2x + 0,5x = 2,5x" och förklarar att man kan slå ihop termerna. ' +
      'Extra (välutvecklat): verifiera 2×30 + 15 = 75. ' +
      'Enbart korrekt svar utan ekvation och förklaring ger inte A-nivåpoäng.',
  },
];
