import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
import {
  CheckCircle2,
  CircleHelp,
  Trophy,
  History,
  Sparkles,
  Shield,
  Activity,
  Target,
  Smartphone,
  X,
} from 'lucide-react'

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

type QuestionBank = Record<string, Record<Difficulty, StoredQuestion[]>>

type League = {
  id: string
  name: string
  description?: string
}

type Club = {
  id: string
  name: string
  colors: string
  leagueId: League['id']
}

const LEAGUES: League[] = [
  {
    id: 'eliteserien',
    name: 'Norsk Eliteserie',
    description: 'Topplagene fra Eliteserien 2024.',
  },
  {
    id: 'premierleague',
    name: 'Engelsk toppfotball',
    description: 'Klubbene fra Premier League-sesongen 2023/24.',
  },
  {
    id: 'champions',
    name: 'Champions League-storklubber',
    description: 'Europeiske giganter fra de største ligaene.',
  },
]

const CLUBS: Club[] = [
  { id: 'liverpool', name: 'Liverpool FC', colors: 'from-red-600 to-red-800', leagueId: 'premierleague' },
  { id: 'manutd', name: 'Manchester United', colors: 'from-rose-600 to-rose-800', leagueId: 'premierleague' },
  { id: 'mancty', name: 'Manchester City', colors: 'from-sky-500 to-cyan-700', leagueId: 'premierleague' },
  { id: 'arsenal', name: 'Arsenal FC', colors: 'from-red-500 to-amber-600', leagueId: 'premierleague' },
  { id: 'chelsea', name: 'Chelsea FC', colors: 'from-blue-600 to-indigo-800', leagueId: 'premierleague' },
  { id: 'tottenham', name: 'Tottenham Hotspur', colors: 'from-slate-500 to-slate-800', leagueId: 'premierleague' },
  { id: 'astonvilla', name: 'Aston Villa', colors: 'from-rose-700 to-amber-600', leagueId: 'premierleague' },
  { id: 'bournemouth', name: 'AFC Bournemouth', colors: 'from-red-700 to-neutral-900', leagueId: 'premierleague' },
  { id: 'brentford', name: 'Brentford FC', colors: 'from-rose-600 to-zinc-900', leagueId: 'premierleague' },
  { id: 'brighton', name: 'Brighton & Hove Albion', colors: 'from-sky-600 to-blue-900', leagueId: 'premierleague' },
  { id: 'burnley', name: 'Burnley FC', colors: 'from-rose-700 to-sky-400', leagueId: 'premierleague' },
  { id: 'crystalpalace', name: 'Crystal Palace', colors: 'from-rose-600 to-blue-700', leagueId: 'premierleague' },
  { id: 'everton', name: 'Everton FC', colors: 'from-blue-700 to-slate-900', leagueId: 'premierleague' },
  { id: 'fulham', name: 'Fulham FC', colors: 'from-slate-100 to-slate-500 text-slate-900', leagueId: 'premierleague' },
  { id: 'luton', name: 'Luton Town', colors: 'from-orange-500 to-slate-900', leagueId: 'premierleague' },
  { id: 'newcastle', name: 'Newcastle United', colors: 'from-neutral-100 to-neutral-700 text-slate-900', leagueId: 'premierleague' },
  { id: 'nottinghamforest', name: 'Nottingham Forest', colors: 'from-red-600 to-red-900', leagueId: 'premierleague' },
  { id: 'sheffieldutd', name: 'Sheffield United', colors: 'from-red-600 to-slate-900', leagueId: 'premierleague' },
  { id: 'westham', name: 'West Ham United', colors: 'from-cyan-600 to-rose-800', leagueId: 'premierleague' },
  { id: 'wolves', name: 'Wolverhampton Wanderers', colors: 'from-amber-500 to-stone-900', leagueId: 'premierleague' },
  { id: 'barca', name: 'FC Barcelona', colors: 'from-fuchsia-600 to-indigo-700', leagueId: 'champions' },
  { id: 'real', name: 'Real Madrid', colors: 'from-zinc-200 to-zinc-500 text-slate-900', leagueId: 'champions' },
  { id: 'bayern', name: 'FC Bayern München', colors: 'from-red-600 to-rose-900', leagueId: 'champions' },
  { id: 'liverpool', name: 'Liverpool FC', colors: 'from-red-600 to-red-800', leagueId: 'champions' },
  { id: 'manutd', name: 'Manchester United', colors: 'from-rose-600 to-rose-800', leagueId: 'champions' },
  { id: 'chelsea', name: 'Chelsea FC', colors: 'from-blue-600 to-indigo-800', leagueId: 'champions' },
  { id: 'inter', name: 'Inter Milan', colors: 'from-blue-700 to-black', leagueId: 'champions' },
  { id: 'juve', name: 'Juventus', colors: 'from-slate-100 to-slate-500 text-slate-900', leagueId: 'champions' },
  { id: 'milan', name: 'AC Milan', colors: 'from-red-700 to-black', leagueId: 'champions' },
  { id: 'ajax', name: 'AFC Ajax', colors: 'from-rose-200 to-red-600 text-slate-900', leagueId: 'champions' },
  { id: 'bodoglimt', name: 'FK Bodø/Glimt', colors: 'from-yellow-300 to-amber-600 text-slate-900', leagueId: 'eliteserien' },
  { id: 'brann', name: 'SK Brann', colors: 'from-red-600 to-red-900', leagueId: 'eliteserien' },
  { id: 'fredrikstad', name: 'Fredrikstad FK', colors: 'from-red-600 to-slate-100 text-slate-900', leagueId: 'eliteserien' },
  { id: 'hamkam', name: 'HamKam', colors: 'from-emerald-500 to-emerald-800', leagueId: 'eliteserien' },
  { id: 'haugesund', name: 'FK Haugesund', colors: 'from-sky-400 to-sky-700', leagueId: 'eliteserien' },
  { id: 'kfumoslo', name: 'KFUM Oslo', colors: 'from-red-600 to-blue-600', leagueId: 'eliteserien' },
  { id: 'kristiansund', name: 'Kristiansund BK', colors: 'from-sky-700 to-slate-900', leagueId: 'eliteserien' },
  { id: 'lillestrom', name: 'Lillestrøm SK', colors: 'from-yellow-300 to-slate-900 text-slate-900', leagueId: 'eliteserien' },
  { id: 'molde', name: 'Molde FK', colors: 'from-sky-500 to-blue-800', leagueId: 'eliteserien' },
  { id: 'odd', name: 'Odds BK', colors: 'from-slate-100 to-slate-500 text-slate-900', leagueId: 'eliteserien' },
  { id: 'rosenborg', name: 'Rosenborg BK', colors: 'from-slate-100 to-slate-500 text-slate-900', leagueId: 'eliteserien' },
  { id: 'sandefjord', name: 'Sandefjord Fotball', colors: 'from-blue-600 to-rose-600', leagueId: 'eliteserien' },
  { id: 'sarpsborg08', name: 'Sarpsborg 08', colors: 'from-blue-500 to-blue-900', leagueId: 'eliteserien' },
  { id: 'stromsgodset', name: 'Strømsgodset', colors: 'from-amber-500 to-blue-900', leagueId: 'eliteserien' },
  { id: 'tromso', name: 'Tromsø IL', colors: 'from-red-600 to-slate-800', leagueId: 'eliteserien' },
  { id: 'viking', name: 'Viking FK', colors: 'from-blue-900 to-amber-600', leagueId: 'eliteserien' },
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
  bayern:
    'FC Bayern München har dominert tysk fotball i Bundesliga-æraen og vunnet flere Champions League-troféer. Klubben er kjent for sin profesjonelle drift, sterke akademi og Allianz Arena.',
  juve:
    'Juventus dominerte italiensk fotball i flere perioder og er kjent for sin defensive disiplin, sterke vinnerkultur og ikoniske svarte‑og‑hvite striper.',
  milan:
    'AC Milan har en rik europeisk merittliste, storhetstider under Sacchi og Capello, og har preget italiensk fotball med sterk defensiv struktur og offensive ikoner.',
  inter:
    'Inter Milan, grunnlagt i 1908, har vunnet flere Serie A- og Champions League-troféer. Klubben forbindes med catenaccio-æraen, men også moderne offensive profiler på San Siro.',
  ajax:
    'AFC Ajax er symbolet på nederlandsk totalfotball med Johan Cruyff som ikon. Klubben har et berømt akademi, talentutvikling og europacuptitler fra 1970- og 1990-tallet.',
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

const DEFAULT_TARGET = 10

function cloneQuestion(q: StoredQuestion): StoredQuestion {
  return {
    ...q,
    choices: [...q.choices],
  }
}

function normalizeQuestionBank(bank: QuestionBank): QuestionBank {
  const normalizedEntries = Object.entries(bank).map(([clubId, byDifficulty]) => {
    const normalized: Record<Difficulty, StoredQuestion[]> = {
      easy: byDifficulty?.easy?.map(cloneQuestion) ?? [],
      medium: byDifficulty?.medium?.map(cloneQuestion) ?? [],
      hard: byDifficulty?.hard?.map(cloneQuestion) ?? [],
    }

    const ensureCoverage = (target: Difficulty, fallbacks: Difficulty[]) => {
      if (normalized[target].length > 0) return
      for (const fb of fallbacks) {
        if (fb === target) continue
        if (normalized[fb].length > 0) {
          normalized[target] = normalized[fb].map(cloneQuestion)
          return
        }
      }
    }

    ensureCoverage('easy', ['medium', 'hard'])
    ensureCoverage('medium', ['easy', 'hard'])
    ensureCoverage('hard', ['medium', 'easy'])

    return [clubId, normalized] as const
  })

  const clubIds = new Set(Object.keys(bank))
  CLUBS.forEach(club => {
    if (!clubIds.has(club.id)) {
      normalizedEntries.push([
        club.id,
        {
          easy: [],
          medium: [],
          hard: [],
        },
      ])
    }
  })

  return Object.fromEntries(normalizedEntries)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
export default function App() {
  const [questionData, setQuestionData] = useState<QuestionBank>({})
  const [loadingQuestions, setLoadingQuestions] = useState(true)
  const [questionError, setQuestionError] = useState<string | null>(null)
  const [leagueId, setLeagueId] = useState<string>(LEAGUES[0].id)
  const [clubId, setClubId] = useState<string>(
    CLUBS.find(club => club.leagueId === LEAGUES[0].id)?.id ?? CLUBS[0].id,
  )
  const [quizMode, setQuizMode] = useState<QuizMode>('single')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [answers, setAnswers] = useState<number[]>([])
  const [step, setStep] = useState<number>(0)
  const [showResults, setShowResults] = useState(false)
  const [seed, setSeed] = useState(0)
  const [quizOpen, setQuizOpen] = useState(false)
  const [mobilePreview, setMobilePreview] = useState(false)

  const loadQuestionBank = useCallback(async () => {
    try {
      setLoadingQuestions(true)
      setQuestionError(null)

      const response = await fetch('/Qbase.json')
      if (!response.ok) {
        throw new Error(`Kunne ikke laste spørsmål (status ${response.status})`)
      }

      const payload = (await response.json()) as QuestionBank
      const normalized = normalizeQuestionBank(payload)
      setQuestionData(normalized)
    } catch (error) {
      setQuestionData({})
      setQuestionError(error instanceof Error ? error.message : 'Ukjent feil ved lasting av spørsmål.')
    } finally {
      setLoadingQuestions(false)
    }
  }, [])

  useEffect(() => {
    loadQuestionBank()
  }, [loadQuestionBank])

  const clubsInLeague = useMemo(() => CLUBS.filter(club => club.leagueId === leagueId), [leagueId])
  const selectedLeague = useMemo(
    () => LEAGUES.find(league => league.id === leagueId) ?? LEAGUES[0],
    [leagueId],
  )

  useEffect(() => {
    if (!clubsInLeague.some(club => club.id === clubId)) {
      const fallback = clubsInLeague[0]?.id ?? CLUBS[0].id
      setClubId(fallback)
    }
  }, [leagueId, clubsInLeague, clubId])

  const pickedClub = useMemo(() => {
    return clubsInLeague.find(c => c.id === clubId) ?? clubsInLeague[0] ?? CLUBS[0]
  }, [clubId, clubsInLeague])

  const clubTheme = useMemo(() => {
    const tokens = (pickedClub?.colors ?? '').split(' ').filter(Boolean)
    const gradientTokens = tokens.filter(token =>
      token.startsWith('from-') || token.startsWith('via-') || token.startsWith('to-'),
    )
    const gradientClass = gradientTokens.length
      ? `bg-gradient-to-br ${gradientTokens.join(' ')}`
      : 'bg-gradient-to-br from-slate-800 to-slate-900'
    const textToken = tokens.find(token => token.startsWith('text-')) ?? 'text-white'
    return {
      gradient: gradientClass,
      text: textToken,
    }
  }, [pickedClub])

  useEffect(() => {
    setAnswers([])
    setStep(0)
    setShowResults(false)
    setSeed(s => s + 1)
  }, [quizMode, difficulty, pickedClub.id, questionData])

  const quizQuestions = useMemo<QuizQuestion[]>(() => {
    if (!questionData || Object.keys(questionData).length === 0) return []

    if (quizMode === 'mixed') {
      const allowedClubs = new Set(clubsInLeague.map(c => c.id))
      const collected = Object.entries(questionData).flatMap(([id, byDifficulty]) => {
        if (!allowedClubs.has(id)) return []
        const questions = byDifficulty[difficulty] ?? []
        if (!questions.length) return []
        const clubName = CLUB_NAME_BY_ID[id] ?? id
        return questions.map(q => ({ ...q, clubId: id, clubName, difficulty }))
      })
      const shuffled = shuffle(collected)
      const limit = Math.min(shuffled.length, DEFAULT_TARGET)
      return shuffled.slice(0, limit)
    }

    const base = questionData[pickedClub.id]?.[difficulty] ?? []
    const clubName = pickedClub.name
    const decorated = base.map(q => ({ ...q, clubId: pickedClub.id, clubName, difficulty }))
    const shuffled = shuffle(decorated)
    const limit = Math.min(shuffled.length, DEFAULT_TARGET)
    return shuffled.slice(0, limit)
  }, [clubsInLeague, difficulty, pickedClub.id, pickedClub.name, quizMode, questionData, seed])

  const current = quizQuestions[step]
  const total = quizQuestions.length
  const score = answers.reduce((acc, answer, index) => {
    const q = quizQuestions[index]
    if (q && answer === q.answerIndex) {
      return acc + 1
    }
    return acc
  }, 0)

  const hasQuestions = total > 0
  const activeDifficulty = DIFFICULTY_OPTIONS.find(opt => opt.value === difficulty)
  const activeMode = QUIZ_MODE_OPTIONS.find(opt => opt.value === quizMode)
  const answeredCount = answers.filter(answer => typeof answer === 'number').length
  const answerLocked = typeof answers[step] === 'number'
  const progress = total
    ? Math.min(
        100,
        Math.round(
          ((showResults ? total : step + (answerLocked ? 1 : 0)) / total) * 100,
        ),
      )
    : 0

  function pickAnswer(idx: number) {
    if (!current || answerLocked) return
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
    ? `Ingen spørsmål for ${pickedClub.name} på denne vanskelighetsgraden ennå. Test en annen grad eller prøv blandet modus.`
    : 'Ingen klubber har spørsmål for denne vanskelighetsgraden i demoen. Bytt vanskelighetsgrad eller utvid spørsmålsbanken.'

  const containerClass = mobilePreview
    ? 'relative z-10 mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-4 py-6'
    : 'relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-6'

  return (
    <div
      className={`relative flex min-h-dvh w-full flex-col overflow-hidden bg-slate-950 text-slate-100 ${
        mobilePreview ? 'items-center' : ''
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950" />
        <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(circle_at_top,_rgba(15,23,42,0.75),_transparent_70%)]" />
        <motion.div
          className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-20 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-sky-500/15 blur-3xl"
          animate={{ y: [0, 20, 0], scale: [1, 0.98, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
        <motion.div
          className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl"
          animate={{ y: [0, -15, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      </div>
      <div className={containerClass}>
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 flex flex-wrap items-center justify-between gap-6 sm:mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 shadow-[0_15px_45px_rgba(16,185,129,0.25)]"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/80">Interaktiv demo</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">FotballQuiz</h1>
              <p className="text-sm text-slate-300/90">
                Utforsk klubbhistorie, velg vanskelighetsgrad og utfordre vennene dine i en dynamisk fotballquiz.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
            <div className="text-xs uppercase tracking-wide text-slate-400">{selectedLeague?.name ?? 'Ukjent liga'}</div>
            <Button variant="secondary" onClick={resetQuiz} className="backdrop-blur">
              Start på nytt
            </Button>
            <Button
              variant="ghost"
              onClick={() => setMobilePreview(prev => !prev)}
              className="border-white/20 bg-white/5 text-slate-100 hover:bg-white/10"
            >
              <Smartphone className="mr-2 h-4 w-4" /> {mobilePreview ? 'Desktopvisning' : 'Mobilvisning'}
            </Button>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-1 flex-col gap-6 lg:min-h-0 lg:flex-row"
        >
          <motion.div
            key={pickedClub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_20px_60px_rgba(15,23,42,0.5)] backdrop-blur lg:max-w-xl lg:flex-[0.95] xl:max-w-none xl:flex-[1.05]"
          >
            <motion.div
              key={`${pickedClub.id}-${clubTheme.gradient}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`absolute inset-0 opacity-80 ${clubTheme.gradient}`}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-950/40 to-transparent" />
            <div className="relative flex h-full flex-col gap-8 p-6 sm:p-8">
              <div className="space-y-4 text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur">
                  <Shield className="h-3.5 w-3.5" /> Favorittklubb
                </div>
                <motion.h2
                  key={pickedClub.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-3xl font-black tracking-tight sm:text-4xl"
                >
                  {pickedClub.name}
                </motion.h2>
                <p className="max-w-xl text-sm text-white/80">
                  {selectedLeague?.description ?? 'Velg liga, klubb og quizoppsett for å komme i gang på få sekunder.'}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80">
                  {activeMode && (
                    <span className="rounded-full bg-black/30 px-3 py-1 backdrop-blur">Modus: {activeMode.label}</span>
                  )}
                  {activeDifficulty && (
                    <span className="rounded-full bg-black/30 px-3 py-1 backdrop-blur">
                      Vanskelighet: {activeDifficulty.label}
                    </span>
                  )}
                  <span className="rounded-full bg-black/30 px-3 py-1 backdrop-blur">Besvart: {answeredCount}</span>
                </div>
              </div>
              <div className="grid gap-4 text-white">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                    <div className="text-xs uppercase tracking-wide text-white/70">Totalt antall</div>
                    <div className="mt-1 text-2xl font-bold text-white">{total || '–'}</div>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                    <div className="text-xs uppercase tracking-wide text-white/70">Riktige svar</div>
                    <div className="mt-1 text-2xl font-bold text-white">{score}</div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/70">
                    <span>Fremdrift</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-500 shadow-[0_0_16px_rgba(56,189,248,0.5)]"
                    />
                  </div>
                  <p className="mt-2 text-xs text-white/60">
                    {showResults ? 'Resultatet er klart – se rapportkortet til høyre.' : 'Svar på spørsmålene for å låse resultatene.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-1 flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className="grid min-h-0 gap-4 md:grid-cols-2"
            >
              <Card className="flex h-full flex-col overflow-hidden border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Activity className="h-5 w-5 text-emerald-300" />
                  Live status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-3 text-center backdrop-blur">
                    <div className="text-xs uppercase tracking-wide text-slate-400">Spørsmål</div>
                    <div className="mt-1 text-lg font-semibold text-white">{total || '–'}</div>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-3 text-center backdrop-blur">
                    <div className="text-xs uppercase tracking-wide text-slate-400">Riktige</div>
                    <div className="mt-1 text-lg font-semibold text-white">{score}</div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-xs text-slate-300 backdrop-blur">
                  Hold oversikt over poengsummen mens du spiller. Resultatvisningen summerer alt når runden er ferdig.
                </div>
              </CardContent>
              </Card>

              <Card className="flex h-full flex-col overflow-hidden border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Target className="h-5 w-5 text-sky-300" />
                  Quizinnstillinger
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Quizmodus</p>
                  <RadioGroup
                    value={quizMode}
                    onValueChange={val => setQuizMode(val as QuizMode)}
                    className="grid gap-2"
                  >
                    {QUIZ_MODE_OPTIONS.map(option => (
                      <motion.label
                        key={option.value}
                        htmlFor={`mode-${option.value}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 backdrop-blur transition ${
                          quizMode === option.value
                            ? 'border-emerald-300/70 bg-emerald-400/10 text-white shadow-[0_0_25px_rgba(16,185,129,0.35)]'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={`mode-${option.value}`} />
                        <span>
                          <div className="text-sm font-semibold text-slate-100">{option.label}</div>
                          <div className="text-xs text-slate-400">{option.description}</div>
                        </span>
                      </motion.label>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Vanskelighetsgrad</p>
                  <RadioGroup
                    value={difficulty}
                    onValueChange={val => setDifficulty(val as Difficulty)}
                    className="grid gap-2"
                  >
                    {DIFFICULTY_OPTIONS.map(option => (
                      <motion.label
                        key={option.value}
                        htmlFor={`difficulty-${option.value}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 backdrop-blur transition ${
                          difficulty === option.value
                            ? 'border-sky-300/70 bg-sky-400/10 text-white shadow-[0_0_25px_rgba(56,189,248,0.35)]'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={`difficulty-${option.value}`} />
                        <span>
                          <div className="text-sm font-semibold text-slate-100">{option.label}</div>
                          <div className="text-xs text-slate-400">{option.description}</div>
                        </span>
                      </motion.label>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
              </Card>

              <Card className="flex h-full flex-col overflow-hidden border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur md:col-span-2">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Sparkles className="h-5 w-5 text-fuchsia-300" />
                  Velg lag
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="max-h-[20rem] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {clubsInLeague.map(c => (
                      <motion.button
                        key={c.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (pickedClub.id !== c.id) {
                            setClubId(c.id)
                          }
                        }}
                        className={`rounded-2xl bg-gradient-to-br p-2.5 text-left text-white shadow-lg transition ${
                          pickedClub.id === c.id ? 'outline outline-2 outline-white/80' : 'opacity-90 hover:opacity-100'
                        } ${c.colors}`}
                      >
                        <div className="text-xs font-semibold drop-shadow sm:text-sm">{c.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="flex h-full min-h-0 flex-col gap-6"
            >
              <Tabs defaultValue="history" className="flex h-full flex-col gap-4">
              <TabsList className="inline-flex items-center justify-start gap-2 rounded-full border border-white/10 bg-slate-950/70 p-1 shadow-[0_15px_45px_rgba(15,23,42,0.45)] backdrop-blur">
                <TabsTrigger
                  value="history"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg"
                >
                  <History className="mr-2 h-4 w-4" /> Historie
                </TabsTrigger>
                <TabsTrigger
                  value="quiz"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg"
                >
                  <CircleHelp className="mr-2 h-4 w-4" /> Quiz
                </TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="flex-1 min-h-0">
                <Card className="flex h-full flex-col overflow-hidden border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur">
                  <CardHeader className="border-b border-white/5">
                    <CardTitle className="flex items-center gap-2 text-xl font-semibold text-slate-100">
                      {pickedClub.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className={`rounded-2xl bg-gradient-to-br p-5 text-white shadow-lg ${pickedClub.colors}`}>
                      <p className="leading-relaxed">
                        {CLUB_HISTORIES[(pickedClub as any).id] ||
                          'Denne klubben har ikke fått en detaljert beskrivelse i demoen ennå. Velg en annen klubb eller fyll på med egne fakta senere.'}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400">
                      Demo-innhold. Legg til ekte kilder, statistikk og visuelt materiale i en senere iterasjon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quiz" className="flex-1 min-h-0">
                <Card className="flex h-full flex-col overflow-hidden border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur">
                  <CardHeader className="border-b border-white/5">
                    <CardTitle className="flex items-center gap-2 text-slate-100">
                      <CircleHelp className="h-5 w-5 text-emerald-300" /> Quiz om {quizMode === 'mixed' ? 'flere klubber' : pickedClub.name}
                    </CardTitle>
                    <p className="text-sm text-slate-400">
                      Åpne quiz-modulen for å spille i fullskjermsvisning slik du kjenner det fra Kahoot. Velg modus og vanskelighetsgrad i kortet ved siden av før du starter.
                    </p>
                  </CardHeader>
                  <CardContent className="flex min-h-0 flex-1 flex-col space-y-5 pt-5">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-300 backdrop-blur">
                      <p className="font-semibold text-slate-100">Slik fungerer modulen</p>
                      <p className="mt-2 text-slate-400">
                        Når du trykker på «Åpne quiz-modul» vises spørsmålene i en egen overliggende skjerm. Der kan du låse svar, se resultater og starte på nytt uten at resten av siden påvirkes.
                      </p>
                    </div>

                    {loadingQuestions ? (
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm text-slate-300 backdrop-blur">
                        <p className="font-semibold text-slate-100">Laster inn spørsmålsbanken…</p>
                        <p className="mt-2 text-slate-400">Spørsmålene hentes fra den lokale Qbase.json-filen.</p>
                      </div>
                    ) : questionError ? (
                      <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 text-center text-sm text-rose-100 backdrop-blur">
                        <p className="font-semibold">Kunne ikke laste spørsmål.</p>
                        <p className="mt-2 opacity-90">{questionError}</p>
                        <div className="mt-4 flex justify-center">
                          <Button variant="secondary" onClick={loadQuestionBank}>
                            Prøv igjen
                          </Button>
                        </div>
                      </div>
                    ) : !hasQuestions ? (
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm text-slate-300 backdrop-blur">
                        <p className="font-semibold text-slate-100">Ingen spørsmål tilgjengelig enda.</p>
                        <p className="mt-2 text-slate-400">{missingQuestionsMessage}</p>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-sm text-emerald-100 backdrop-blur">
                        <p className="font-semibold text-emerald-200">Klar for quiz!</p>
                        <p className="mt-2 text-emerald-100/80">
                          Du er klar til å åpne modulen. Ta med deltakerne på storskjerm eller i mobilvisning.
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        onClick={() => {
                          resetQuiz()
                          setQuizOpen(true)
                        }}
                        disabled={loadingQuestions || !!questionError || !hasQuestions}
                      >
                        Åpne quiz-modul
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={resetQuiz}
                        className="text-slate-300 hover:text-white"
                      >
                        Tilfeldige spørsmål
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            </motion.div>
          </div>
        </motion.section>

        <footer className="mt-8 text-xs text-slate-500 sm:mt-10 lg:mt-12">
          MVP-demo. Spørsmålene hentes fra lokal <code>Qbase.json</code> mens neste iterasjon planlegges.
        </footer>
      </div>
      <AnimatePresence>
        {quizOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/90 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`relative flex h-[min(90vh,48rem)] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-[0_30px_80px_rgba(15,23,42,0.65)] ${
                mobilePreview ? 'max-w-sm' : 'max-w-4xl'
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">Quiz-modul</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    {quizMode === 'mixed' ? 'Blandet klubbquiz' : `Quiz: ${pickedClub.name}`}
                  </h2>
                </div>
                <Button variant="ghost" onClick={() => setQuizOpen(false)} className="text-slate-300 hover:text-white">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {loadingQuestions ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300 backdrop-blur">
                    <p className="font-semibold text-slate-100">Laster inn spørsmålsbanken…</p>
                    <p className="mt-2 text-slate-400">Spørsmålene hentes fra den lokale Qbase.json-filen.</p>
                  </div>
                ) : questionError ? (
                  <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-6 text-center text-sm text-rose-100 backdrop-blur">
                    <p className="font-semibold">Kunne ikke laste spørsmål.</p>
                    <p className="mt-2 opacity-90">{questionError}</p>
                    <div className="mt-4 flex justify-center">
                      <Button variant="secondary" onClick={loadQuestionBank}>
                        Prøv igjen
                      </Button>
                    </div>
                  </div>
                ) : !hasQuestions ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300 backdrop-blur">
                    <p className="font-semibold text-slate-100">Ingen spørsmål tilgjengelig enda.</p>
                    <p className="mt-2 text-slate-400">{missingQuestionsMessage}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-100">
                            <Activity className="h-3.5 w-3.5" /> Spørsmål {Math.min(step + 1, total)} av {total}
                          </span>
                          {activeDifficulty && (
                            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-100">
                              {activeDifficulty.label}
                            </span>
                          )}
                          {quizMode === 'mixed' && current?.clubName && (
                            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-100">
                              {current.clubName}
                            </span>
                          )}
                        </div>
                        <span className="text-xs uppercase tracking-widest text-slate-400">
                          Treffsikkerhet: {score}/{total}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={false}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-500 shadow-[0_0_16px_rgba(56,189,248,0.5)]"
                        />
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {!showResults ? (
                        <motion.div
                          key={`question-${step}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.35 }}
                          className="space-y-4"
                        >
                          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-950/90 p-6 shadow-inner">
                            <h3 className="text-lg font-semibold text-white">{current?.q}</h3>
                            <p className="mt-2 text-sm text-slate-300">
                              Velg alternativet du mener er riktig. Svar låses når du klikker.
                            </p>
                          </div>

                          <RadioGroup
                            value={answers[step] !== undefined ? answers[step].toString() : undefined}
                            onValueChange={val => {
                              const parsed = Number(val)
                              if (!Number.isNaN(parsed)) {
                                pickAnswer(parsed)
                              }
                            }}
                            className="grid gap-3"
                          >
                            {current?.choices.map((choice, idx) => (
                              <motion.label
                                key={idx}
                                htmlFor={`answer-${step}-${idx}`}
                                whileHover={answerLocked ? undefined : { scale: 1.01, y: -1 }}
                                whileTap={answerLocked ? undefined : { scale: 0.99 }}
                                className={`group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-all duration-300 backdrop-blur ${
                                  answers[step] === idx
                                    ? 'cursor-default border-emerald-300/70 bg-emerald-400/10 text-white shadow-[0_10px_35px_rgba(16,185,129,0.35)]'
                                    : answerLocked
                                      ? 'cursor-not-allowed opacity-60'
                                      : 'cursor-pointer hover:bg-white/10'
                                }`}
                                onClick={() => {
                                  if (!answerLocked) pickAnswer(idx)
                                }}
                              >
                                <RadioGroupItem
                                  value={idx.toString()}
                                  id={`answer-${step}-${idx}`}
                                  disabled={answerLocked}
                                />
                                <span>{choice}</span>
                              </motion.label>
                            ))}
                          </RadioGroup>

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <Button onClick={nextStep} disabled={typeof answers[step] !== 'number'} className="min-w-36">
                              {step < total - 1 ? 'Neste' : 'Se resultater'}
                            </Button>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" onClick={resetQuiz} className="text-slate-300 hover:text-white">
                                Bytt spørsmål
                              </Button>
                              <Button variant="ghost" onClick={() => setQuizOpen(false)} className="text-slate-300 hover:text-white">
                                Avslutt modul
                              </Button>
                            </div>
                          </div>

                          {typeof answers[step] === 'number' && current && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 backdrop-blur"
                            >
                              {answers[step] === current.answerIndex ? (
                                <div className="flex items-center gap-2 text-emerald-300">
                                  <CheckCircle2 className="h-4 w-4" /> Riktig!
                                </div>
                              ) : (
                                <div className="text-slate-200">Svar låst. Du kan gå videre.</div>
                              )}
                              {answers[step] !== undefined && current.explanation && (
                                <div className="mt-2 text-slate-400">Forklaring: {current.explanation}</div>
                              )}
                            </motion.div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="results"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.35 }}
                          className="space-y-4"
                        >
                          <Results
                            score={score}
                            total={total}
                            difficultyLabel={activeDifficulty?.label}
                            modeLabel={activeMode?.label}
                            onRetry={resetQuiz}
                          />
                          <div className="flex justify-center">
                            <Button variant="ghost" onClick={() => setQuizOpen(false)} className="text-slate-300 hover:text-white">
                              Lukk modulen
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Results({ score, total, difficultyLabel, modeLabel, onRetry }: { score: number; total: number; difficultyLabel?: string; modeLabel?: string; onRetry: () => void }) {
  const pct = Math.round((score / Math.max(total, 1)) * 100)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 via-slate-950/80 to-sky-500/10 p-8 text-center shadow-[0_25px_60px_rgba(16,185,129,0.35)] backdrop-blur"
    >
      <motion.div
        initial={{ scale: 0.9, rotate: -8 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 16 }}
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200 shadow-[0_10px_30px_rgba(16,185,129,0.35)]"
      >
        <Trophy className="h-10 w-10" />
      </motion.div>
      <div className="text-3xl font-extrabold text-white">
        {score} / {total} riktig
      </div>
      <div className="mt-1 text-sm text-emerald-200">Treffsikkerhet: {pct}%</div>
      <div className="mt-4 flex flex-col gap-1 text-sm text-slate-300">
        {modeLabel && <span>Modus: {modeLabel}</span>}
        {difficultyLabel && <span>Vanskelighetsgrad: {difficultyLabel}</span>}
      </div>
      <div className="mt-6 flex justify-center">
        <Button onClick={onRetry}>Spill igjen</Button>
      </div>
    </motion.div>
  )
}
