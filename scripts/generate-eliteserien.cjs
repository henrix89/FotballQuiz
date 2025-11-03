const fs = require('fs')

const qbasePath = 'public/Qbase.json'
const data = JSON.parse(fs.readFileSync(qbasePath, 'utf8'))

const teams = [
  {
    id: 'bodoglimt',
    name: 'FK Bodø/Glimt',
    city: 'Bodø',
    county: 'Nordland',
    region: 'Nord-Norge',
    stadium: 'Aspmyra stadion',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 8280,
    stadiumOpened: 1966,
    colors: 'gult og svart',
    nickname: 'Glimt',
    supporters: 'Stormen',
    rival: 'Tromsø IL',
    foundedYear: 1916,
    leagueTitles: { count: 3, firstYear: 2020, lastYear: 2023 },
    cupTitles: { count: 2, firstYear: 1975, lastYear: 1993 },
    bestLeagueFinish: { position: 1, years: '2020, 2021 og 2023' },
    notablePlayer: {
      name: 'Runar Berg',
      legacy: 'ble klubbikon som midtbanedirigent og hjemvendt sønn fra Bodø-familien Berg.'
    },
    notableCoach: {
      name: 'Kjetil Knutsen',
      legacy: 'ledet laget til et revolusjonerende seriegull med offensiv fotball i 2020.',
      trophy: 'seriegull i 2020'
    },
    historicMoment: 'Erobringen av klubbens første seriegull i 2020 etter et rekordsterkt poengsnitt.',
    recentHighlight: 'Sikret sitt tredje Eliteserie-gull i 2023 med klubbens høyeste poengsum til nå.',
    identityFact: 'Klubben er kjent for høy tempo-posisjonsfotball og gule drakter som lyser under nordlyset.',
    firstTopFlightSeason: 1977,
    derbyDetail: 'Nord-Norge-derbyet mot Tromsø IL',
    youthProduct: {
      name: 'Patrick Berg',
      note: 'ble kaptein fra egen juniorstall og norsk landslagsspiller.'
    },
    originDetail: 'Ble startet av skolegutter i Bodø som ønsket et rent fotballtilbud i 1916.',
    europeanHighlight: {
      description: 'Kvartfinale i UEFA Europa Conference League mot AS Roma',
      season: '2021/22'
    },
    specialFact: 'Har spilt europakamper i minusgrader på Aspmyra midt på vinteren.',
    coachAchievement: 'Kjetil Knutsen førte klubben til sin første Champions League-kvalifisering i 2021.'
  },
  {
    id: 'brann',
    name: 'SK Brann',
    city: 'Bergen',
    county: 'Vestland',
    region: 'Vestlandet',
    stadium: 'Brann stadion',
    stadiumSurface: 'naturgress',
    stadiumCapacity: 17686,
    stadiumOpened: 1919,
    colors: 'rødt og hvitt',
    nickname: 'Brann',
    supporters: 'Bataljonen',
    rival: 'Viking FK',
    foundedYear: 1908,
    leagueTitles: { count: 3, firstYear: 1961, lastYear: 2007 },
    cupTitles: { count: 7, firstYear: 1923, lastYear: 2023 },
    bestLeagueFinish: { position: 1, years: '1961/62, 1963 og 2007' },
    notablePlayer: {
      name: 'Erik Huseklepp',
      legacy: 'ble publikumsfavoritt og landslagsprofil fra egen klubb.'
    },
    notableCoach: {
      name: 'Mons Ivar Mjelde',
      legacy: 'ledet Brann til seriegull i 2007 etter 44 års ventetid.',
      trophy: 'seriegull i 2007'
    },
    historicMoment: 'Seriegullet i 2007 etter nesten et halvt århundre uten ligatriumf.',
    recentHighlight: 'Tok NM-gull i 2023 og kvalifiserte seg til Conference League.',
    identityFact: 'Klubben er kjent for lidenskapelige bergensere og Brann stadion som fylles i all slags vær.',
    firstTopFlightSeason: 1917,
    derbyDetail: 'Vestlandsderbyet mot Viking',
    youthProduct: {
      name: 'Bård Finne',
      note: 'kom fra Branns ungdomsavdeling og ble toppscorer i 2023.'
    },
    originDetail: 'Oppstod som Sportsklubben Brann av unge bergensere i 1908.',
    europeanHighlight: {
      description: 'UEFA-cup-gruppespill med seier over Dinamo Zagreb',
      season: '2007/08'
    },
    specialFact: 'Supporterne synger "Nystemten" før avspark på Brann stadion.',
    coachAchievement: 'Mons Ivar Mjelde sørget for at gullet kom hem i 2007.'
  },
  {
    id: 'fredrikstad',
    name: 'Fredrikstad FK',
    city: 'Fredrikstad',
    county: 'Østfold',
    region: 'Østlandet',
    stadium: 'Fredrikstad stadion',
    stadiumSurface: 'naturgress',
    stadiumCapacity: 12565,
    stadiumOpened: 2007,
    colors: 'rødt og hvitt',
    nickname: 'FFK',
    supporters: 'Plankehaugen',
    rival: 'Sarpsborg 08',
    foundedYear: 1903,
    leagueTitles: { count: 9, firstYear: 1938, lastYear: 1960 },
    cupTitles: { count: 11, firstYear: 1932, lastYear: 2006 },
    bestLeagueFinish: { position: 1, years: 'en rekke ganger, sist i 1960' },
    notablePlayer: {
      name: 'Per Kristoffersen',
      legacy: 'ble klubbens historiske toppscorer og publikumshelt på 1950-tallet.'
    },
    notableCoach: {
      name: 'Egil "Drillo" Olsen',
      legacy: 'ledet FFK til cupgull i 2006 og etablerte klubben igjen i Eliteserien.',
      trophy: 'cupgull i 2006'
    },
    historicMoment: 'Cupgullet i 2006 på Ullevaal etter seier over Sandefjord.',
    recentHighlight: 'Rykket opp til Eliteserien for 2024 etter sterk OBOS-ligasesong.',
    identityFact: 'Klubben forbindes med plankebyen, hvite drakter og store tradisjoner som norsk topplag.',
    firstTopFlightSeason: 1938,
    derbyDetail: 'Østfold-derbyet mot Sarpsborg 08',
    youthProduct: {
      name: 'Tarik Elyounoussi',
      note: 'fikk sitt gjennombrudd som tenåring i Fredrikstad.'
    },
    originDetail: 'Ble stiftet i 1903 av arbeidere og idrettsfolk ved Fredrikstad Mekaniske Verksted.',
    europeanHighlight: {
      description: 'Spilte Cupvinnercup mot Ajax og slo nederlenderne i 1960/61',
      season: '1960/61'
    },
    specialFact: 'FFK har tatt både serie- og cupgull i samme sesong hele fire ganger.',
    coachAchievement: 'Egil "Drillo" Olsen førte klubben til NM-triumf i 2006.'
  },
  {
    id: 'hamkam',
    name: 'HamKam',
    city: 'Hamar',
    county: 'Innlandet',
    region: 'Østlandet',
    stadium: 'Briskeby stadion',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 8080,
    stadiumOpened: 1936,
    colors: 'grønt og hvitt',
    nickname: 'Kamma',
    supporters: 'Briskebybanden',
    rival: 'Lillestrøm SK',
    foundedYear: 1918,
    leagueTitles: { count: 0 },
    cupTitles: { count: 0 },
    bestLeagueFinish: { position: 3, years: '1970' },
    notablePlayer: {
      name: 'Vegard Skogheim',
      legacy: 'er klubbikon med over 300 kamper og senere trener.'
    },
    notableCoach: {
      name: 'Kjetil Rekdal',
      legacy: 'ledet HamKam til opprykk til Eliteserien i 2021 etter to sterke OBOS-sesonger.',
      trophy: 'opprykk i 2021'
    },
    historicMoment: 'Bronsemedaljen i 1970 som klubbens beste ligaprestasjon.',
    recentHighlight: 'Holdt plassen i Eliteserien 2023 med solid defensiv struktur.',
    identityFact: 'Klubben forbindes med Briskeby, grønne drakter og en sterk lokal identitet i Hamar.',
    firstTopFlightSeason: 1969,
    derbyDetail: 'Mjøs-derbyet mot Raufoss',
    youthProduct: {
      name: 'Ståle Solbakken',
      note: 'fikk sitt gjennombrudd i HamKam før proffspill i Danmark.'
    },
    originDetail: 'Ble stiftet av arbeiderungdom i Hamar i 1918.',
    europeanHighlight: {
      description: 'Deltok i UEFA Intertoto Cup på midten av 2000-tallet',
      season: '2004'
    },
    specialFact: 'Briskeby stadion har tribunene oppkalt etter lokale bydeler.',
    coachAchievement: 'Kjetil Rekdal tok laget tilbake til Eliteserien i 2021.'
  },
  {
    id: 'haugesund',
    name: 'FK Haugesund',
    city: 'Haugesund',
    county: 'Rogaland',
    region: 'Vestlandet',
    stadium: 'Haugesund Sparebank Arena',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 8744,
    stadiumOpened: 1920,
    colors: 'hvitt og blått',
    nickname: 'FKH',
    supporters: 'Måkeberget',
    rival: 'Viking FK',
    foundedYear: 1993,
    leagueTitles: { count: 0 },
    cupTitles: { count: 0 },
    bestLeagueFinish: { position: 4, years: '2013 og 2016' },
    notablePlayer: {
      name: 'Christian Grindheim',
      legacy: 'ble landslagsspiller og midtbanesjef med røtter i Haugesund.'
    },
    notableCoach: {
      name: 'Jostein Grindhaug',
      legacy: 'har i flere perioder ledet laget til trygt Eliteserienivå og europakvalik.',
      trophy: 'europakvalik i 2013'
    },
    historicMoment: 'Fjerdeplassen i 2013 som ga europacupkvalifisering for første gang.',
    recentHighlight: 'Sikret Eliteserie-plassen i 2023 etter sterk høstspurt.',
    identityFact: 'Klubben bygger på dugnadsånd fra byens gamle klubber Djerv 1919 og Haugar.',
    firstTopFlightSeason: 1997,
    derbyDetail: 'Rogalands-derbyet mot Viking',
    youthProduct: {
      name: 'Kristoffer Velde',
      note: 'ble utviklet i klubben før proffovergang til Lech Poznań.'
    },
    originDetail: 'Ble til gjennom sammenslåingen av Haugar og Djerv 1919 i 1993.',
    europeanHighlight: {
      description: 'Spilte Europa League-playoff etter å ha slått Sarajevo',
      season: '2014/15'
    },
    specialFact: 'Måkeskrik fra havna høres ofte under hjemmekampene på stadion.',
    coachAchievement: 'Jostein Grindhaug tok laget til sin første europakvalik i 2013.'
  },
  {
    id: 'kfumoslo',
    name: 'KFUM Oslo',
    city: 'Oslo',
    county: 'Oslo',
    region: 'Østlandet',
    stadium: 'KFUM-Arena',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 1500,
    stadiumOpened: 2008,
    colors: 'rødt, hvitt og blått',
    nickname: 'Kåffa',
    supporters: 'Kåffa Ultras',
    rival: 'Vålerenga',
    foundedYear: 1939,
    leagueTitles: { count: 0 },
    cupTitles: { count: 0 },
    bestLeagueFinish: { position: 2, years: '2023 i OBOS-ligaen' },
    notablePlayer: {
      name: 'Moses Mawa',
      legacy: 'ble toppscorer for klubben og tok steget til Eliteserien.'
    },
    notableCoach: {
      name: 'Johannes Moesgaard',
      legacy: 'ledet KFUM til historiens første opprykk til Eliteserien i 2023.',
      trophy: 'opprykk i 2023'
    },
    historicMoment: 'Playoff-seieren over Bryne i 2023 som sikret Eliteserie-billetten.',
    recentHighlight: 'Ble nummer to i OBOS-ligaen 2023 og rykket direkte opp.',
    identityFact: 'Klubben er del av KFUM-bevegelsen og kombinerer toppfotball med sosialt arbeid på Ekeberg.',
    firstTopFlightSeason: 2024,
    derbyDetail: 'Oslo-derbyene mot Vålerenga og Lyn',
    youthProduct: {
      name: 'Osame Sahraoui',
      note: 'kom via Kåffas akademi før proffovergang til Heerenveen.'
    },
    originDetail: 'Ble stiftet av unge i Oslo KFUM (YMCA) i 1939.',
    europeanHighlight: {
      description: 'Har ikke spilt europacup, men nådde cupkvartfinale i 2021',
      season: '2021'
    },
    specialFact: 'Logoen viser kors og trekant i tråd med KFUM-bevegelsens symboler.',
    coachAchievement: 'Johannes Moesgaard førte laget til første opprykk i 2023.'
  },
  {
    id: 'kristiansund',
    name: 'Kristiansund BK',
    city: 'Kristiansund',
    county: 'Møre og Romsdal',
    region: 'Midt-Norge',
    stadium: 'Kristiansund stadion',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 4444,
    stadiumOpened: 1950,
    colors: 'mørkeblått og hvitt',
    nickname: 'KBK',
    supporters: 'Den 12. mann',
    rival: 'Molde FK',
    foundedYear: 2003,
    leagueTitles: { count: 0 },
    cupTitles: { count: 0 },
    bestLeagueFinish: { position: 3, years: '2020' },
    notablePlayer: {
      name: 'Amahl Pellegrino',
      legacy: 'ble Eliteseriens toppscorer for KBK i 2020.'
    },
    notableCoach: {
      name: 'Christian Michelsen',
      legacy: 'bygget klubben fra 2. divisjon til bronse i Eliteserien.',
      trophy: 'bronse i 2020'
    },
    historicMoment: 'Bronsemedaljen i 2020 som ga klubben europakvalifisering.',
    recentHighlight: 'Rykket opp igjen til Eliteserien i 2023 etter ett år i OBOS-ligaen.',
    identityFact: 'KBK representerer hele Nordmøre og spiller under mottoet "Sammen e vi sterke".',
    firstTopFlightSeason: 2017,
    derbyDetail: 'Nordvest-derbyet mot Molde',
    youthProduct: {
      name: 'Jesper Isaksen',
      note: 'tok steget fra klubbens akademi til eliteseriefotball.'
    },
    originDetail: 'Ble dannet som en samarbeidsklubb mellom Clausenengen FK og Kristiansund FK.',
    europeanHighlight: {
      description: 'Kvalifiserte seg til Conference League-kvalik som bronsevinner',
      season: '2021/22'
    },
    specialFact: 'Supporterne bruker trommer og nordmørsflagg på Kristiansund stadion.',
    coachAchievement: 'Christian Michelsen førte klubben til bronse i 2020.'
  },
  {
    id: 'lillestrom',
    name: 'Lillestrøm SK',
    city: 'Lillestrøm',
    county: 'Akershus',
    region: 'Østlandet',
    stadium: 'Åråsen stadion',
    stadiumSurface: 'naturgress',
    stadiumCapacity: 12250,
    stadiumOpened: 1951,
    colors: 'gult og svart',
    nickname: 'Fugla',
    supporters: 'Kanari-Fansen',
    rival: 'Vålerenga',
    foundedYear: 1917,
    leagueTitles: { count: 5, firstYear: 1959, lastYear: 1989 },
    cupTitles: { count: 6, firstYear: 1977, lastYear: 2017 },
    bestLeagueFinish: { position: 1, years: '1976, 1977, 1986 og 1989' },
    notablePlayer: {
      name: 'Tom Lund',
      legacy: 'ble værende i LSK hele karrieren og ledet laget til gull.'
    },
    notableCoach: {
      name: 'Arne Erlandsen',
      legacy: 'tok klubben til cupgull i 2007 og europeiske kvalifiseringer.',
      trophy: 'cupgull i 2007'
    },
    historicMoment: 'Seriegullene på 1970-tallet med Tom Lund som stjerne.',
    recentHighlight: 'Spilte cupfinale i 2023 og kvalifiserte seg til Europa via 2022-sesongen.',
    identityFact: 'Klubben forbindes med industrihistorien på Romerike og kanarigule tribuner.',
    firstTopFlightSeason: 1951,
    derbyDetail: 'Hatoppgjøret mot Vålerenga',
    youthProduct: {
      name: 'Erling Knudtzon',
      note: 'fikk eliteseriedebuten for LSK som lokal unggutt.'
    },
    originDetail: 'Ble til da flere lokale klubber slo seg sammen i sagbruksbyen i 1917.',
    europeanHighlight: {
      description: 'Spilte UEFA-cup mot Bordeaux og Newcastle i 2007/08',
      season: '2007/08'
    },
    specialFact: 'Har kanarifugl som maskot og gule tårn rundt Åråsen stadion.',
    coachAchievement: 'Arne Erlandsen sikret klubbens siste cupgull i 2007.'
  },
  {
    id: 'molde',
    name: 'Molde FK',
    city: 'Molde',
    county: 'Møre og Romsdal',
    region: 'Midt-Norge',
    stadium: 'Aker stadion',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 11249,
    stadiumOpened: 1998,
    colors: 'blått og hvitt',
    nickname: 'MFK',
    supporters: 'Tornekrattet',
    rival: 'Rosenborg BK',
    foundedYear: 1911,
    leagueTitles: { count: 5, firstYear: 2011, lastYear: 2022 },
    cupTitles: { count: 5, firstYear: 1994, lastYear: 2022 },
    bestLeagueFinish: { position: 1, years: '2011, 2012, 2014, 2019 og 2022' },
    notablePlayer: {
      name: 'Ole Gunnar Solskjær',
      legacy: 'fikk sitt gjennombrudd i Molde før proffkarrieren i Manchester United.'
    },
    notableCoach: {
      name: 'Erling Moe',
      legacy: 'tok over og vant seriegull i 2019 samt NM-tittel i 2022.',
      trophy: 'seriegull i 2019'
    },
    historicMoment: 'Dobbeltriumfen i 2014 da Molde vant både serie og cup.',
    recentHighlight: 'Vant norgesmesterskapet i 2022 og spilte Europa League-gruppespill i 2023/24.',
    identityFact: 'Klubben omtales som "Rosenes bys stolthet" og spiller på fjordkanten.',
    firstTopFlightSeason: 1974,
    derbyDetail: 'Gullrivalene mot Rosenborg',
    youthProduct: {
      name: 'Eirik Hestad',
      note: 'kom fra klubbens akademi og ble helt i cupfinalen 2013.'
    },
    originDetail: 'Startet som fotballgruppa til Sportsklubben Olymp i 1911 før navnet Molde FK kom.',
    europeanHighlight: {
      description: 'Spilte Champions League-gruppespill mot Real Madrid og Porto',
      season: '1999/2000'
    },
    specialFact: 'Aker stadion ligger ved fjorden med utsikt til Romsdalsalpene.',
    coachAchievement: 'Erling Moe førte Molde til klubbens femte seriegull i 2019.'
  },
  {
    id: 'odd',
    name: 'Odds BK',
    city: 'Skien',
    county: 'Vestfold og Telemark',
    region: 'Østlandet',
    stadium: 'Skagerak Arena',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 12000,
    stadiumOpened: 1923,
    colors: 'hvitt og svart',
    nickname: 'Odd',
    supporters: 'Oddrane',
    rival: 'Pors Grenland',
    foundedYear: 1894,
    leagueTitles: { count: 3, firstYear: 1913, lastYear: 1919 },
    cupTitles: { count: 12, firstYear: 1903, lastYear: 2000 },
    bestLeagueFinish: { position: 1, years: '1913, 1915 og 1919' },
    notablePlayer: {
      name: 'Frode Johnsen',
      legacy: 'ble toppscorer og publikumshelt for klubben på 1990-tallet.'
    },
    notableCoach: {
      name: 'Dag-Eilev Fagermo',
      legacy: 'førte Odd til bronse i 2014 og europeisk kvalik.',
      trophy: 'bronse i 2014'
    },
    historicMoment: 'Cuptriumfen i 2000 som ga Odd sin tolvte NM-tittel.',
    recentHighlight: 'Endte på øvre halvdel i 2023 med unge egenutviklede spillere.',
    identityFact: 'Klubben er en av Norges eldste med røtter i turnforeningen i Skien.',
    firstTopFlightSeason: 1937,
    derbyDetail: 'Telemarks-derbyet mot Pors',
    youthProduct: {
      name: 'Morten Fevang',
      note: 'kom fra klubbens egne rekker og ble nøkkelspiller på midtbanen.'
    },
    originDetail: 'Ble stiftet som Odds Ballklubb av turnere i Skien i 1894.',
    europeanHighlight: {
      description: 'Spilte Europa League-playoff mot Borussia Dortmund',
      season: '2015/16'
    },
    specialFact: 'Odd arrangerte Norges første fotballcup allerede i 1902.',
    coachAchievement: 'Dag-Eilev Fagermo sikret bronse og europaspill i 2014.'
  },
  {
    id: 'rosenborg',
    name: 'Rosenborg BK',
    city: 'Trondheim',
    county: 'Trøndelag',
    region: 'Midt-Norge',
    stadium: 'Lerkendal stadion',
    stadiumSurface: 'naturgress',
    stadiumCapacity: 21421,
    stadiumOpened: 1947,
    colors: 'hvitt og svart',
    nickname: 'RBK',
    supporters: 'Kjernen',
    rival: 'Molde FK',
    foundedYear: 1917,
    leagueTitles: { count: 26, firstYear: 1967, lastYear: 2018 },
    cupTitles: { count: 12, firstYear: 1960, lastYear: 2018 },
    bestLeagueFinish: { position: 1, years: 'blant annet 1992–2004 med 13 strake gull' },
    notablePlayer: {
      name: 'Harald Brattbakk',
      legacy: 'ble klubbens mestscorende spiller med 166 mål.'
    },
    notableCoach: {
      name: 'Nils Arne Eggen',
      legacy: 'sto bak gullrekken på 1990-tallet og Champions League-suksess.',
      trophy: 'seriegull 1992-2002'
    },
    historicMoment: 'Seieren over AC Milan i 1996 som sendte laget til Champions League-sluttspill.',
    recentHighlight: 'Vant cupen i 2018 og kjemper nå for å bygge nytt lag.',
    identityFact: 'Klubben står for trønderfotball i 4-3-3 med hvite drakter og svarte detaljer.',
    firstTopFlightSeason: 1967,
    derbyDetail: 'Gullrivalene mot Molde, ofte kalt "Slaget om Norge".',
    youthProduct: {
      name: 'Per Ciljan Skjelbred',
      note: 'kom fra klubbens akademi og ble landslagskaptein.'
    },
    originDetail: 'Ble stiftet som Arbeidernes Idrettslag Rosenborg i 1917.',
    europeanHighlight: {
      description: 'Spilte Champions League-kvartfinale i 1996/97',
      season: '1996/97'
    },
    specialFact: 'Har egen supportersving på Lerkendal kalt Øvre Øst.',
    coachAchievement: 'Nils Arne Eggen ledet laget til 13 strake seriegull.'
  },
  {
    id: 'sandefjord',
    name: 'Sandefjord Fotball',
    city: 'Sandefjord',
    county: 'Vestfold',
    region: 'Østlandet',
    stadium: 'Release Arena',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 6582,
    stadiumOpened: 2007,
    colors: 'blått og rødt',
    nickname: 'SF',
    supporters: 'Blåhvalane',
    rival: 'Odds BK',
    foundedYear: 1998,
    leagueTitles: { count: 0 },
    cupTitles: { count: 0 },
    bestLeagueFinish: { position: 8, years: '2009' },
    notablePlayer: {
      name: 'Erik Mjelde',
      legacy: 'var kaptein og nøkkelspiller i klubbens tidlige eliteserieår.'
    },
    notableCoach: {
      name: 'Martí Cifuentes',
      legacy: 'innførte ballbesittende stil og sikret Eliteserie-plass i 2020.',
      trophy: 'fornyet kontrakt i 2020'
    },
    historicMoment: 'NM-finalen i 2006 der klubben spilte sin første cupfinale.',
    recentHighlight: 'Sikret ny Eliteserie-kontrakt i 2023 etter kvalik mot KFUM.',
    identityFact: 'Klubben henter hvalfangsttradisjoner med hval i emblemet.',
    firstTopFlightSeason: 2006,
    derbyDetail: 'Vestfold-oppgjøret mot Odd regnes som lokalt derby.',
    youthProduct: {
      name: 'Sander Moen Foss',
      note: 'tok steget fra klubbens akademi til A-laget og U21-landslaget.'
    },
    originDetail: 'Ble til etter et samarbeid mellom Sandefjord BK og IL Runar i 1998.',
    europeanHighlight: {
      description: 'Deltok i Intertoto Cup etter åttendeplassen i 2007',
      season: '2007'
    },
    specialFact: 'Hvalrossen "Guttane" er maskot og symboliserer byens sjøfart.',
    coachAchievement: 'Martí Cifuentes etablerte klubben i Eliteserien med offensiv stil i 2020.'
  },
  {
    id: 'sarpsborg08',
    name: 'Sarpsborg 08',
    city: 'Sarpsborg',
    county: 'Østfold',
    region: 'Østlandet',
    stadium: 'Sarpsborg stadion',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 5700,
    stadiumOpened: 1930,
    colors: 'blått og hvitt',
    nickname: 'S08',
    supporters: 'Fossefallet',
    rival: 'Fredrikstad FK',
    foundedYear: 2008,
    leagueTitles: { count: 0 },
    cupTitles: { count: 0 },
    bestLeagueFinish: { position: 3, years: '2017' },
    notablePlayer: {
      name: 'Kristoffer Zachariassen',
      legacy: 'bidro sterkt med mål i bronseåret 2017 før overgang til RBK.'
    },
    notableCoach: {
      name: 'Geir Bakke',
      legacy: 'tok laget til bronse og Europa League-gruppespill i 2018.',
      trophy: 'bronse i 2017'
    },
    historicMoment: 'Europa League-gruppespillet i 2018/19 med seier over Genk.',
    recentHighlight: 'Ble nummer åtte i 2023 med offensiv stil under Stefan Billborn.',
    identityFact: 'Klubben er et samarbeidsprosjekt fra hele Østfold med fokus på talentutvikling.',
    firstTopFlightSeason: 2011,
    derbyDetail: 'Østfold-derbyet mot Fredrikstad',
    youthProduct: {
      name: 'Jonathan Lindseth',
      note: 'tok steget fra klubbens utviklingsløp til proffspill i CSKA Sofia.'
    },
    originDetail: 'Ble etablert i 2008 da flere klubber i Sarpsborg slo sammen sine A-lag.',
    europeanHighlight: {
      description: 'Europa League-gruppespill med 3–1-seier over Genk',
      season: '2018/19'
    },
    specialFact: 'Supporterne slipper blå konfetti fra "fossen" ved innmarsj.',
    coachAchievement: 'Geir Bakke ledet laget til bronse og Europa i 2017.'
  },
  {
    id: 'stromsgodset',
    name: 'Strømsgodset IF',
    city: 'Drammen',
    county: 'Buskerud',
    region: 'Østlandet',
    stadium: 'Marienlyst stadion',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 8935,
    stadiumOpened: 1924,
    colors: 'mørkeblått og burgunder',
    nickname: 'Godset',
    supporters: 'GodsetUnionen',
    rival: 'Mjøndalen IF',
    foundedYear: 1907,
    leagueTitles: { count: 2, firstYear: 1970, lastYear: 2013 },
    cupTitles: { count: 5, firstYear: 1969, lastYear: 2010 },
    bestLeagueFinish: { position: 1, years: '1970 og 2013' },
    notablePlayer: {
      name: 'Øyvind Storflor',
      legacy: 'var playmakeren som ledet Godset til seriegull i 2013.'
    },
    notableCoach: {
      name: 'Ronny Deila',
      legacy: 'sikret klubbens første ligagull på 43 år i 2013.',
      trophy: 'seriegull i 2013'
    },
    historicMoment: 'Seriegullet i 2013 etter dramatisk avslutning mot Rosenborg.',
    recentHighlight: 'Endte midt på tabellen i 2023 med unge egenutviklede spillere.',
    identityFact: 'Klubben har røtter i Strømsgodset menighet og sterk drammenseridentitet.',
    firstTopFlightSeason: 1967,
    derbyDetail: 'Elveby-derbyet mot Mjøndalen',
    youthProduct: {
      name: 'Martin Ødegaard',
      note: 'debuterte som 15-åring og ble solgt til Real Madrid.'
    },
    originDetail: 'Ble startet av guttegjengen "Firekameratene" i 1907.',
    europeanHighlight: {
      description: 'Spilte Champions League-kvalik mot Steaua Bucuresti etter gullet i 2013',
      season: '2014/15'
    },
    specialFact: 'Tradisjon med å kaste epler til publikum etter hjemmeseirer.',
    coachAchievement: 'Ronny Deila ledet Godset til ligagull i 2013.'
  },
  {
    id: 'tromso',
    name: 'Tromsø IL',
    city: 'Tromsø',
    county: 'Troms og Finnmark',
    region: 'Nord-Norge',
    stadium: 'Alfheim stadion',
    stadiumSurface: 'kunstgress',
    stadiumCapacity: 6801,
    stadiumOpened: 1963,
    colors: 'rødt og hvitt',
    nickname: 'Gutan',
    supporters: 'Isberget',
    rival: 'FK Bodø/Glimt',
    foundedYear: 1920,
    leagueTitles: { count: 0 },
    cupTitles: { count: 2, firstYear: 1986, lastYear: 1996 },
    bestLeagueFinish: { position: 2, years: '2011' },
    notablePlayer: {
      name: 'Sigurd Rushfeldt',
      legacy: 'ble klubbens mestscorende spiller gjennom tidene.'
    },
    notableCoach: {
      name: 'Per-Mathias Høgmo',
      legacy: 'ledet TIL til seriesølv i 2011 og europacup-suksess.',
      trophy: 'seriesølv i 2011'
    },
    historicMoment: 'Sølvsesongen i 2011 og sensasjonsseieren over Chelsea i 1997.',
    recentHighlight: 'Tok bronse i 2023 med et ungt nordnorsk lag.',
    identityFact: 'Verdens nordligste toppklubb spiller under nordlys og midnattssol.',
    firstTopFlightSeason: 1986,
    derbyDetail: 'Nord-Norge-derbyet mot Bodø/Glimt',
    youthProduct: {
      name: 'Morten Gamst Pedersen',
      note: 'fikk sitt gjennombrudd i TIL før karriere i Blackburn.'
    },
    originDetail: 'Ble stiftet som Tromsø Idrettslag i 1920.',
    europeanHighlight: {
      description: 'Slo Chelsea 3–2 på Alfheim i UEFA-cupen',
      season: '1997/98'
    },
    specialFact: 'Har oppvarmet bane som tåler kraftig snøfall vinterstid.',
    coachAchievement: 'Per-Mathias Høgmo ledet laget til seriesølv i 2011.'
  },
  {
    id: 'viking',
    name: 'Viking FK',
    city: 'Stavanger',
    county: 'Rogaland',
    region: 'Vestlandet',
    stadium: 'SR-Bank Arena',
    stadiumSurface: 'naturgress',
    stadiumCapacity: 16300,
    stadiumOpened: 2004,
    colors: 'mørkeblått',
    nickname: 'De mørkeblå',
    supporters: 'VikingHordene',
    rival: 'FK Haugesund',
    foundedYear: 1899,
    leagueTitles: { count: 8, firstYear: 1958, lastYear: 1991 },
    cupTitles: { count: 6, firstYear: 1953, lastYear: 2019 },
    bestLeagueFinish: { position: 1, years: 'flere ganger, sist i 1991' },
    notablePlayer: {
      name: 'Svein Kvia',
      legacy: 'var kaptein og klubbikon i gullperioden på 1970-tallet.'
    },
    notableCoach: {
      name: 'Bjarne Berntsen',
      legacy: 'ledet Viking til cupgull i 2019 og bronse i 2021.',
      trophy: 'cupgull i 2019'
    },
    historicMoment: 'Cupgullet i 2019 og Europa-eventyret som fulgte.',
    recentHighlight: 'Kjempet om seriegull i 2023 og endte på tredjeplass.',
    identityFact: 'Klubben representerer oljebyen og spiller mørkeblått på Jåttåvågen.',
    firstTopFlightSeason: 1937,
    derbyDetail: 'Rogalands-derbyet mot Haugesund og Bryne',
    youthProduct: {
      name: 'Veton Berisha',
      note: 'kom gjennom Vikings junioravdeling og ble landslagsspiss.'
    },
    originDetail: 'Ble startet av skolegutter på Storhaug i 1899 og tok navnet Viking for å symbolisere styrke.',
    europeanHighlight: {
      description: 'Slo Chelsea sammenlagt i UEFA-cupen',
      season: '2002/03'
    },
    specialFact: 'SR-Bank Arena fikk egen jernbanestasjon bygget for kampdager.',
    coachAchievement: 'Bjarne Berntsen ledet Viking til cuptriumf i 2019.'
  }
]

const cities = teams.map(team => team.city)
const stadiums = teams.map(team => team.stadium)
const colorsList = teams.map(team => team.colors)
const nicknames = teams.map(team => team.nickname)
const supportersList = teams.map(team => team.supporters)
const counties = Array.from(new Set(teams.map(team => team.county)))
const bestFinishYearOptions = teams.map(team => team.bestLeagueFinish.years)
const historicMoments = teams.map(team => team.historicMoment)
const recentHighlights = teams.map(team => team.recentHighlight)
const identityFacts = teams.map(team => team.identityFact)
const derbyDetails = teams.map(team => team.derbyDetail)
const originDetails = teams.map(team => team.originDetail)
const europeanHighlights = teams.map(team => team.europeanHighlight.description)
const specialFacts = teams.map(team => team.specialFact)
const notablePlayers = teams.map(team => team.notablePlayer.name)
const notableCoaches = teams.map(team => team.notableCoach.name)
const youthProducts = teams.map(team => team.youthProduct.name)
const rivalNames = teams.map(team => team.name)

const REGION_OPTIONS = ['Nord-Norge', 'Midt-Norge', 'Vestlandet', 'Østlandet', 'Sørlandet']
const COUNTRY_CHOICES = ['Norge', 'Sverige', 'Danmark', 'Finland']
const SURFACE_OPTIONS = ['Naturgress', 'Kunstgress', 'Hybridgress', 'Grus']

function shuffle(array) {
  const clone = [...array]
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[clone[i], clone[j]] = [clone[j], clone[i]]
  }
  return clone
}

function pickDifferent(source, excludeValue, count) {
  const filtered = source.filter(val => val !== excludeValue)
  const unique = [...new Set(filtered)]
  const picks = new Set()
  while (picks.size < count && unique.length > 0) {
    const candidate = unique[Math.floor(Math.random() * unique.length)]
    if (candidate === undefined) break
    picks.add(candidate)
    if (picks.size === unique.length) break
  }
  if (picks.size < count) {
    for (const val of unique) {
      if (picks.size >= count) break
      picks.add(val)
    }
  }
  return Array.from(picks).slice(0, count)
}

function buildQuestion(prompt, correct, wrongs, explanation) {
  const choices = shuffle([correct, ...wrongs])
  return {
    q: prompt,
    choices,
    answerIndex: choices.indexOf(correct),
    explanation,
  }
}

function surfaceLabel(surface) {
  switch (surface) {
    case 'naturgress':
      return 'Naturgress'
    case 'kunstgress':
      return 'Kunstgress'
    case 'hybrid':
    case 'hybridgress':
      return 'Hybridgress'
    default:
      return 'Naturgress'
  }
}

function yearOptions(correctYear, extras = []) {
  const options = new Set([correctYear])
  const deltas = [-15, -10, -5, 5, 10, 15, 20, -20]
  for (const delta of deltas) {
    const candidate = correctYear + delta
    if (candidate > 1800) options.add(candidate)
  }
  for (const extra of extras) {
    if (typeof extra === 'number') options.add(extra)
  }
  return Array.from(options)
}

function numberOptions(correct, pool) {
  const set = new Set(pool)
  set.delete(correct)
  const values = Array.from(set)
  if (values.length < 3) {
    for (let i = 0; values.length < 3; i++) {
      if (i === correct) continue
      if (!values.includes(i)) values.push(i)
    }
  }
  return shuffle(values).slice(0, 3)
}

function createEasyQuestions(team) {
  const easy = []
  const cityWrongs = pickDifferent(cities, team.city, 3)
  const cityPrompts = [
    `I hvilken by holder ${team.name} til?`,
    `Hvor i landet ligger hjemmebasen til ${team.name}?`,
    `Hvilken by er ${team.name} tett knyttet til?`,
  ]
  for (const prompt of cityPrompts) {
    easy.push(
      buildQuestion(prompt, team.city, cityWrongs, `${team.name} kommer fra ${team.city} i ${team.county}.`),
    )
  }

  const stadiumWrongs = pickDifferent(stadiums, team.stadium, 3)
  const stadiumPrompts = [
    `Hva heter hjemmebanen til ${team.name}?`,
    `På hvilken arena spiller ${team.name} sine hjemmekamper?`,
    `Hvilket stadion forbinder du med ${team.name}?`,
  ]
  for (const prompt of stadiumPrompts) {
    easy.push(
      buildQuestion(prompt, team.stadium, stadiumWrongs, `${team.name} spiller hjemmekampene sine på ${team.stadium}.`),
    )
  }

  const colorWrongs = pickDifferent(colorsList, team.colors, 3)
  const colorPrompts = [
    `Hvilke farger kjennetegner draktene til ${team.name}?`,
    `Hvilket fargemønster spiller ${team.name} vanligvis i?`,
    `Hvilke klubbfarger forbindes med ${team.name}?`,
  ]
  for (const prompt of colorPrompts) {
    easy.push(
      buildQuestion(
        prompt,
        team.colors,
        colorWrongs,
        `${team.name} er lett å kjenne igjen i ${team.colors} drakter.`,
      ),
    )
  }

  const nicknameWrongs = pickDifferent(nicknames, team.nickname, 3)
  const nicknamePrompts = [
    `Hva er kallenavnet til ${team.name}?`,
    `Hvilket tilnavn brukes ofte om ${team.name}?`,
    `Hvilket populært navn har supporterne gitt ${team.name}?`,
  ]
  for (const prompt of nicknamePrompts) {
    easy.push(
      buildQuestion(
        prompt,
        team.nickname,
        nicknameWrongs,
        `${team.nickname} er kallenavnet som brukes om ${team.name}.`,
      ),
    )
  }

  const supporterWrongs = pickDifferent(supportersList, team.supporters, 3)
  const supporterPrompts = [
    `Hva heter supportergruppen til ${team.name}?`,
    `Hvilken supporterklubb står på tribunen for ${team.name}?`,
    `Hva kalles fansen som støtter ${team.name}?`,
  ]
  for (const prompt of supporterPrompts) {
    easy.push(
      buildQuestion(
        prompt,
        team.supporters,
        supporterWrongs,
        `${team.supporters} er supporterklubben til ${team.name}.`,
      ),
    )
  }

  const regionWrongs = pickDifferent(REGION_OPTIONS, team.region, 3)
  const regionPrompts = [
    `Hvilken landsdel tilhører ${team.name}?`,
    `Hvilken region i Norge regnes ${team.name} som en del av?`,
    `I hvilken del av landet spiller ${team.name}?`,
  ]
  for (const prompt of regionPrompts) {
    easy.push(
      buildQuestion(
        prompt,
        team.region,
        regionWrongs,
        `${team.name} representerer ${team.region}.`,
      ),
    )
  }

  const countyWrongs = pickDifferent(counties, team.county, 3)
  const countyPrompts = [
    `I hvilket fylke ligger ${team.city}?`,
    `Hvilket fylke er ${team.name} hjemmehørende i?`,
    `Hvor i Norge finner du ${team.city}?`,
  ]
  for (const prompt of countyPrompts) {
    easy.push(
      buildQuestion(
        prompt,
        team.county,
        countyWrongs,
        `${team.city} ligger i ${team.county}.`,
      ),
    )
  }

  const surface = surfaceLabel(team.stadiumSurface)
  const surfaceWrongs = SURFACE_OPTIONS.filter(option => option !== surface).slice(0, 3)
  const surfacePrompts = [
    `Hvilket underlag er det på ${team.stadium}?`,
    `Hva slags dekke spilles hjemmekampene til ${team.name} på?`,
    `Hvilket banedekke møter motstanderne på ${team.stadium}?`,
  ]
  for (const prompt of surfacePrompts) {
    easy.push(
      buildQuestion(
        prompt,
        surface,
        surfaceWrongs,
        `${team.stadium} har ${surface.toLowerCase()} som spilleflate.`,
      ),
    )
  }

  const rivalWrongs = pickDifferent(rivalNames, team.rival, 3)
  const rivalPrompts = [
    `Hvilken klubb regnes som den største rivalen til ${team.name}?`,
    `Hvilket lag møter ${team.name} i sitt mest opphetede derby?`,
    `Hvem er erkerivalen til ${team.name}?`,
  ]
  for (const prompt of rivalPrompts) {
    easy.push(
      buildQuestion(
        prompt,
        team.rival,
        rivalWrongs,
        `Oppgjørene mot ${team.rival} er blant de mest intense for ${team.name}.`,
      ),
    )
  }

  const countryWrongs = COUNTRY_CHOICES.filter(country => country !== 'Norge').slice(0, 3)
  const countryPrompts = [
    `Hvilket land kommer ${team.name} fra?`,
    `I hvilket land spiller ${team.name} sine hjemmekamper?`,
    `Hvor i Skandinavia finner du ${team.name}?`,
  ]
  for (const prompt of countryPrompts) {
    easy.push(
      buildQuestion(prompt, 'Norge', countryWrongs, `${team.name} er en norsk klubb i Eliteserien.`),
    )
  }

  return easy
}

function createMediumQuestions(team) {
  const medium = []

  const foundedChoices = yearOptions(team.foundedYear)
  const foundedWrong = shuffle(foundedChoices.filter(year => year !== team.foundedYear)).slice(0, 3)
  const foundedPrompts = [
    `Når ble ${team.name} stiftet?`,
    `Hvilket år så ${team.name} dagens lys?`,
    `I hvilket år ble ${team.name} grunnlagt?`,
  ]
  for (const prompt of foundedPrompts) {
    medium.push(
      buildQuestion(
        prompt,
        team.foundedYear,
        foundedWrong,
        `${team.name} ble etablert i ${team.foundedYear}.`,
      ),
    )
  }

  const leagueCount = team.leagueTitles.count
  const leagueWrong = numberOptions(leagueCount, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 26])
  const leaguePrompts = [
    `Hvor mange ligatitler har ${team.name} vunnet?`,
    `Hvor mange ganger har ${team.name} blitt seriemester?`,
    `Hvor mange seriegull står ${team.name} bokført med?`,
  ]
  for (const prompt of leaguePrompts) {
    medium.push(
      buildQuestion(
        prompt,
        leagueCount,
        leagueWrong,
        `${team.name} har vunnet ligaen ${leagueCount} ganger.`,
      ),
    )
  }

  const cupCount = team.cupTitles.count || 0
  const cupWrong = numberOptions(cupCount, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  const cupPrompts = [
    `Hvor mange NM-titler har ${team.name}?`,
    `Hvor ofte har ${team.name} vunnet norgesmesterskapet?`,
    `Hvor mange ganger har ${team.name} hevet kongepokalen?`,
  ]
  for (const prompt of cupPrompts) {
    medium.push(
      buildQuestion(
        prompt,
        cupCount,
        cupWrong,
        `${team.name} har ${cupCount} NM-titler.`,
      ),
    )
  }

  const bestPosition = `${team.bestLeagueFinish.position}. plass`
  const positionWrongPool = ['1. plass', '2. plass', '3. plass', '4. plass', '5. plass', '6. plass']
  const positionWrongs = pickDifferent(positionWrongPool, bestPosition, 3)
  const positionPrompts = [
    `Hva er den beste ligaplasseringen til ${team.name}?`,
    `Hvilken plassering er klubbens bestenotering i Eliteserien?`,
    `Hva er topp-plasseringen ${team.name} har oppnådd i ligaen?`,
  ]
  for (const prompt of positionPrompts) {
    medium.push(
      buildQuestion(
        prompt,
        bestPosition,
        positionWrongs,
        `${team.name} sin bestenotering er ${bestPosition}.`,
      ),
    )
  }

  const bestYearsWrongs = pickDifferent(bestFinishYearOptions, team.bestLeagueFinish.years, 3)
  const bestYearsPrompts = [
    `Hvilke år ga ${team.name} sin beste ligaplassering?`,
    `Når oppnådde ${team.name} sin topp-plassering i ligaen?`,
    `Hvilket tidsrom markerer ${team.name} sin beste ligaperiode?`,
  ]
  for (const prompt of bestYearsPrompts) {
    medium.push(
      buildQuestion(
        prompt,
        team.bestLeagueFinish.years,
        bestYearsWrongs,
        `${team.name} nådde sin beste plassering i ${team.bestLeagueFinish.years}.`,
      ),
    )
  }

  const playerWrongs = pickDifferent(notablePlayers, team.notablePlayer.name, 3)
  const playerPrompts = [
    `Hvilken klubbprofil forbindes tett med ${team.name}?`,
    `Hvem regnes som en stor spillerlegende i ${team.name}?`,
    `Hvilken spiller ble et symbol for ${team.name}?`,
  ]
  for (const prompt of playerPrompts) {
    medium.push(
      buildQuestion(
        prompt,
        team.notablePlayer.name,
        playerWrongs,
        `${team.notablePlayer.name} ${team.notablePlayer.legacy}`,
      ),
    )
  }

  const coachWrongs = pickDifferent(notableCoaches, team.notableCoach.name, 3)
  const coachPrompts = [
    `Hvem er trenerprofilen som er sterkest knyttet til ${team.name}?`,
    `Hvilken trener ledet ${team.name} i en storhetstid?`,
    `Hvilken trenerfigur er ikonisk for ${team.name}?`,
  ]
  for (const prompt of coachPrompts) {
    medium.push(
      buildQuestion(
        prompt,
        team.notableCoach.name,
        coachWrongs,
        `${team.notableCoach.name} ${team.notableCoach.legacy}`,
      ),
    )
  }

  const historicWrongs = pickDifferent(historicMoments, team.historicMoment, 3)
  const historicPrompts = [
    `Hvilket høydepunkt står igjen i historieboka til ${team.name}?`,
    `Hva huskes som en stor milepæl for ${team.name}?`,
    `Hvilken historisk bragd trekkes fram når man snakker om ${team.name}?`,
  ]
  for (const prompt of historicPrompts) {
    medium.push(
      buildQuestion(
        prompt,
        team.historicMoment,
        historicWrongs,
        `${team.historicMoment}`,
      ),
    )
  }

  const recentWrongs = pickDifferent(recentHighlights, team.recentHighlight, 3)
  const recentPrompts = [
    `Hva preget ${team.name} sin 2023-sesong?`,
    `Hvilken nylig prestasjon viser formen til ${team.name}?`,
    `Hva var det ferske høydepunktet for ${team.name}?`,
  ]
  for (const prompt of recentPrompts) {
    medium.push(
      buildQuestion(
        prompt,
        team.recentHighlight,
        recentWrongs,
        `${team.recentHighlight}`,
      ),
    )
  }

  const identityWrongs = pickDifferent(identityFacts, team.identityFact, 3)
  const identityPrompts = [
    `Hva kjennetegner identiteten til ${team.name}?`,
    `Hvilket trekk beskriver kulturen til ${team.name}?`,
    `Hva sier man ofte om klubbprofilen til ${team.name}?`,
  ]
  for (const prompt of identityPrompts) {
    medium.push(
      buildQuestion(
        prompt,
        team.identityFact,
        identityWrongs,
        `${team.identityFact}`,
      ),
    )
  }

  return medium
}

function createHardQuestions(team) {
  const hard = []

  const firstSeasonChoices = yearOptions(team.firstTopFlightSeason)
  const firstSeasonWrongs = shuffle(
    firstSeasonChoices.filter(year => year !== team.firstTopFlightSeason),
  ).slice(0, 3)
  const firstSeasonPrompts = [
    `Når spilte ${team.name} sin første sesong på øverste nivå?`,
    `Hvilket år debuterte ${team.name} i toppdivisjonen?`,
    `I hvilket år tok ${team.name} steget inn i Eliteserien for aller første gang?`,
  ]
  for (const prompt of firstSeasonPrompts) {
    hard.push(
      buildQuestion(
        prompt,
        team.firstTopFlightSeason,
        firstSeasonWrongs,
        `${team.name} debuterte i toppdivisjonen i ${team.firstTopFlightSeason}.`,
      ),
    )
  }

  const capacityWrongs = pickDifferent(teams.map(t => t.stadiumCapacity), team.stadiumCapacity, 3)
  const capacityPrompts = [
    `Omtrent hvor mange tilskuere tar ${team.stadium}?`,
    `Hva er kapasiteten på ${team.name} sin hjemmebane?`,
    `Hvor stort publikum kan ${team.stadium} huse?`,
  ]
  for (const prompt of capacityPrompts) {
    hard.push(
      buildQuestion(
        prompt,
        team.stadiumCapacity,
        capacityWrongs,
        `${team.stadium} rommer rundt ${team.stadiumCapacity} tilskuere.`,
      ),
    )
  }

  const openedChoices = yearOptions(team.stadiumOpened)
  const openedWrongs = shuffle(openedChoices.filter(year => year !== team.stadiumOpened)).slice(0, 3)
  const openedPrompts = [
    `Når ble ${team.stadium} først tatt i bruk?`,
    `Hvilket år åpnet ${team.name} sin hjemmebane?`,
    `I hvilket år ble ${team.stadium} innviet?`,
  ]
  for (const prompt of openedPrompts) {
    hard.push(
      buildQuestion(
        prompt,
        team.stadiumOpened,
        openedWrongs,
        `${team.stadium} åpnet i ${team.stadiumOpened}.`,
      ),
    )
  }

  const leagueFirstPrompts = [
    `Når kom ${team.name} sitt første ligagull?`,
    `I hvilket år ble ${team.name} seriemester for aller første gang?`,
    `Hvilket år sikret ${team.name} sitt første seriemesterskap?`,
  ]
  if (team.leagueTitles.count > 0 && team.leagueTitles.firstYear) {
    const leagueFirstChoices = yearOptions(team.leagueTitles.firstYear)
    const leagueFirstWrongs = shuffle(
      leagueFirstChoices.filter(year => year !== team.leagueTitles.firstYear),
    ).slice(0, 3)
    for (const prompt of leagueFirstPrompts) {
      hard.push(
        buildQuestion(
          prompt,
          team.leagueTitles.firstYear,
          leagueFirstWrongs,
          `${team.name} vant sitt første seriegull i ${team.leagueTitles.firstYear}.`,
        ),
      )
    }
  } else {
    const leagueStatements = [
      'Tok sitt første ligagull i 1989',
      'Har vunnet åtte strake seriemesterskap',
      'Ble seriemester første gang i 1953',
    ]
    for (const prompt of leagueFirstPrompts) {
      hard.push(
        buildQuestion(
          prompt,
          'Klubben har aldri vunnet Eliteserien',
          leagueStatements,
          `${team.name} har fortsatt sitt første seriegull til gode.`,
        ),
      )
    }
  }

  const cupLastPrompts = [
    `Når tok ${team.name} sitt siste NM-gull?`,
    `Hvilket år vant ${team.name} norgesmesterskapet sist?`,
    `I hvilket år ble ${team.name} sist cupmester?`,
  ]
  if (team.cupTitles.count > 0 && team.cupTitles.lastYear) {
    const cupLastChoices = yearOptions(team.cupTitles.lastYear)
    const cupLastWrongs = shuffle(
      cupLastChoices.filter(year => year !== team.cupTitles.lastYear),
    ).slice(0, 3)
    for (const prompt of cupLastPrompts) {
      hard.push(
        buildQuestion(
          prompt,
          team.cupTitles.lastYear,
          cupLastWrongs,
          `${team.name} tok sitt siste NM-gull i ${team.cupTitles.lastYear}.`,
        ),
      )
    }
  } else {
    const cupStatements = [
      'Vant NM i 2010',
      'Har sju cupgull totalt',
      'Tok sitt siste NM-gull i 1998',
    ]
    for (const prompt of cupLastPrompts) {
      hard.push(
        buildQuestion(
          prompt,
          'Har fortsatt ikke vunnet norgesmesterskapet',
          cupStatements,
          `${team.name} jakter fortsatt sitt første NM-trofé.`,
        ),
      )
    }
  }

  const derbyWrongs = pickDifferent(derbyDetails, team.derbyDetail, 3)
  const derbyPrompts = [
    `Hva kalles det mest intense derbyet for ${team.name}?`,
    `Hvilket rivaloppgjør er mest kjent for ${team.name}?`,
    `Hva heter det klassiske naboderbyet for ${team.name}?`,
  ]
  for (const prompt of derbyPrompts) {
    hard.push(
      buildQuestion(
        prompt,
        team.derbyDetail,
        derbyWrongs,
        `${team.derbyDetail} er oppgjøret som vekker ekstra følelser for ${team.name}.`,
      ),
    )
  }

  const youthWrongs = pickDifferent(youthProducts, team.youthProduct.name, 3)
  const youthPrompts = [
    `Hvilket talent har ${team.name} utviklet?`,
    `Hvem er et kjent akademiprodukt fra ${team.name}?`,
    `Hvilken spiller fikk sitt gjennombrudd gjennom talentutviklingen til ${team.name}?`,
  ]
  for (const prompt of youthPrompts) {
    hard.push(
      buildQuestion(
        prompt,
        team.youthProduct.name,
        youthWrongs,
        `${team.youthProduct.name} ${team.youthProduct.note}`,
      ),
    )
  }

  const originWrongs = pickDifferent(originDetails, team.originDetail, 3)
  const originPrompts = [
    `Hva kjennetegner oppstarten til ${team.name}?`,
    `Hvordan oppstod ${team.name}?`,
    `Hva er historien bak etableringen av ${team.name}?`,
  ]
  for (const prompt of originPrompts) {
    hard.push(
      buildQuestion(
        prompt,
        team.originDetail,
        originWrongs,
        `${team.originDetail}`,
      ),
    )
  }

  const euroWrongs = pickDifferent(europeanHighlights, team.europeanHighlight.description, 3)
  const euroPrompts = [
    `Hva er ${team.name} sin største europeiske prestasjon?`,
    `Hvilket europaminne står sterkest for ${team.name}?`,
    `Hvilken europeisk bragd huskes best for ${team.name}?`,
  ]
  for (const prompt of euroPrompts) {
    hard.push(
      buildQuestion(
        prompt,
        team.europeanHighlight.description,
        euroWrongs,
        `${team.europeanHighlight.description} i sesongen ${team.europeanHighlight.season}.`,
      ),
    )
  }

  const specialWrongs = pickDifferent(specialFacts, team.specialFact, 3)
  const specialPrompts = [
    `Hva er en unik detalj ved ${team.name}?`,
    `Hvilket særpreg er knyttet til ${team.name}?`,
    `Hvilken spesialitet er typisk for ${team.name}?`,
  ]
  for (const prompt of specialPrompts) {
    hard.push(
      buildQuestion(
        prompt,
        team.specialFact,
        specialWrongs,
        `${team.specialFact}`,
      ),
    )
  }

  return hard
}

for (const team of teams) {
  const easy = createEasyQuestions(team)
  const medium = createMediumQuestions(team)
  const hard = createHardQuestions(team)
  if (!data[team.id]) {
    data[team.id] = { easy: [], medium: [], hard: [] }
  }
  data[team.id].easy = easy
  data[team.id].medium = medium
  data[team.id].hard = hard
}

fs.writeFileSync(qbasePath, JSON.stringify(data, null, 2))
