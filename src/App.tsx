import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
import { CheckCircle2, CircleHelp, Trophy, History, Sparkles, Shield } from 'lucide-react'

// --- Demo content -----------------------------------------------------------

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

type Question = {
  q: string
  choices: string[]
  answerIndex: number
  explanation?: string
}

// Small demo question banks (MCQ)
const DEMO_QUESTIONS: Record<string, Question[]> = {
  liverpool: [
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
      explanation: '’You\'ll Never Walk Alone’ synges før kamp og er klubbens uoffisielle hymne.',
    },
    {
      q: 'Hvem ledet Liverpool til CL‑triumf i 2019?',
      choices: ['Rafael Benítez', 'Kenny Dalglish', 'Jürgen Klopp', 'Roy Hodgson'],
      answerIndex: 2,
      explanation: 'Jürgen Klopp vant Champions League 2018/19 med Liverpool.',
    },
  ],
  manutd: [
    {
      q: 'Hvilken manager er mest ikonisk for Uniteds moderne æra?',
      choices: ['Matt Busby', 'Sir Alex Ferguson', 'Louis van Gaal', 'Ron Atkinson'],
      answerIndex: 1,
      explanation: 'Sir Alex Ferguson ledet United i 26 år og vant treble i 1999.',
    },
    {
      q: 'Hva kalles Old Trafford ofte?',
      choices: ['The Dream Factory', 'The Theatre of Dreams', 'The Red Fortress', 'The United Arena'],
      answerIndex: 1,
      explanation: '‘The Theatre of Dreams’ ble popularisert av Sir Bobby Charlton.',
    },
  ],
  barca: [
    {
      q: 'Hva betyr klubbens motto ‘Més que un club’?',
      choices: ['Mer enn en klubb', 'Alltid Barcelona', 'Én by, én klubb', 'For Catalonia'],
      answerIndex: 0,
      explanation: 'Direkte oversatt: ‘Mer enn en klubb’.',
    },
  ],
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
  const [clubId, setClubId] = useState<string>(CLUBS[0].id)
  const [customClub, setCustomClub] = useState<string>('')
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

  const questionBank = useMemo(() => {
    const pool: Question[] = (DEMO_QUESTIONS as any)[pickedClub.id] || []
    const fallback: Question[] = DEMO_QUESTIONS.liverpool
    const preferred: Question[] = pool.length ? pool : fallback
    const TARGET = 10

    // Start med en shufflet liste av foretrukne spørsmål for valgt klubb
    const base = shuffle(preferred)

    // Samle en generell bank på tvers av alle klubber og filtrer bort duplikater per spørsmålstekst
    const all: Question[] = Object.values(DEMO_QUESTIONS).flat() as Question[]
    const seenQ = new Set<string>(base.map(q => q.q))
    const extras = shuffle(all).filter(q => !seenQ.has(q.q))

    // Bygg uten repetisjon når mulig
    const combined: Question[] = [...base]
    for (const q of extras) {
      if (combined.length >= TARGET) break
      combined.push(q)
    }

    // Hvis total unike spørsmål fortsatt < TARGET, repeter som siste utvei
    if (combined.length < TARGET) {
      let bag = shuffle(preferred)
      while (combined.length < TARGET) {
        if (bag.length === 0) bag = shuffle(preferred)
        combined.push(bag.shift() as Question)
      }
    }

    return combined.slice(0, TARGET)
  }, [pickedClub, seed])

  const current = questionBank[step]
  const total = questionBank.length
  const score = answers.reduce((acc, a, i) => acc + (a === questionBank[i].answerIndex ? 1 : 0), 0)

  function pickAnswer(idx: number) {
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
                  onClick={() => { setClubId(c.id); setCustomClub(''); resetQuiz(); }}
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
                      'Denne klubben har ikke fått en detaljert beskrivelse enda i demoen. Velg en annen klubb eller skriv din egen – quizzen vil fortsatt fungere med et standard spørsmålssett.'}
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
                  <CircleHelp className="h-5 w-5" /> Quiz om {pickedClub.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showResults ? (
                  <div className="space-y-5">
                    <div className="text-sm text-slate-300">Spørsmål {step + 1} av {total}</div>
                    <div className="text-lg font-semibold">{current?.q}</div>

                    <RadioGroup
                      value={answers[step]?.toString() ?? ''}
                      onValueChange={(val) => pickAnswer(parseInt(val))}
                      className="grid gap-2"
                    >
                      {current?.choices.map((c, idx) => (
                        <label
                          key={idx}
                          className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition bg-slate-800/60 border-slate-700 hover:bg-slate-800 ${answers[step] === idx ? 'ring-2 ring-slate-200' : ''}`}
                          onClick={() => pickAnswer(idx)}
                        >
                          <RadioGroupItem value={idx.toString()} /> <span>{c}</span>
                        </label>
                      ))}
                    </RadioGroup>

                    <div className="flex items-center justify-between pt-2">
                      <Button onClick={nextStep} disabled={typeof answers[step] !== 'number'} className="min-w-36">
                        {step < total - 1 ? 'Neste' : 'Se resultater'}
                      </Button>
                      <Button variant="ghost" onClick={resetQuiz}>Bytt spørsmål</Button>
                    </div>

                    {typeof answers[step] === 'number' && (
                      <div className="text-sm text-slate-300">
                        {answers[step] === current?.answerIndex ? (
                          <div className="flex items-center gap-2 text-emerald-300">
                            <CheckCircle2 className="h-4 w-4" /> Riktig!
                          </div>
                        ) : (
                          <div className="text-slate-300">Svar låst. Du kan gå videre.</div>
                        )}
                        {answers[step] !== undefined && current?.explanation && (
                          <div className="mt-2 text-slate-400">Forklaring: {current.explanation}</div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Results score={score} total={total} onRetry={resetQuiz} />
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

function Results({ score, total, onRetry }: { score: number; total: number; onRetry: () => void }) {
  const pct = Math.round((score / Math.max(total, 1)) * 100)
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <Trophy className="h-12 w-12" />
      <div className="text-2xl font-extrabold">{score} / {total} riktig</div>
      <div className="text-sm text-slate-300">Treffsikkerhet: {pct}%</div>
      <div className="flex gap-2 pt-2">
        <Button onClick={onRetry}>Prøv igjen</Button>
      </div>
    </div>
  )
}
