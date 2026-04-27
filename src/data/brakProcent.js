// Uppgifter för modulen Bråk & procent
// Typ 1 = Snabbsvar (flerval eller numerisk inmatning, kontrolleras i koden)
// Typ 2 = Redovisning (eleven skriver resonemang, bedöms av Claude)

export const UPPGIFTER = {
  E: [
    // ---- Typ 1: Flerval ----
    {
      id: 'bp-e-1',
      typ: 1,
      variant: 'flerval',
      fråga: 'Vilket bråk är störst?',
      alternativ: ['1/2', '1/3', '1/4', '1/6'],
      svar: '1/2',
      tips: 'Ju större nämnare (siffran under bråkstrecket), desto mindre bitar. Tänk på en pizza — om du delar i 2 bitar är varje bit större än om du delar i 6 bitar.',
    },
    {
      id: 'bp-e-2',
      typ: 1,
      variant: 'flerval',
      fråga: 'Vilket bråk är minst?',
      alternativ: ['3/4', '1/2', '2/8', '3/6'],
      svar: '2/8',
      tips: 'Förenkla bråken: 3/4, 1/2 = 4/8, 2/8, 3/6 = 4/8. Det minsta är det med minst täljare när nämnarna är lika.',
    },
    // ---- Typ 1: Numerisk inmatning ----
    {
      id: 'bp-e-3',
      typ: 1,
      variant: 'numerisk',
      fråga: 'En klass har 20 elever. Hälften är flickor. Hur många procent av klassen är flickor?',
      enhet: '%',
      svar: 50,
      tips: 'Hälften = 1/2. Omvandla till procent: 1/2 = 50/100 = 50 %.',
    },
    {
      id: 'bp-e-4',
      typ: 1,
      variant: 'numerisk',
      fråga: 'Kalle åt 3/4 av en pizza. Hur många procent åt han?',
      enhet: '%',
      svar: 75,
      tips: '3/4 = 3 ÷ 4 = 0,75 = 75 %. Dela täljaren med nämnaren och multiplicera med 100.',
    },
    // ---- Typ 2: Redovisning ----
    {
      id: 'bp-e-5',
      typ: 2,
      fråga:
        'Sätt dessa bråk i storleksordning från minst till störst: 1/4, 2/3, 1/2. Förklara hur du tänkte.',
      exempelsvar: '1/4, 1/2, 2/3',
      modelSvar:
        'Gör bråken till samma nämnare (12): 3/12, 8/12, 6/12. Ordning: 3/12 < 6/12 < 8/12, dvs. 1/4 < 1/2 < 2/3.',
      tips: 'Tips: Gör om bråken så att de har samma nämnare. Då är det lätt att jämföra!',
    },
    // ---- Typ 1: Tallinje ----
    {
      id: 'bp-e-6',
      typ: 1,
      variant: 'flerval',
      fråga: 'Var på tallinjen (0–1) hör bråket 3/4 hemma?',
      alternativ: ['Nära 0', 'Precis på 1/2', 'Lite mer än 3/4 av vägen mot 1', 'Precis på 3/4 av vägen mot 1'],
      svar: 'Precis på 3/4 av vägen mot 1',
      tips: '3/4 betyder att du delar sträckan 0–1 i 4 lika delar och räknar tre steg från 0.',
    },
    // ---- Typ 1: Procent ----
    {
      id: 'bp-e-7',
      typ: 1,
      variant: 'numerisk',
      fråga: 'Det är rea och en jacka kostar normalt 400 kr. Den är nedsatt med 25 %. Hur mycket kostar jackan nu?',
      enhet: 'kr',
      svar: 300,
      tips: '25 % av 400 = 0,25 × 400 = 100 kr rabatt. 400 − 100 = 300 kr.',
    },
  ],
  C: [
    {
      id: 'bp-c-1',
      typ: 1,
      variant: 'numerisk',
      fråga: 'Lisa har sparat 360 kr. Det är 60 % av det hon behöver för en cykel. Hur mycket kostar cykeln?',
      enhet: 'kr',
      svar: 600,
      tips: 'Om 360 kr = 60 % så är 1 % = 360/60 = 6 kr. Hela (100 %) = 6 × 100 = 600 kr.',
    },
    {
      id: 'bp-c-2',
      typ: 2,
      fråga:
        'En klass har 24 elever. 1/3 spelar fotboll, 1/4 spelar basket och resten gör något annat. Hur många elever gör "något annat"? Visa uträkningen.',
      exempelsvar: '10 elever',
      modelSvar:
        '1/3 av 24 = 8 (fotboll), 1/4 av 24 = 6 (basket). 8 + 6 = 14. 24 − 14 = 10 elever gör något annat.',
      tips: 'Räkna ut antalet för fotboll och basket separat, lägg ihop, och subtrahera från 24.',
    },
  ],
  A: [
    {
      id: 'bp-a-1',
      typ: 2,
      fråga:
        'En affär höjer priset med 20 % och sedan sänker de med 20 %. Är slutpriset samma som originalpriset? Förklara varför eller varför inte med ett exempel.',
      exempelsvar: 'Nej, slutpriset är lägre',
      modelSvar:
        'Exempel: originalpris 100 kr. +20 % → 120 kr. −20 % av 120 = 24 → 120 − 24 = 96 kr. Slutpriset 96 kr < 100 kr. Procenten tas på olika belopp.',
      tips: 'Prova med ett konkret pris, t.ex. 100 kr. Hur mycket är 20 % höjning? Sedan 20 % sänkning av det nya priset?',
    },
  ],
};
