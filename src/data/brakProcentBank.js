export const BRAK_PROCENT_BANK = [
  // ─── NIVÅ E ───────────────────────────────────────────────
  {
    id: 'E1',
    level: 'E',
    subtopic: 'jämförelse',
    type: 'multiple_choice',
    question: 'Vilket bråk är störst?',
    figure_svg: null,
    options: ['3/4', '2/3', 'De är lika stora'],
    correct_answer: '3/4',
    hint: 'Tänk: vilket är närmast en hel? Omvandla till procent.',
    evaluation_criteria: null,
  },
  {
    id: 'E2',
    level: 'E',
    subtopic: 'omvandling',
    type: 'numeric',
    question: 'Hur många procent är 1/4?',
    figure_svg: null,
    options: null,
    correct_answer: '25',
    hint: 'Dela täljaren med nämnaren och multiplicera med 100.',
    evaluation_criteria: null,
  },
  {
    id: 'E3',
    level: 'E',
    subtopic: 'tallinje',
    type: 'multiple_choice',
    question: 'En tallinje går från 0 till 1. Var hamnar 3/5?',
    figure_svg: null,
    options: ['0,45', '0,55', '0,60', '0,65', '0,70'],
    correct_answer: '0,60',
    hint: '3/5 = 3 delat med 5. Räkna ut decimaltalet.',
    evaluation_criteria: null,
  },

  // ─── NIVÅ C ───────────────────────────────────────────────
  {
    id: 'C1',
    level: 'C',
    subtopic: 'jämförelse',
    type: 'open',
    question:
      'Sortera dessa bråk från minst till störst och förklara hur du tänker: 5/8, 2/3, 7/12',
    figure_svg: null,
    options: null,
    correct_answer: '7/12, 5/8, 2/3',
    hint: 'Omvandla till gemensam nämnare 24, eller räkna om till procent.',
    evaluation_criteria:
      'Eleven ska visa uträkning eller tydligt resonemang — inte bara lista svaret. ' +
      'Eleven ska namnge eller visa sambandet mellan de jämförda representationerna ' +
      '(t.ex. omvandling till gemensam nämnare, decimalform eller procent) och förklara ' +
      'varför dessa är likvärdiga sätt att uttrycka samma storlek.',
  },
  {
    id: 'C2',
    level: 'C',
    subtopic: 'andel',
    type: 'open',
    question:
      'I en klass är 12 av 30 elever med i en sportaktivitet. Hur stor andel är det i procent? Visa hur du räknar.',
    figure_svg: null,
    options: null,
    correct_answer: '40%',
    hint: 'Skriv det som ett bråk först: 12/30. Förenkla eller dela direkt.',
    evaluation_criteria:
      'Eleven ska visa beräkningssteg: 12/30 = 2/5 = 40% eller 12÷30×100. ' +
      'Eleven ska namnge eller visa sambandet mellan de två representationerna ' +
      '(bråk 12/30 och procent 40%) och förklara att de är samma storlek, bara skriven på olika sätt.',
  },
  {
    id: 'C3',
    level: 'C',
    subtopic: 'tallinje',
    type: 'multiple_choice',
    question:
      'En tallinje går från 0 till 2. Punkt A sitter på 3/4 av vägen till 1. Vilket tal är A?',
    figure_svg: null,
    options: ['1/4', '3/4', '3/2', '6/4'],
    correct_answer: '3/4',
    hint: 'Tallinjen slutar på 2 men A sitter innan 1. Vad är 3/4 av vägen till 1?',
    evaluation_criteria: null,
  },

  // ─── NIVÅ A ───────────────────────────────────────────────
  {
    id: 'A1',
    level: 'A',
    subtopic: 'andel',
    type: 'open',
    question:
      'Sverige tog 8 medaljer: 3 guld, 2 silver, 3 brons.\n' +
      'a) Hur stor andel var guld? Ange som bråk och procent.\n' +
      'b) En kompis säger att "mer än hälften var inte guld". Stämmer det? Förklara.',
    figure_svg: null,
    options: null,
    correct_answer: '3/8 = 37,5%. Ja, 5/8 = 62,5% var inte guld.',
    hint: 'Del a: guld/totalt. Del b: räkna ut hur många som INTE var guld.',
    evaluation_criteria:
      'Korrekt beräkning i del a med bråk OCH procent. ' +
      'Del b kräver välutvecklat resonemang — eleven ska förklara VARFÖR påståendet stämmer, ' +
      'inte bara svara ja/nej. Godkänt: eleven beräknar 5/8 = 62,5% > 50% och förklarar att ' +
      'mer än hälften av medaljerna inte var guld. ' +
      'Ej godkänt: enbart korrekt svar utan förklaring av sambandet.',
  },
  {
    id: 'A2',
    level: 'A',
    subtopic: 'omvandling',
    type: 'open',
    question:
      'En vara kostar 200 kr. Priset höjs med 25%, sedan sänks det nya priset med 25%.\n' +
      'Hamnar du på 200 kr igen?\n' +
      'Förklara varför eller varför inte.',
    figure_svg: null,
    options: null,
    correct_answer: 'Nej: 200×1,25=250, 250×0,75=187,50 kr',
    hint: 'Räkna steg för steg. Är 25% av 250 samma sak som 25% av 200?',
    evaluation_criteria:
      'Eleven ska räkna båda stegen och förklara varför procentbasen förändras. ' +
      'Välutvecklat resonemang (A-nivå): eleven förklarar DET MATEMATISKA SAMBANDET — ' +
      '"25% av en större summa är ett större belopp, så sänkningen tar mer än höjningen gav." ' +
      'Ej godkänt A: enbart korrekt beräkning utan förklaring av varför resultatet inte blir 200.',
  },
  {
    id: 'A3',
    level: 'A',
    subtopic: 'jämförelse',
    type: 'open',
    question:
      'Förklara, utan att omvandla till decimaltal, varför 5/9 är närmast hälften\n' +
      'av de två bråken 5/9 och 3/7.\n' +
      'Använd ett matematiskt resonemang.',
    figure_svg: null,
    options: null,
    correct_answer: null,
    hint: 'Tänk: vad är hälften av 9? Vad är hälften av 7? Hur nära är täljaren?',
    evaluation_criteria:
      'Eleven ska resonera om att 1/2 av 9 är 4,5 — och 5/9 är 0,5 delar över hälften. ' +
      '1/2 av 7 är 3,5 — och 3/7 är också 0,5 delar över hälften. ' +
      'Men en niondel är en MINDRE del än en sjundedel, så 5/9 är närmre hälften. ' +
      'Ej godkänt: enbart decimalberäkning (5÷9≈0,556, 3÷7≈0,429) — ' +
      'uppgiften kräver resonemang om täljare/nämnares inbördes relation.',
  },
];
