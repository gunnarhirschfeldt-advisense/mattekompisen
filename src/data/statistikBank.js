export const STATISTIK_BANK = [
  // ─── NIVÅ E ───────────────────────────────────────────────────────────────
  {
    id: 'SE1',
    level: 'E',
    subtopic: 'diagram',
    type: 'multiple_choice',
    question:
      'I en undersökning frågades 20 elever om favoritdjur.\n' +
      'Resultaten: Katt: 8 elever, Hund: 6 elever, Kanin: 4 elever, Fisk: 2 elever.\n' +
      'Vilket djur är vanligast?',
    figure_svg: null,
    options: ['Katt', 'Hund', 'Kanin', 'Fisk'],
    correct_answer: 'Katt',
    hint: 'Vilket djur har flest elever?',
    evaluation_criteria: null,
  },
  {
    id: 'SE2',
    level: 'E',
    subtopic: 'lägesmått',
    type: 'numeric',
    question: 'Fem vänner har dessa antal böcker hemma: 2, 4, 3, 6, 5.\nVad är medelvärdet?',
    figure_svg: null,
    options: null,
    correct_answer: '4',
    hint: 'Addera alla tal och dela med antalet tal.',
    evaluation_criteria: null,
  },
  {
    id: 'SE3',
    level: 'E',
    subtopic: 'sannolikhet',
    type: 'multiple_choice',
    question:
      'I en påse finns 3 röda och 2 blå kulor.\n' +
      'Du drar en kula utan att titta.\n' +
      'Vilken är sannolikheten att dra en röd kula?',
    figure_svg: null,
    options: ['3/5', '2/5', '1/2', '3/2'],
    correct_answer: '3/5',
    hint: 'Sannolikhet = gynnsamma utfall / totala utfall',
    evaluation_criteria: null,
  },
  {
    id: 'SE4',
    level: 'E',
    subtopic: 'lägesmått',
    type: 'multiple_choice',
    question: 'Här är sju tal i ordning: 3, 5, 7, 8, 10, 12, 15.\nVilket är medianen?',
    figure_svg: null,
    options: ['7', '8', '10', '12'],
    correct_answer: '8',
    hint: 'Medianen är det mittersta talet när talen är ordnade.',
    evaluation_criteria: null,
  },

  // ─── NIVÅ C ───────────────────────────────────────────────────────────────
  {
    id: 'SC1',
    level: 'C',
    subtopic: 'diagram',
    type: 'open',
    question:
      'En klass undersökte favoritfrukt.\n' +
      'Resultaten: Äpple=10, Banan=6, Apelsin=8, Druva=4.\n\n' +
      'Beskriv hur ett korrekt stapeldiagram ska se ut:\n' +
      'Vad bör y-axeln visa, och vilken stapel är högst? Förklara.',
    figure_svg: null,
    options: null,
    correct_answer: 'Y-axeln visar antal elever (0–10, jämna skalsteg). Äpple är högst med 10 elever.',
    hint: 'Tänk på vad y-axeln ska mäta och hur staplarna förhåller sig till varandra.',
    evaluation_criteria:
      'Eleven ska: (1) ange att y-axeln visar antal elever med jämna skalsteg, ' +
      '(2) korrekt identifiera Äpple som högsta stapel (10 elever), ' +
      '(3) förklara att alla staplar ritas i proportion till sina värden.',
  },
  {
    id: 'SC2',
    level: 'C',
    subtopic: 'lägesmått',
    type: 'open',
    question: 'Två lag spelar brädspel fem omgångar. Lag A:s poäng: 2, 3, 4, 5, 36. Lag B:s poäng: 8, 9, 10, 11, 12. (1) Beräkna medelvärdet för varje lag. (2) Beräkna medianen för varje lag. (3) Vilket mått beskriver bäst hur lagen presterar mot varandra — och varför?',
    figure_svg: null,
    options: null,
    correct_answer: null,
    hint: 'Ordna talen i storleksordning för att hitta medianen. Tänk på om något tal sticker ut.',
    evaluation_criteria: 'Eleven ska: (1) beräkna medelvärde A = 50/5 = 10 och medelvärde B = 50/5 = 10 — de är lika, (2) beräkna median A = 4 och median B = 10, (3) argumentera för att medianen beskriver bättre eftersom 36 är ett extremvärde som drar upp medelvärdet för Lag A utan att spegla deras typiska prestation. Godkänt utan ordet "extremvärde" om resonemanget är korrekt. Delvisa poäng om (1) och (2) är rätt men (3) saknas.',
  },
  {
    id: 'SC3',
    level: 'C',
    subtopic: 'sannolikhet',
    type: 'open',
    question:
      'En vanlig tärning kastas en gång.\n' +
      'Förklara varför sannolikheten att få ett jämnt tal (2, 4 eller 6)\n' +
      'är exakt lika stor som sannolikheten att få ett udda tal (1, 3 eller 5).',
    figure_svg: null,
    options: null,
    correct_answer: 'P(jämnt) = 3/6 = 1/2. P(udda) = 3/6 = 1/2. Lika stora eftersom lika många utfall.',
    hint: 'Räkna hur många jämna respektive udda tal det finns av totalt 6 möjliga.',
    evaluation_criteria:
      'Eleven ska: (1) konstatera att det finns 3 jämna och 3 udda tal av 6 möjliga, ' +
      '(2) beräkna 3/6 = 1/2 för vardera, ' +
      '(3) dra slutsatsen att sannolikheterna är lika (1/2 eller 50%). ' +
      'Eleven ska visa beräkningsgången — inte bara slutsvaret.',
  },
  {
    id: 'SC4',
    level: 'C',
    subtopic: 'diagram',
    type: 'open',
    question: 'En klass med 20 elever röstade om favoritfrukt: Äpple = 8 elever, Banan = 6 elever, Apelsin = 4 elever, Päron = 2 elever. Vilket lägesmått passar bäst för att beskriva klassens favorit — typvärde, median eller medelvärde? Förklara varför du väljer det du väljer.',
    figure_svg: null,
    options: null,
    correct_answer: null,
    hint: 'Tänk: är fruktsorter tal på en skala, eller är de kategorier?',
    evaluation_criteria: 'Eleven ska: (1) välja typvärde (äpple, flest röster), (2) förklara att fruktsorter är kategorier — inte tal på en skala — och att man därför inte kan beräkna medelvärde eller median av dem. Godkänt utan facktermen "kategorisk data" om resonemanget är korrekt.',
  },

  // ─── NIVÅ A ───────────────────────────────────────────────────────────────
  {
    id: 'SA1',
    level: 'A',
    subtopic: 'sannolikhet',
    type: 'open',
    question:
      'I ett lotteri är sannolikheten för vinst 20%.\n' +
      'Det finns 160 nitlotter (lotter utan vinst).\n\n' +
      'Hur många lotter finns det sammanlagt i lotteriet?\n' +
      'Visa hur du löser uppgiften och förklara ditt resonemang.',
    figure_svg: null,
    options: null,
    correct_answer: '200 lotter totalt.',
    hint: 'Om vinstchansen är 20%, hur stor del av alla lotter är nitlotter?',
    evaluation_criteria:
      'Fullständig lösning krävs: (1) Inse att 20% vinst → 80% nitlotter, ' +
      '(2) Ställa upp: 80% av totalt antal = 160, dvs 160 / 0,8 = 200, ' +
      '(3) Svar: 200 lotter totalt. ' +
      'Alternativt: 160 utgör 4/5 av totalen → total = 160 × 5/4 = 200. ' +
      'Eleven ska visa beräkningsgången och förklara sambandet mellan vinstchans och nitlotter.',
  },
  {
    id: 'SA2',
    level: 'A',
    subtopic: 'lägesmått',
    type: 'open',
    question:
      'Fem personers åldrar är: 9, 10, 12, 14, 15.\n' +
      'Medelvärdet är 12.\n\n' +
      'En sjätte person tillkommer, och medelvärdet för alla sex\n' +
      'ska fortfarande vara 12.\n' +
      'Vilken ålder måste den sjätte personen ha?\n' +
      'Förklara varför med ett matematiskt resonemang.',
    figure_svg: null,
    options: null,
    correct_answer: '12 år.',
    hint: 'Beräkna vad summan av sex personers åldrar måste vara om medelvärdet är 12.',
    evaluation_criteria:
      'Eleven ska: (1) Beräkna att 6 personers summa vid medelvärde 12 = 72, ' +
      '(2) Beräkna nuvarande summa = 9+10+12+14+15 = 60, ' +
      '(3) Sjätte personen = 72−60 = 12 år. ' +
      'Välutvecklat resonemang (A-nivå): eleven förklarar varför exakt medelvärdet fungerar — ' +
      '"eftersom 12 är exakt medelvärdet förändrar en person med värdet 12 inte medelvärdet." ' +
      'Enbart korrekt svar utan förklaring ger inte A-nivåpoäng.',
  },
];
