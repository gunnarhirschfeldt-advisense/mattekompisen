export const GEOMETRI_BANK = [
  // ─── NIVÅ E ───────────────────────────────────────────────────────────────
  {
    id: 'GE1',
    level: 'E',
    subtopic: 'area_omkrets',
    type: 'numeric',
    question: 'Beräkna arean av rektangeln.',
    figure_svg: `<svg width="100%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
  <rect x="60" y="35" width="180" height="120" fill="#f0f0f0" stroke="#555" stroke-width="1.5"/>
  <line x1="60" y1="172" x2="240" y2="172" stroke="#888" stroke-width="1"/>
  <line x1="60" y1="167" x2="60" y2="177" stroke="#888" stroke-width="1"/>
  <line x1="240" y1="167" x2="240" y2="177" stroke="#888" stroke-width="1"/>
  <text x="150" y="192" text-anchor="middle" font-size="12" fill="#666">6 cm</text>
  <line x1="38" y1="35" x2="38" y2="155" stroke="#888" stroke-width="1"/>
  <line x1="33" y1="35" x2="43" y2="35" stroke="#888" stroke-width="1"/>
  <line x1="33" y1="155" x2="43" y2="155" stroke="#888" stroke-width="1"/>
  <text x="22" y="99" text-anchor="middle" font-size="12" fill="#666">4 cm</text>
</svg>`,
    options: null,
    correct_answer: '24',
    hint: 'Area = bredd × höjd',
    evaluation_criteria: null,
  },
  {
    id: 'GE2',
    level: 'E',
    subtopic: 'vinklar',
    type: 'multiple_choice',
    question: 'Vad kallas en vinkel som är exakt 90°?',
    figure_svg: null,
    options: ['Spetsig vinkel', 'Rät vinkel', 'Trubbig vinkel', 'Rak vinkel'],
    correct_answer: 'Rät vinkel',
    hint: 'Tänk på hörnet av ett papper.',
    evaluation_criteria: null,
  },
  {
    id: 'GE3',
    level: 'E',
    subtopic: 'enhetsomvandling',
    type: 'numeric',
    question: 'Hur många gram är 2,5 kg?',
    figure_svg: null,
    options: null,
    correct_answer: '2500',
    hint: '1 kg = 1000 g. Multiplicera med 1000.',
    evaluation_criteria: null,
  },
  {
    id: 'GE4',
    level: 'E',
    subtopic: 'skala',
    type: 'numeric',
    question: 'På en karta är skalan 1:100 000. En sträcka är 3 cm på kartan.\nHur många km är det i verkligheten?',
    figure_svg: null,
    options: null,
    correct_answer: '3',
    hint: '3 cm × 100 000 = 300 000 cm. Omvandla till km: ÷ 100 000.',
    evaluation_criteria: null,
  },

  // ─── NIVÅ C ───────────────────────────────────────────────────────────────
  {
    id: 'GC1',
    level: 'C',
    subtopic: 'area_omkrets',
    type: 'open',
    question: 'Beräkna arean av den rätvinkliga triangeln. Visa hur du räknar.',
    figure_svg: `<svg width="100%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
  <path d="M 62 150 L 238 150 L 62 40 Z" fill="#f0f0f0" stroke="#555" stroke-width="1.5"/>
  <path d="M 62 140 L 72 140 L 72 150" fill="none" stroke="#555" stroke-width="1.2"/>
  <line x1="62" y1="168" x2="238" y2="168" stroke="#888" stroke-width="1"/>
  <line x1="62" y1="163" x2="62" y2="173" stroke="#888" stroke-width="1"/>
  <line x1="238" y1="163" x2="238" y2="173" stroke="#888" stroke-width="1"/>
  <text x="150" y="188" text-anchor="middle" font-size="12" fill="#666">8 cm</text>
  <line x1="40" y1="40" x2="40" y2="150" stroke="#888" stroke-width="1"/>
  <line x1="35" y1="40" x2="45" y2="40" stroke="#888" stroke-width="1"/>
  <line x1="35" y1="150" x2="45" y2="150" stroke="#888" stroke-width="1"/>
  <text x="24" y="100" text-anchor="middle" font-size="12" fill="#666">5 cm</text>
</svg>`,
    options: null,
    correct_answer: '20 cm²',
    hint: 'Area för triangel = (bas × höjd) / 2',
    evaluation_criteria:
      'Eleven ska skriva formeln och visa uträkningen — inte bara svaret. ' +
      'Eleven ska visa beräkningsgången (formel → insättning → svar).',
  },
  {
    id: 'GC2',
    level: 'C',
    subtopic: 'vinklar',
    type: 'open',
    question: 'Beräkna den okända vinkeln i triangeln. Förklara varför.',
    figure_svg: `<svg width="100%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
  <path d="M 65 165 L 230 165 L 140 42 Z" fill="#f0f0f0" stroke="#555" stroke-width="1.5"/>
  <text x="86" y="153" text-anchor="start" font-size="13" fill="#444" font-weight="600">60°</text>
  <text x="209" y="153" text-anchor="end" font-size="13" fill="#444" font-weight="600">75°</text>
  <text x="140" y="32" text-anchor="middle" font-size="18" fill="#E8593C" font-weight="800">?</text>
</svg>`,
    options: null,
    correct_answer: '45°',
    hint: 'Vinkelsumman i en triangel är alltid 180°.',
    evaluation_criteria:
      'Eleven ska använda vinkelsumman 180° och visa subtraktionen. ' +
      'Eleven ska förklara VAD vinkelsumman innebär — inte bara räkna. ' +
      'Godkänt: "En triangels tre vinklar summerar alltid till 180°. 180−60−75=45°."',
  },
  {
    id: 'GC3',
    level: 'C',
    subtopic: 'enhetsomvandling',
    type: 'open',
    question: 'En recept kräver 1,5 liter mjölk. Du har 3 förpackningar på 4 dl vardera.\nRäcker det? Visa hur du räknar.',
    figure_svg: null,
    options: null,
    correct_answer: 'Nej, 3 × 4 dl = 12 dl = 1,2 l. Det saknas 3 dl.',
    hint: 'Omvandla allt till samma enhet. 1 liter = 10 dl.',
    evaluation_criteria:
      'Eleven ska omvandla enheter, räkna ut totalen och jämföra med 1,5 l. ' +
      'Eleven ska visa beräkningsgången och förklara vad skalan (1 liter = 10 dl) innebär.',
  },
  {
    id: 'GC4',
    level: 'C',
    subtopic: 'skala',
    type: 'open',
    question: 'På en ritning är skalan 1:50. Ett rum är 6 cm × 4 cm på ritningen.\nHur stor är rummet i verkligheten i kvadratmeter? Visa uträkningen.',
    figure_svg: null,
    options: null,
    correct_answer: '6 m²',
    hint: 'Omvandla måtten först: 6 cm × 50 = 300 cm = 3 m. Sedan: vad blir 4 cm × 50?',
    evaluation_criteria:
      'Eleven ska omvandla båda måtten med skalan och sedan beräkna arean. ' +
      'Eleven ska förklara vad skalan innebär (t.ex. "1 cm på ritningen = 50 cm i verkligheten") ' +
      'och visa beräkningsgången steg för steg.',
  },

  // ─── NIVÅ A ───────────────────────────────────────────────────────────────

  // A1 — Sammansatt figur: L-form
  {
    id: 'GA1',
    level: 'A',
    subtopic: 'area_omkrets',
    type: 'open',
    question:
      'En L-formad figur har följande mått:\n' +
      'Hela bredden längst ner är 10 cm.\n' +
      'Hela höjden till vänster är 8 cm.\n' +
      'Från det övre högra hörnet är en rektangel\n' +
      'borttagen — 4 cm bred och 3 cm hög.\n\n' +
      'a) Beräkna arean.\n' +
      'b) Beräkna omkretsen.\n' +
      'c) Förklara varför omkretsen inte är samma som\n' +
      '   summan av de två rektanglarnas omkretsar.',
    figure_svg: `<svg width="100%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
  <path d="M 55 35 L 55 175 L 235 175 L 235 75 L 171 75 L 171 35 Z"
        fill="#f0f0f0" stroke="#555" stroke-width="1.5"/>
  <line x1="55" y1="190" x2="235" y2="190" stroke="#888" stroke-width="1"/>
  <line x1="55" y1="185" x2="55" y2="195" stroke="#888" stroke-width="1"/>
  <line x1="235" y1="185" x2="235" y2="195" stroke="#888" stroke-width="1"/>
  <text x="145" y="208" text-anchor="middle" font-size="12" fill="#666">10 cm</text>
  <line x1="38" y1="35" x2="38" y2="175" stroke="#888" stroke-width="1"/>
  <line x1="33" y1="35" x2="43" y2="35" stroke="#888" stroke-width="1"/>
  <line x1="33" y1="175" x2="43" y2="175" stroke="#888" stroke-width="1"/>
  <text x="20" y="110" text-anchor="middle" font-size="12" fill="#666">8 cm</text>
  <line x1="171" y1="22" x2="235" y2="22" stroke="#888" stroke-width="1"/>
  <line x1="171" y1="17" x2="171" y2="27" stroke="#888" stroke-width="1"/>
  <line x1="235" y1="17" x2="235" y2="27" stroke="#888" stroke-width="1"/>
  <text x="203" y="16" text-anchor="middle" font-size="12" fill="#666">4 cm</text>
  <line x1="248" y1="35" x2="248" y2="75" stroke="#888" stroke-width="1"/>
  <line x1="243" y1="35" x2="253" y2="35" stroke="#888" stroke-width="1"/>
  <line x1="243" y1="75" x2="253" y2="75" stroke="#888" stroke-width="1"/>
  <text x="266" y="59" text-anchor="middle" font-size="12" fill="#666">3 cm</text>
</svg>`,
    options: null,
    correct_answer: 'Area: 68 cm². Omkrets: 34 cm.',
    hint: 'Area: hela rektangeln (10×8) minus borttaget hörn (4×3). Omkrets: räkna varje yttre kant för sig.',
    evaluation_criteria:
      'Eleven ska visa uppdelning av arean, räkna omkretsen kant för kant, och i del c ' +
      'förklara att de inre kanterna försvinner när figurerna sätts ihop. ' +
      'Eleven ska beskriva den generella strategin med ord ' +
      '(t.ex. "Hela rektangeln minus borttaget hörn"). ' +
      'Enbart korrekt svar utan förklaring av strategin ger inte A-nivåpoäng.',
  },

  // A2 — Sammansatt figur: U-form
  {
    id: 'GA2',
    level: 'A',
    subtopic: 'area_omkrets',
    type: 'open',
    question:
      'Ett rum har en U-formad golvyta.\n' +
      'Yttermåtten är 12 cm breda och 10 cm höga.\n' +
      'Mittendelen som saknas är 6 cm bred och 5 cm djup\n' +
      '(räknat uppifrån).\n\n' +
      'a) Beräkna golvytan.\n' +
      'b) Beräkna omkretsen av golvytan.\n' +
      'c) Visa alla beräkningssteg.',
    figure_svg: `<svg width="100%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
  <path d="M 55 35 L 55 185 L 235 185 L 235 35 L 190 35 L 190 110 L 100 110 L 100 35 Z"
        fill="#f0f0f0" stroke="#555" stroke-width="1.5"/>
  <line x1="100" y1="35" x2="190" y2="35"
        stroke="#aaa" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="55" y1="200" x2="235" y2="200" stroke="#888" stroke-width="1"/>
  <line x1="55" y1="195" x2="55" y2="205" stroke="#888" stroke-width="1"/>
  <line x1="235" y1="195" x2="235" y2="205" stroke="#888" stroke-width="1"/>
  <text x="145" y="216" text-anchor="middle" font-size="12" fill="#666">12 cm</text>
  <line x1="38" y1="35" x2="38" y2="185" stroke="#888" stroke-width="1"/>
  <line x1="33" y1="35" x2="43" y2="35" stroke="#888" stroke-width="1"/>
  <line x1="33" y1="185" x2="43" y2="185" stroke="#888" stroke-width="1"/>
  <text x="22" y="114" text-anchor="middle" font-size="12" fill="#666">10 cm</text>
  <line x1="100" y1="22" x2="190" y2="22" stroke="#888" stroke-width="1"/>
  <line x1="100" y1="17" x2="100" y2="27" stroke="#888" stroke-width="1"/>
  <line x1="190" y1="17" x2="190" y2="27" stroke="#888" stroke-width="1"/>
  <text x="145" y="16" text-anchor="middle" font-size="12" fill="#666">6 cm</text>
  <line x1="248" y1="35" x2="248" y2="110" stroke="#888" stroke-width="1"/>
  <line x1="243" y1="35" x2="253" y2="35" stroke="#888" stroke-width="1"/>
  <line x1="243" y1="110" x2="253" y2="110" stroke="#888" stroke-width="1"/>
  <text x="268" y="77" text-anchor="middle" font-size="12" fill="#666">5 cm</text>
</svg>`,
    options: null,
    correct_answer: 'Golvyta: 12×10 − 6×5 = 90 cm². Omkrets: 54 cm.',
    hint: 'Area: hela rektangeln minus mittendelen. Omkrets: räkna varje yttre kant separat — rita ut dem.',
    evaluation_criteria:
      'Eleven ska explicit visa hur figuren delas upp. Korrekt area med uträkning ger ' +
      'C-poäng. Full poäng kräver även korrekt omkrets med alla kanter redovisade. ' +
      'Eleven ska beskriva den generella strategin med ord ' +
      '(t.ex. "Subtrahera den urtagda ytan från hela rektangeln"). ' +
      'Enbart korrekt svar utan förklaring av strategin ger inte A-nivåpoäng.',
  },

  // A3 — Omvänd area
  {
    id: 'GA3',
    level: 'A',
    subtopic: 'area_omkrets',
    type: 'open',
    figure_svg: null,
    question:
      'a) En rektangel har arean 72 cm² och\n' +
      '   ena sidan är 8 cm. Hur lång är den andra sidan?\n\n' +
      'b) En rätvinklig triangel har arean 30 cm² och\n' +
      '   basen är 12 cm. Hur lång är höjden?\n\n' +
      'c) Förklara med egna ord vad du gör annorlunda i\n' +
      '   dessa uppgifter jämfört med vanliga areaberäkningar.',
    options: null,
    correct_answer: 'a) 9 cm. b) 5 cm. c) Istället för att multiplicera delar man — man arbetar baklänges från svaret.',
    hint: 'Skriv upp formeln med ? på rätt plats. Vad behöver du göra med arean för att hitta den okända sidan?',
    evaluation_criteria:
      'Korrekt svar på a och b med uträkning — eleven ska visa beräkningsgången. ' +
      'Del c kräver att eleven visar förståelse för att man arbetar baklänges — ' +
      'inte bara räknar rätt. Välutvecklat resonemang (A-nivå): eleven formulerar ' +
      'den generella strategin ("Skriv formeln med ? och lös baklänges") och ' +
      'motiverar varför den fungerar. Enbart korrekt svar utan strategi ger inte A-nivåpoäng.',
  },

  // A4 — Mönstergeneralisering
  {
    id: 'GA4',
    level: 'A',
    subtopic: 'area_omkrets',
    type: 'open',
    figure_svg: null,
    question:
      'En figurserie byggs av små kvadrater\n' +
      'med sidan 1 cm placerade i en rad:\n' +
      'Figur 1: 1 kvadrat → omkrets 4 cm\n' +
      'Figur 2: 2 kvadrater → omkrets 6 cm\n' +
      'Figur 3: 3 kvadrater → omkrets 8 cm\n\n' +
      'a) Vad är omkretsen för figur 6?\n' +
      'b) Vad är omkretsen för figur 100?\n' +
      'c) Skriv en formel för omkretsen av figur n.\n' +
      'd) Förklara varför formeln fungerar — vad händer\n' +
      '   geometriskt när man lägger till en kvadrat?',
    options: null,
    correct_answer:
      'a) 14 cm. b) 202 cm. c) O = 2n + 2. ' +
      'd) Varje ny kvadrat lägger till 2 cm (en kant på varje sida) eftersom de delade kanterna försvinner inåt.',
    hint: 'Gör en tabell: figur 1→4, 2→6, 3→8. Vad ökar lika mycket varje steg?',
    evaluation_criteria:
      'Del a–b kräver korrekt beräkning med uträkning. ' +
      'Del c kräver en formel med n — enbart beskrivning ger C-poäng. ' +
      'Del d kräver geometrisk förklaring av varför +2 per steg. ' +
      'A-nivå kräver att eleven formulerar en GENERELL REGEL för godtyckligt n ' +
      'och förklarar strategin med ord. Enbart beräkning av nästa steg ger inte A-nivåpoäng.',
  },
];
