import React, { useCallback, useEffect, useMemo, useState } from 'react'
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

type QuestionBank = Record<string, Record<Difficulty, StoredQuestion[]>>

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
  const [questionData, setQuestionData] = useState<QuestionBank>({})
  const [loadingQuestions, setLoadingQuestions] = useState(true)
  const [questionError, setQuestionError] = useState<string | null>(null)
  const [clubId, setClubId] = useState<string>(CLUBS[0].id)
  const [customClub, setCustomClub] = useState<string>('')
  const [quizMode, setQuizMode] = useState<QuizMode>('single')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [answers, setAnswers] = useState<number[]>([])
  const [step, setStep] = useState<number>(0)
  const [showResults, setShowResults] = useState(false)
  const [seed, setSeed] = useState(0)

  const loadQuestionBank = useCallback(async () => {
    try {
      setLoadingQuestions(true)
      setQuestionError(null)

      const response = await fetch('/Qbase.json')
      if (!response.ok) {
        throw new Error(`Kunne ikke laste spørsmål (status ${response.status})`)
      }

      const payload = (await response.json()) as QuestionBank
      setQuestionData(payload)
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
  }, [quizMode, difficulty, pickedClub.id, questionData])

  const quizQuestions = useMemo<QuizQuestion[]>(() => {
    if (!questionData || Object.keys(questionData).length === 0) return []

    if (quizMode === 'mixed') {
      const collected = Object.entries(questionData).flatMap(([id, byDifficulty]) => {
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
  }, [difficulty, pickedClub.id, pickedClub.name, quizMode, questionData, seed])

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

                {loadingQuestions ? (
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 text-center text-sm text-slate-300">
                    <p className="font-semibold text-slate-100">Laster inn spørsmålsbanken…</p>
                    <p className="mt-2 text-slate-400">Spørsmålene hentes fra den lokale Qbase.json-filen.</p>
                  </div>
                ) : questionError ? (
                  <div className="rounded-xl border border-rose-800/40 bg-rose-950/40 p-6 text-center text-sm text-rose-200">
                    <p className="font-semibold">Kunne ikke laste spørsmål.</p>
                    <p className="mt-2 opacity-90">{questionError}</p>
                    <div className="mt-4 flex justify-center">
                      <Button variant="secondary" onClick={loadQuestionBank}>Prøv igjen</Button>
                    </div>
                  </div>
                ) : !hasQuestions ? (
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
          MVP-demo. Spørsmålene hentes fra lokal <code>Qbase.json</code> i påvente av eventuell migrering til ekstern database.
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
