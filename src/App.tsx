import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
import { CheckCircle2, CircleHelp, Trophy, History, Sparkles, Shield } from 'lucide-react'

type Difficulty = 'easy' | 'medium' | 'hard'
type QuizMode = 'single' | 'mixed'

type StoredQuestion = {
  q: string
  choices: string[]
  answerIndex: number
  explanation?: string
}

type QuizQuestion = StoredQuestion & {
  clubId: string
  clubName: string
  difficulty: Difficulty
}

const CLUBS = [
  { id: 'liverpool', name: 'Liverpool FC', colors: 'from-red-600 to-red-800' },
  { id: 'manutd', name: 'Manchester United', colors: 'from-rose-600 to-rose-800' },
  { id: 'mancty', name: 'Manchester City', colors: 'from-sky-500 to-cyan-700' },
  { id: 'arsenal', name: 'Arsenal', colors: 'from-red-500 to-amber-700' },
  { id: 'chelsea', name: 'Chelsea', colors: 'from-blue-600 to-indigo-800' },
  { id: 'tottenham', name: 'Tottenham Hotspur', colors: 'from-slate-500 to-slate-800' },
  { id: 'barca', name: 'FC Barcelona', colors: 'from-fuchsia-600 to-indigo-700' },
  { id: 'real', name: 'Real Madrid', colors: 'from-zinc-400 to-zinc-700' },
  { id: 'juve', name: 'Juventus', colors: 'from-neutral-200 to-neutral-600' },
  { id: 'milan', name: 'AC Milan', colors: 'from-red-700 to-black' },
]

const CLUB_NAME_BY_ID = CLUBS.reduce<Record<string, string>>((acc, club) => {
  acc[club.id] = club.name
  return acc
}, {})

const CLUB_HISTORIES: Record<string, string> = {
  liverpool:
    "Liverpool FC ble stiftet i 1892 og er en av Englands mest meritterte klubber. Klubben har en stor europeisk historie med flere serievinnende og CL‑titler. Anfield, ’You'll Never Walk Alone’ og epoker med Shankly, Paisley og Klopp preger identiteten.",
  manutd:
    'Manchester Uniteds moderne storhetstid er tett knyttet til Sir Alex Ferguson (1986–2013). Busby Babes, Munich‑ulykken (1958), og treble‑sesongen 1998/99 er milepæler. Old Trafford kalles ‘The Theatre of Dreams’.',
  mancty:
    'Manchester City har hatt en ny gullalder i 2010‑årene og fremover, med flere ligatitler og internasjonal suksess. Klubbens stil har vært preget av ballbesittelse og angrepsvillighet.',
  arsenal:
    'Arsenal er kjent for ‘The Invincibles’ (2003/04) under Arsène Wenger – ubeseiret i ligaen. Flyttet fra Highbury til Emirates Stadium i 2006 og har en lang FA‑cup‑historie.',
  chelsea:
    'Chelsea etablerte seg som en europeisk stormakt fra 2000‑tallet med flere ligatitler og Champions League‑trofeer. Stamford Bridge er hjemmebanen.',
  tottenham:
    'Tottenham har en offensiv tradisjon og cuptitler fra ulike epoker. Klubben åpnet nytt toppmoderne stadion i 2019 og har vært en fast deltaker i europeiske turneringer.',
  barca:
    'FC Barcelona står for ‘més que un club’ og har formet moderne fotball via La Masia og en tydelig posisjonsbasert stil. Pep Guardiola‑årene med Messi, Xavi og Iniesta er legendariske.',
  real:
    'Real Madrid har flest europeiske titler (CL/EC) og en lang liste av stjerner fra Di Stéfano til moderne galácticos. Santiago Bernabéu er et av fotballens templer.',
  juve:
    'Juventus dominerte italiensk fotball i flere perioder og er kjent for sin defensive disiplin, sterke vinnerkultur og ikoniske svarte‑og‑hvite striper.',
  milan:
    'AC Milan har en rik europeisk merittliste, storhetstider under Sacchi og Capello, og har preget italiensk fotball med sterk defensiv struktur og offensive ikoner.',
}

const QUESTION_BANK: Record<string, Record<Difficulty, StoredQuestion[]>> = {
  liverpool: {
    easy: [
      {
        q: 'Hva heter Liverpools hjemmebane?',
        choices: ['Goodison Park', 'Anfield', 'Stamford Bridge', 'Highbury'],
        answerIndex: 1,
        explanation: 'Anfield har vært Liverpools hjemmebane siden 1892.',
      },
      {
        q: 'Hvilken sang forbindes mest med Liverpool?',
        choices: ['Blue Moon', 'Glory Glory Man United', "You'll Never Walk Alone", "I'm Forever Blowing Bubbles"],
        answerIndex: 2,
        explanation: "”You'll Never Walk Alone” synges før kamp og er klubbens uoffisielle hymne.",
      },
    ],
    medium: [
      {
        q: 'Hvem ledet Liverpool til Champions League-triumf i 2019?',
        choices: ['Rafael Benítez', 'Kenny Dalglish', 'Jürgen Klopp', 'Roy Hodgson'],
        answerIndex: 2,
        explanation: 'Jürgen Klopp vant Champions League 2018/19 med Liverpool.',
      },
      {
        q: 'Hvilken legendarisk manager forbindes med Boot Room-tradisjonen?',
        choices: ['Bob Paisley', 'Bill Shankly', 'Joe Fagan', 'Gerard Houllier'],
        answerIndex: 1,
      },
    ],
    hard: [
      {
        q: 'Hvor mange europacup/Champions League-titler hadde Liverpool før 2020-sesongen?',
        choices: ['4', '5', '6', '7'],
        answerIndex: 2,
      },
      {
        q: 'Hvilket lag slo Liverpool i finalen i Istanbul i 2005?',
        choices: ['AC Milan', 'Juventus', 'Real Madrid', 'Bayern München'],
        answerIndex: 0,
        explanation: 'Liverpool slo AC Milan etter straffekonkurranse i 2005.',
      },
    ],
  },
  manutd: {
    easy: [
      {
        q: 'Hvilken manager er mest ikonisk for Uniteds moderne æra?',
        choices: ['Matt Busby', 'Sir Alex Ferguson', 'Louis van Gaal', 'Ron Atkinson'],
        answerIndex: 1,
      },
      {
        q: 'Hva kalles Old Trafford ofte?',
        choices: ['The Dream Factory', 'The Theatre of Dreams', 'The Red Fortress', 'The United Arena'],
        answerIndex: 1,
      },
    ],
    medium: [
      {
        q: 'I hvilket år vant Manchester United the treble (PL, FA-cup og CL)?',
        choices: ['1999', '2008', '1994', '2013'],
        answerIndex: 0,
      },
      {
        q: 'Hvem scoret seiersmålet i Champions League-finalen 1999?',
        choices: ['David Beckham', 'Ryan Giggs', 'Ole Gunnar Solskjær', 'Teddy Sheringham'],
        answerIndex: 2,
      },
    ],
    hard: [
      {
        q: 'Hvilket lag slo United i Europacupfinalen i 1968?',
        choices: ['Real Madrid', 'Benfica', 'Bayern München', 'Celtic'],
        answerIndex: 1,
      },
      {
        q: 'I hvilket år skjedde Munich-ulykken?',
        choices: ['1955', '1958', '1963', '1970'],
        answerIndex: 1,
      },
    ],
  },
  mancty: {
    easy: [
      {
        q: 'Hva er hovedfargen på Manchester Citys hjemmedrakt?',
        choices: ['Rød', 'Lyseblå', 'Hvit', 'Grønn'],
        answerIndex: 1,
      },
      {
        q: 'Hva heter Manchester Citys stadion?',
        choices: ['Stamford Bridge', 'Etihad Stadium', 'Old Trafford', "St James' Park"],
        answerIndex: 1,
      },
    ],
    medium: [
      {
        q: 'Hvem var manager da City satte poengrekord i Premier League 2017/18?',
        choices: ['Manuel Pellegrini', 'Pep Guardiola', 'Roberto Mancini', 'Sven-Göran Eriksson'],
        answerIndex: 1,
      },
      {
        q: 'Hvilken sesong vant City sin første Premier League-tittel i moderne tid?',
        choices: ['2010/11', '2011/12', '2012/13', '2013/14'],
        answerIndex: 1,
      },
    ],
    hard: [
      {
        q: 'Hvem scoret det avgjørende målet mot QPR i 2012 som sikret tittelen?',
        choices: ['Carlos Tévez', 'Edin Džeko', 'Yaya Touré', 'Sergio Agüero'],
        answerIndex: 3,
      },
      {
        q: 'Når ble Manchester City (som Manchester City FC) stiftet?',
        choices: ['1880', '1887', '1894', '1902'],
        answerIndex: 2,
      },
    ],
  },
  arsenal: {
    easy: [
      {
        q: 'Hva er Arsenals kallenavn?',
        choices: ['The Blues', 'The Foxes', 'The Gunners', 'The Citizens'],
        answerIndex: 2,
      },
      {
        q: 'Hva heter Arsenals stadion siden 2006?',
        choices: ['Highbury', 'Emirates Stadium', 'White Hart Lane', 'Craven Cottage'],
        answerIndex: 1,
      },
    ],
    medium: [
      {
        q: 'Hvilken sesong gikk Arsenal ubeseiret i ligaen?',
        choices: ['2001/02', '2003/04', '2005/06', '2015/16'],
        answerIndex: 1,
      },
      {
        q: 'Hvem var Arsenals manager fra 1996 til 2018?',
        choices: ['Arsène Wenger', 'Unai Emery', 'George Graham', 'Mikel Arteta'],
        answerIndex: 0,
      },
    ],
    hard: [
      {
        q: 'Hvem scoret det avgjørende målet for Arsenal på Anfield i 1989?',
        choices: ['Alan Smith', 'David Rocastle', 'Michael Thomas', 'Nigel Winterburn'],
        answerIndex: 2,
      },
      {
        q: 'Hvor mange ligatitler hadde Arsenal før 2020-sesongen?',
        choices: ['10', '13', '15', '18'],
        answerIndex: 1,
      },
    ],
  },
  chelsea: {
    easy: [
      {
        q: 'Hva heter Chelseas hjemmebane?',
        choices: ['Stamford Bridge', 'Loftus Road', 'Selhurst Park', 'Emirates Stadium'],
        answerIndex: 0,
      },
      {
        q: 'Hvilken farge dominerer Chelseas hjemmedrakt?',
        choices: ['Rød', 'Blå', 'Hvit', 'Gul'],
        answerIndex: 1,
      },
    ],
    medium: [
      {
        q: 'Hvilket år vant Chelsea sin første Champions League?',
        choices: ['2008', '2010', '2012', '2015'],
        answerIndex: 2,
      },
      {
        q: 'Hvem kjøpte Chelsea i 2003 og startet klubbens moderne suksess?',
        choices: ['Sheikh Mansour', 'Roman Abramovitsj', 'Todd Boehly', 'Ken Bates'],
        answerIndex: 1,
      },
    ],
    hard: [
      {
        q: 'Hvem scoret den avgjørende straffen i Champions League-finalen 2012?',
        choices: ['Didier Drogba', 'Frank Lampard', 'Juan Mata', 'Fernando Torres'],
        answerIndex: 0,
      },
      {
        q: 'Hvem var manager da Chelsea vant Premier League 2004/05?',
        choices: ['Claudio Ranieri', 'José Mourinho', 'Carlo Ancelotti', 'Guus Hiddink'],
        answerIndex: 1,
      },
    ],
  },
  tottenham: {
    easy: [
      {
        q: 'Hva heter Tottenhams stadion som åpnet i 2019?',
        choices: ['White Hart Lane', 'Tottenham Hotspur Stadium', 'Emirates Stadium', 'London Stadium'],
        answerIndex: 1,
      },
      {
        q: 'Hva er Tottenhams tradisjonelle kallenavn?',
        choices: ['The Blues', 'The Reds', 'Spurs (Lilywhites)', 'The Toffees'],
        answerIndex: 2,
      },
    ],
    medium: [
      {
        q: 'Hvem var manager da Spurs nådde Champions League-finalen i 2019?',
        choices: ['José Mourinho', 'André Villas-Boas', 'Mauricio Pochettino', 'Harry Redknapp'],
        answerIndex: 2,
      },
      {
        q: 'Når vant Tottenham sist FA-cupen?',
        choices: ['1981', '1991', '2001', '2011'],
        answerIndex: 1,
      },
    ],
    hard: [
      {
        q: 'I hvilken sesong tok Tottenham The Double (liga og FA-cup)?',
        choices: ['1950/51', '1960/61', '1970/71', '1980/81'],
        answerIndex: 1,
      },
      {
        q: 'Hvilken legendarisk målscorer bar draktnummer 10 på 1960-tallet?',
        choices: ['Gary Lineker', 'Jimmy Greaves', 'Martin Chivers', 'Glenn Hoddle'],
        answerIndex: 1,
      },
    ],
  },
  barca: {
    easy: [
      {
        q: 'Hva heter FC Barcelonas stadion?',
        choices: ['Santiago Bernabéu', 'Camp Nou', 'Mestalla', 'Montjuïc'],
        answerIndex: 1,
      },
      {
        q: 'Hva kalles Barcelonas tradisjonelle farger?',
        choices: ['Rød og hvit', 'Blå og hvit', 'Blaugrana', 'Sort og gull'],
        answerIndex: 2,
      },
    ],
    medium: [
      {
        q: 'Hva er klubbens motto?',
        choices: ['Sempre Barca', 'Visca Catalunya', 'Més que un club', 'Som i alletiders'],
        answerIndex: 2,
      },
      {
        q: 'Hvem ledet Barcelona i perioden 2008–2012 med enorm suksess?',
        choices: ['Louis van Gaal', 'Pep Guardiola', 'Frank Rijkaard', 'Tito Vilanova'],
        answerIndex: 1,
      },
    ],
    hard: [
      {
        q: 'Hvor mange Ballon d’Or-trofeer hadde Lionel Messi ved inngangen til 2022-sesongen?',
        choices: ['5', '6', '7', '8'],
        answerIndex: 2,
      },
      {
        q: 'I hvilket år ble FC Barcelona grunnlagt?',
        choices: ['1899', '1905', '1911', '1923'],
        answerIndex: 0,
      },
    ],
  },
  real: {
    easy: [
      {
        q: 'Hva er hovedfargen på Real Madrids hjemmedrakt?',
        choices: ['Hvit', 'Blå', 'Rød', 'Svart'],
        answerIndex: 0,
      },
      {
        q: 'Hva heter Real Madrids hjemmebane?',
        choices: ['Wanda Metropolitano', 'Santiago Bernabéu', 'Camp Nou', 'Mestalla'],
        answerIndex: 1,
      },
    ],
    medium: [
      {
        q: 'Hvilket kallenavn brukes om Real Madrids ungdomsakademi?',
        choices: ['La Masia', 'La Fábrica', 'La Cantera', 'La Academia'],
        answerIndex: 1,
      },
      {
        q: 'Hvem var trener da Real Madrid vant La Décima i 2014?',
        choices: ['José Mourinho', 'Vicente del Bosque', 'Carlo Ancelotti', 'Zinedine Zidane'],
        answerIndex: 2,
      },
    ],
    hard: [
      {
        q: 'Hvor mange europacup/Champions League-titler hadde Real Madrid før 2022-sesongen?',
        choices: ['10', '11', '13', '14'],
        answerIndex: 2,
      },
      {
        q: 'Hvilket lag slo Real Madrid i sin første europacupfinale i 1956?',
        choices: ['Stade de Reims', 'AC Milan', 'Eintracht Frankfurt', 'Partizan Beograd'],
        answerIndex: 0,
      },
    ],
  },
  juve: {
    easy: [
      {
        q: 'Hvilke farger er på Juventus sine hjemmedrakter?',
        choices: ['Blå og svart', 'Svart og hvit', 'Rød og gul', 'Grønn og hvit'],
        answerIndex: 1,
      },
      {
        q: 'Hva heter Juventus sin stadion som åpnet i 2011?',
        choices: ['Stadio Olimpico', 'Allianz Stadium', 'San Siro', 'Renzo Barbera'],
        answerIndex: 1,
      },
    ],
    medium: [
      {
        q: 'Hva er Juventus sitt kallenavn?',
        choices: ['I Nerazzurri', 'La Vecchia Signora', 'I Rossoneri', 'Los Blancos'],
        answerIndex: 1,
      },
      {
        q: 'Hvem var trener da Juventus tok tre strake Scudettoer fra 2011/12 til 2013/14?',
        choices: ['Massimiliano Allegri', 'Antonio Conte', 'Fabio Capello', 'Marcello Lippi'],
        answerIndex: 1,
      },
    ],
    hard: [
      {
        q: 'Hvor mange Serie A-titler ble fratatt Juventus i Calciopoli-skandalen?',
        choices: ['1', '2', '3', '4'],
        answerIndex: 1,
      },
      {
        q: 'Hvilket år fant Heysel-tragedien sted under Juventus sin europacupfinale?',
        choices: ['1983', '1985', '1987', '1989'],
        answerIndex: 1,
      },
    ],
  },
  milan: {
    easy: [
      {
        q: 'Hva heter stadionen som AC Milan deler med Inter?',
        choices: ['Stadio Olimpico', 'Allianz Stadium', 'San Siro', 'Stadio Artemio Franchi'],
        answerIndex: 2,
      },
      {
        q: 'Hvilke farger forbindes med AC Milans hjemmedrakter?',
        choices: ['Blå og rød', 'Rød og svart', 'Svart og hvit', 'Gul og grønn'],
        answerIndex: 1,
      },
    ],
    medium: [
      {
        q: 'Hvem ledet AC Milan til europeisk dominans på slutten av 1980-tallet?',
        choices: ['Fabio Capello', 'Arrigo Sacchi', 'Carlo Ancelotti', 'Nereo Rocco'],
        answerIndex: 1,
      },
      {
        q: 'Hvilket trofé vant Milan i 2007 etter finalen mot Liverpool?',
        choices: ['UEFA-cupen', 'Serie A', 'Champions League', 'Coppa Italia'],
        answerIndex: 2,
      },
    ],
    hard: [
      {
        q: 'Hvor mange europacup/Champions League-titler hadde Milan før 2020-sesongen?',
        choices: ['5', '6', '7', '8'],
        answerIndex: 2,
      },
      {
        q: 'Hvilken forsvarskjempe er kjent som “Il Capitano” og spilte over 900 kamper for Milan?',
        choices: ['Franco Baresi', 'Paolo Maldini', 'Alessandro Nesta', 'Thiago Silva'],
        answerIndex: 1,
      },
    ],
  },
}

const QUIZ_MODE_OPTIONS: { value: QuizMode; label: string; description: string }[] = [
  {
    value: 'single',
    label: 'Kun valgt klubb',
    description: 'Spørsmål kun om favorittklubben du har valgt.',
  },
  {
    value: 'mixed',
    label: 'Blandet klubber',
    description: 'Bland spørsmål fra flere klubber i samme quiz.',
  },
]

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; description: string }[] = [
  {
    value: 'easy',
    label: 'Lett',
    description: 'Grunnleggende fakta og kjente høydepunkter.',
  },
  {
    value: 'medium',
    label: 'Middels',
    description: 'For fans som kan klubbhistorien godt.',
  },
  {
    value: 'hard',
    label: 'Vanskelig',
    description: 'Utfordrende for historikere og supernerder.',
  },
]

const DEFAULT_TARGET = 8
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
export default function App() {
  const [clubId, setClubId] = useState<string>(CLUBS[0].id)
  const [customClub, setCustomClub] = useState<string>('')
  const [quizMode, setQuizMode] = useState<QuizMode>('single')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [answers, setAnswers] = useState<number[]>([])
  const [step, setStep] = useState<number>(0)
  const [showResults, setShowResults] = useState(false)
  const [seed, setSeed] = useState(0)

  const pickedClub = useMemo(() => {
    if (customClub.trim().length > 1) {
      return { id: 'custom', name: customClub.trim(), colors: 'from-emerald-500 to-teal-700' }
    }
    return CLUBS.find(c => c.id === clubId) ?? CLUBS[0]
  }, [clubId, customClub])

  useEffect(() => {
    setAnswers([])
    setStep(0)
    setShowResults(false)
    setSeed(s => s + 1)
  }, [quizMode, difficulty, pickedClub.id])

  const questionBank = useMemo<QuizQuestion[]>(() => {
    if (quizMode === 'mixed') {
      const collected = Object.entries(QUESTION_BANK).flatMap(([id, byDifficulty]) => {
        const questions = byDifficulty[difficulty] ?? []
        if (!questions.length) return []
        const clubName = CLUB_NAME_BY_ID[id] ?? id
        return questions.map(q => ({ ...q, clubId: id, clubName, difficulty }))
      })
      const shuffled = shuffle(collected)
      const limit = Math.min(shuffled.length, DEFAULT_TARGET)
      return shuffled.slice(0, limit)
    }

    const base = QUESTION_BANK[pickedClub.id]?.[difficulty] ?? []
    const clubName = pickedClub.name
    const decorated = base.map(q => ({ ...q, clubId: pickedClub.id, clubName, difficulty }))
    const shuffled = shuffle(decorated)
    const limit = Math.min(shuffled.length, DEFAULT_TARGET)
    return shuffled.slice(0, limit)
  }, [difficulty, pickedClub.id, pickedClub.name, quizMode, seed])

  const current = questionBank[step]
  const total = questionBank.length
  const score = answers.reduce((acc, answer, index) => {
    const q = questionBank[index]
    if (q && answer === q.answerIndex) {
      return acc + 1
    }
    return acc
  }, 0)

  const hasQuestions = total > 0
  const activeDifficulty = DIFFICULTY_OPTIONS.find(opt => opt.value === difficulty)
  const activeMode = QUIZ_MODE_OPTIONS.find(opt => opt.value === quizMode)

  function pickAnswer(idx: number) {
    if (!current) return
    const next = [...answers]
    next[step] = idx
    setAnswers(next)
  }

  function nextStep() {
    if (step < total - 1) setStep(step + 1)
    else setShowResults(true)
  }

  function resetQuiz() {
    setAnswers([])
    setStep(0)
    setShowResults(false)
    setSeed(s => s + 1)
  }

  const missingQuestionsMessage = quizMode === 'single'
    ? pickedClub.id === 'custom'
      ? 'Denne demoen har foreløpig ingen spørsmål for klubben du har skrevet inn. Prøv blandet modus eller velg en klubb fra listen.'
      : 'Ingen spørsmål for denne vanskelighetsgraden ennå. Test en annen grad eller prøv blandet modus.'
    : 'Ingen klubber har spørsmål for denne vanskelighetsgraden i demoen. Bytt vanskelighetsgrad eller utvid spørsmålsbanken.'

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 text-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-6">
          <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <Shield className="h-7 w-7" /> FotballQuiz
          </motion.h1>

          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={resetQuiz}>Reset quiz</Button>
          </div>
        </header>

        <Card className="mb-6 bg-slate-900/60 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Sparkles className="h-5 w-5" /> Velg favoritklubb
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {CLUBS.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setClubId(c.id)
                    setCustomClub('')
                  }}
                  className={`rounded-2xl p-3 text-left bg-gradient-to-br ${c.colors} hover:brightness-110 transition shadow-sm ring-1 ring-white/10 ${pickedClub.id === c.id && !customClub ? 'outline outline-2 outline-white/70' : ''}`}
                >
                  <div className="text-sm font-semibold drop-shadow">{c.name}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Input
                placeholder="Eller skriv inn en egen klubb…"
                value={customClub}
                onChange={(e) => setCustomClub(e.target.value)}
              />
              <Button onClick={resetQuiz}>Bruk</Button>
            </div>
          </CardContent>
        </Card>
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="bg-slate-900/60 border border-slate-700 p-1">
            <TabsTrigger value="history" className="data-[state=active]:bg-slate-800">
              <History className="h-4 w-4 mr-2" /> Historie
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-slate-800">
              <CircleHelp className="h-4 w-4 mr-2" /> Quiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-4">
            <Card className="bg-slate-900/60 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl font-bold">{pickedClub.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`rounded-xl p-4 bg-gradient-to-br ${pickedClub.colors} text-white/95 shadow`}>
                  <p className="leading-relaxed">
                    {CLUB_HISTORIES[(pickedClub as any).id] ||
                      'Denne klubben har ikke fått en detaljert beskrivelse enda i demoen. Velg en annen klubb eller skriv din egen – i blandet modus kan du fortsatt få spørsmål i quizen.'}
                  </p>
                </div>
                <div className="text-xs text-slate-400 mt-3">
                  Demo-innhold. Legg til ekte kilder + bilder/meritter i neste steg.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="mt-4">
            <Card className="bg-slate-900/60 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleHelp className="h-5 w-5" /> Quiz om {quizMode === 'mixed' ? 'flere klubber' : pickedClub.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Quizmodus</p>
                    <RadioGroup
                      value={quizMode}
                      onValueChange={(val) => setQuizMode(val as QuizMode)}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                    >
                      {QUIZ_MODE_OPTIONS.map(option => (
                        <label
                          key={option.value}
                          htmlFor={`mode-${option.value}`}
                          className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition bg-slate-800/60 border-slate-700 hover:bg-slate-800 ${quizMode === option.value ? 'ring-2 ring-slate-200' : ''}`}
                        >
                          <RadioGroupItem value={option.value} id={`mode-${option.value}`} />
                          <span>
                            <div className="text-sm font-semibold text-slate-100">{option.label}</div>
                            <div className="text-xs text-slate-400">{option.description}</div>
                          </span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Vanskelighetsgrad</p>
                    <RadioGroup
                      value={difficulty}
                      onValueChange={(val) => setDifficulty(val as Difficulty)}
                      className="grid grid-cols-1 gap-2"
                    >
                      {DIFFICULTY_OPTIONS.map(option => (
                        <label
                          key={option.value}
                          htmlFor={`difficulty-${option.value}`}
                          className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition bg-slate-800/60 border-slate-700 hover:bg-slate-800 ${difficulty === option.value ? 'ring-2 ring-slate-200' : ''}`}
                        >
                          <RadioGroupItem value={option.value} id={`difficulty-${option.value}`} />
                          <span>
                            <div className="text-sm font-semibold text-slate-100">{option.label}</div>
                            <div className="text-xs text-slate-400">{option.description}</div>
                          </span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                {!hasQuestions ? (
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 text-center text-sm text-slate-300">
                    <p className="font-semibold text-slate-100">Ingen spørsmål tilgjengelig enda.</p>
                    <p className="mt-2 text-slate-400">{missingQuestionsMessage}</p>
                  </div>
                ) : !showResults ? (
                  <div className="space-y-5">
                    <div className="text-sm text-slate-300 flex flex-wrap items-center gap-2">
                      <span>Spørsmål {step + 1} av {total}</span>
                      {activeDifficulty && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span>Vanskelighetsgrad: {activeDifficulty.label}</span>
                        </>
                      )}
                      {quizMode === 'mixed' && current?.clubName && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span>Klubb: {current.clubName}</span>
                        </>
                      )}
                    </div>
                    <div className="text-lg font-semibold">{current?.q}</div>

                    <RadioGroup
                      value={answers[step]?.toString() ?? ''}
                      onValueChange={(val) => pickAnswer(parseInt(val))}
                      className="grid gap-2"
                    >
                      {current?.choices.map((choice, idx) => (
                        <label
                          key={idx}
                          htmlFor={`answer-${step}-${idx}`}
                          className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition bg-slate-800/60 border-slate-700 hover:bg-slate-800 ${answers[step] === idx ? 'ring-2 ring-slate-200' : ''}`}
                          onClick={() => pickAnswer(idx)}
                        >
                          <RadioGroupItem value={idx.toString()} id={`answer-${step}-${idx}`} /> <span>{choice}</span>
                        </label>
                      ))}
                    </RadioGroup>

                    <div className="flex items-center justify-between pt-2">
                      <Button onClick={nextStep} disabled={typeof answers[step] !== 'number'} className="min-w-36">
                        {step < total - 1 ? 'Neste' : 'Se resultater'}
                      </Button>
                      <Button variant="ghost" onClick={resetQuiz}>Bytt spørsmål</Button>
                    </div>

                    {typeof answers[step] === 'number' && current && (
                      <div className="text-sm text-slate-300">
                        {answers[step] === current.answerIndex ? (
                          <div className="flex items-center gap-2 text-emerald-300">
                            <CheckCircle2 className="h-4 w-4" /> Riktig!
                          </div>
                        ) : (
                          <div className="text-slate-300">Svar låst. Du kan gå videre.</div>
                        )}
                        {answers[step] !== undefined && current.explanation && (
                          <div className="mt-2 text-slate-400">Forklaring: {current.explanation}</div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Results
                    score={score}
                    total={total}
                    difficultyLabel={activeDifficulty?.label}
                    modeLabel={activeMode?.label}
                    onRetry={resetQuiz}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-8 text-xs text-slate-400">
          MVP-demo. Bygget med React + Vite + Tailwind. Ingen ekstern API i denne versjonen.
        </footer>
      </div>
    </div>
  )
}
function Results({ score, total, difficultyLabel, modeLabel, onRetry }: { score: number; total: number; difficultyLabel?: string; modeLabel?: string; onRetry: () => void }) {
  const pct = Math.round((score / Math.max(total, 1)) * 100)
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <Trophy className="h-12 w-12" />
      <div className="text-2xl font-extrabold">{score} / {total} riktig</div>
      <div className="text-sm text-slate-300">Treffsikkerhet: {pct}%</div>
      <div className="text-sm text-slate-400 flex flex-col gap-1">
        {modeLabel && <span>Modus: {modeLabel}</span>}
        {difficultyLabel && <span>Vanskelighetsgrad: {difficultyLabel}</span>}
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={onRetry}>Prøv igjen</Button>
      </div>
    </div>
  )
}
