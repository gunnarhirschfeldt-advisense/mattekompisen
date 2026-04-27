export const ALGEBRA_BANK = [
  // ─── NIVÅ E ───────────────────────────────────────────────────────────────
  {
    id: 'AE1',
    level: 'E',
    subtopic: 'ekvation',
    type: 'numeric',
    question: 'Lös ekvationen: x + 7 = 15\nVad är x?',
    figure_svg: null,
    options: null,
    correct_answer: '8',
    hint: 'Vad behöver du subtrahera från 15 för att få 7?',
    evaluation_criteria: null,
  },
  {
    id: 'AE2',
    level: 'E',
    subtopic: 'mönster',
    type: 'multiple_choice',
    question:
      'En figursekvens byggs av rutor:\n' +
      'Figur 1 har 3 rutor, Figur 2 har 5 rutor, Figur 3 har 7 rutor.\n' +
      'Hur många rutor har Figur 4?',
    figure_svg: null,
    options: ['8', '9', '10', '11'],
    correct_answer: '9',
    hint: 'Hur många rutor läggs till varje gång?',
    evaluation_criteria: null,
  },
  {
    id: 'AE3',
    level: 'E',
    subtopic: 'ekvation',
    type: 'numeric',
    question: 'Lös: 3 × x = 24\nVad är x?',
    figure_svg: null,
    options: null,
    correct_answer: '8',
    hint: 'Vilket tal gånger 3 ger 24?',
    evaluation_criteria: null,
  },
  {
    id: 'AE4',
    level: 'E',
    subtopic: 'mönster',
    type: 'multiple_choice',
    question: 'Talserie: 2, 5, 8, 11, 14, …\nVilket tal kommer härnäst?',
    figure_svg: null,
    options: ['14', '16', '17', '18'],
    correct_answer: '17',
    hint: 'Hur mycket ökar talen varje steg?',
    evaluation_criteria: null,
  },

  // ─── NIVÅ C ───────────────────────────────────────────────────────────────
  {
    id: 'AC1',
    level: 'C',
    subtopic: 'ekvation',
    type: 'numeric',
    question:
      'Anna har ett okänt antal kronor.\n' +
      'Hon köper en bok för 45 kr och har 30 kr kvar.\n' +
      'Hur mycket hade Anna från början?',
    figure_svg: null,
    options: null,
    correct_answer: '75',
    hint: 'Sätt upp: x − 45 = 30',
    evaluation_criteria: null,
  },
  {
    id: 'AC2',
    level: 'C',
    subtopic: 'mönster',
    type: 'open',
    question:
      'En rad bygger tändstickor:\n' +
      'Figur 1 = 4 tändstickor, Figur 2 = 7 tändstickor, Figur 3 = 10 tändstickor.\n\n' +
      'Hur många tändstickor har Figur 5?\n' +
      'Förklara hur du räknar ut det.',
    figure_svg: null,
    options: null,
    correct_answer: '16 tändstickor.',
    hint: 'Hur mycket ökar antalet tändstickor för varje ny figur?',
    evaluation_criteria:
      'Eleven ska: (1) identifiera att varje ny figur tillförs 3 tändstickor, ' +
      '(2) beräkna Figur 5 = 4 + 4×3 = 16 tändstickor, ' +
      '(3) förklara regeln bakom räkningen (t.ex. "varje ny figur läggs 3 till"). ' +
      'Eleven ska visa beräkningsgången — inte bara slutsvaret.',
  },
  {
    id: 'AC3',
    level: 'C',
    subtopic: 'ekvation',
    type: 'open',
    question:
      '"Jag tänker på ett tal. Om jag multiplicerar det med 4\n' +
      'och sedan subtraherar 6 får jag 18."\n\n' +
      'Skriv en ekvation för detta påstående och lös den.\n' +
      'Visa hur du tänker.',
    figure_svg: null,
    options: null,
    correct_answer: 'x = 6 (ekvation: 4x − 6 = 18)',
    hint: 'Låt x vara det okända talet. Skriv operationerna som en ekvation.',
    evaluation_criteria:
      'Eleven ska: (1) skriva korrekt ekvation: 4x − 6 = 18, ' +
      '(2) lösa: 4x = 24, x = 6, ' +
      '(3) visa lösningsgången steg för steg.',
  },
  {
    id: 'AC4',
    level: 'C',
    subtopic: 'mönster',
    type: 'open',
    question:
      'En tabell visar sambandet mellan x och y:\n' +
      'x=1 ger y=5, x=2 ger y=8, x=3 ger y=11.\n\n' +
      'Vad är y när x=4?\n' +
      'Beskriv sambandet mellan x och y med ord.',
    figure_svg: null,
    options: null,
    correct_answer: 'y=14. Sambandet: y = 3x + 2.',
    hint: 'Hur förändras y när x ökar med 1? Vad är y när x=0?',
    evaluation_criteria:
      'Eleven ska: (1) beräkna y=14 när x=4 — krav för godkänt. ' +
      '(2) Beskriva sambandet — godkänn både algebraisk form (y=3x+2) ' +
      'och beskrivning med ord ("varje gång x ökar med 1 ökar y med 3, ' +
      'och när x är 1 är y 5"). Kräv inte algebraisk notation.',
  },

  // ─── NIVÅ A ───────────────────────────────────────────────────────────────
  {
    id: 'AA1',
    level: 'A',
    subtopic: 'mönster',
    type: 'open',
    question:
      'En figursekvens: Figur 1 har 5 tändstickor, Figur 2 har 8, Figur 3 har 11.\n\n' +
      'a) Hur många tändstickor har Figur 100?\n' +
      'b) Skriv en allmän formel som funkar för vilket figurnummer n som helst.\n' +
      'c) Förklara din formel.',
    figure_svg: null,
    options: null,
    correct_answer: 'a) 302 tändstickor. b) T = 3n + 2. c) Varje ny figur läggs 3 till; Figur 1 börjar med 5 = 3×1+2.',
    hint: 'Gör en tabell: n=1→5, n=2→8, n=3→11. Vad ökar lika mycket varje steg?',
    evaluation_criteria:
      'Fullständig lösning: (1) identifiera att varje ny figur tillförs 3, startantal 5 → ' +
      'formel: 3n+2 (eller 5 + (n−1)×3 = 3n+2), ' +
      '(2) beräkna Figur 100 = 302, ' +
      '(3) förklara formeln med ord: "n är figurnumret, varje figur läggs 3 till, och Figur 1 börjar med 5 som är 3×1+2". ' +
      'A-nivå kräver att eleven formulerar en GENERELL REGEL för godtyckligt n — ' +
      'inte bara beräknar nästa steg. Enbart korrekt svar utan formel ger inte A-nivåpoäng.',
  },
  {
    id: 'AA2',
    level: 'A',
    subtopic: 'ekvation',
    type: 'open',
    question:
      'En rektangel har en längd som är 3 cm längre än bredden.\n' +
      'Arean är 40 cm².\n\n' +
      'a) Skriv en ekvation som beskriver situationen.\n' +
      'b) Förklara hur du skulle gå tillväga för att lösa den.\n' +
      'c) Om du behöver prova dig fram — motivera varför.',
    figure_svg: null,
    options: null,
    correct_answer: 'b = 5 cm, längd = 8 cm. Ekvation: b(b+3) = 40. Prövning: 5×8 = 40 ✓',
    hint: 'Låt b = bredden. Längden = b + 3. Area = b × (b+3).',
    evaluation_criteria:
      'Eleven ska: (1) definiera variabel (t.ex. b = bredd, längd = b+3), ' +
      '(2) sätta upp ekvation: b(b+3) = 40, ' +
      '(3) visa att detta är en andragradsekvation som kräver prövning i åk 6 ' +
      '(b=5 ger 5×8=40 ✓), ' +
      '(4) motivera att man systematiskt provar för att hitta svaret. ' +
      'A-nivå: eleven inser att det handlar om prövning och förklarar logiken bakom. ' +
      'Enbart korrekt svar utan ekvation och förklaring ger inte A-nivåpoäng.',
  },
];
