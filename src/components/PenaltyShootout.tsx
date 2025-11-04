import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

const STORAGE_KEYS = {
  bestScore: 'penalty-best-score',
  bestStreak: 'penalty-best-streak',
}

type Direction = 'left' | 'center' | 'right'

type ShotOutcome = {
  id: number
  round: number
  direction: Direction
  keeperGuess: Direction
  result: 'goal' | 'saved' | 'post'
}

const DIRECTIONS: { id: Direction; label: string; sublabel: string; gradient: string }[] = [
  { id: 'left', label: 'Venstre', sublabel: 'Curl den i lengste', gradient: 'from-emerald-500 to-emerald-700' },
  { id: 'center', label: 'Midten', sublabel: 'Lobb den iskaldt', gradient: 'from-sky-500 to-indigo-600' },
  { id: 'right', label: 'Høyre', sublabel: 'Knus nettet', gradient: 'from-amber-500 to-orange-600' },
]

const resultCopy: Record<ShotOutcome['result'], { title: string; tone: string }> = {
  goal: { title: 'Mål! ⚽', tone: 'Det ble sus i nettet og jubel på tribunen.' },
  saved: { title: 'Reddet! 🧤', tone: 'Keeperen gikk riktig vei og parerte forsøket.' },
  post: { title: 'Stolpetreff! 🪵', tone: 'Ballens klang i metallet stilnet publikum.' },
}

const randomChoice = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const usePersistentNumber = (key: string, defaultValue: number): [number, (value: number) => void] => {
  const [value, setValue] = useState<number>(() => {
    if (typeof window === 'undefined') return defaultValue
    const stored = window.localStorage.getItem(key)
    const parsed = stored ? Number(stored) : NaN
    return Number.isFinite(parsed) ? parsed : defaultValue
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(key, String(value))
  }, [key, value])

  return [value, setValue]
}

export const PenaltyShootout: React.FC = () => {
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [streak, setStreak] = useState(0)
  const [shotsTaken, setShotsTaken] = useState(0)
  const [history, setHistory] = useState<ShotOutcome[]>([])
  const [feedback, setFeedback] = useState('Velg hvor du vil skyte for å starte runden.')
  const [isResolving, setIsResolving] = useState(false)
  const [bestScore, setBestScore] = usePersistentNumber(STORAGE_KEYS.bestScore, 0)
  const [bestStreak, setBestStreak] = usePersistentNumber(STORAGE_KEYS.bestStreak, 0)
  const timeoutRef = useRef<number | null>(null)

  const gameOver = lives === 0

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const resetGame = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
    setScore(0)
    setLives(3)
    setStreak(0)
    setShotsTaken(0)
    setHistory([])
    setFeedback('Velg hvor du vil skyte for å starte runden.')
    setIsResolving(false)
  }, [])

  const accuracy = useMemo(() => {
    if (shotsTaken === 0) return 0
    return Math.round((score / shotsTaken) * 100)
  }, [score, shotsTaken])

  const keeperTendencies = useMemo(() => {
    if (history.length === 0) return null
    const totals = history.reduce(
      (acc, shot) => {
        acc[shot.keeperGuess] += 1
        return acc
      },
      { left: 0, center: 0, right: 0 } as Record<Direction, number>
    )
    const sum = totals.left + totals.center + totals.right
    return {
      left: Math.round((totals.left / sum) * 100),
      center: Math.round((totals.center / sum) * 100),
      right: Math.round((totals.right / sum) * 100),
    }
  }, [history])

  const handleShot = useCallback(
    (direction: Direction) => {
      if (gameOver || isResolving) return

      setIsResolving(true)

      const keeperGuess = randomChoice(['left', 'center', 'right'] as Direction[])
      const roll = Math.random()

      const advantage = keeperGuess === direction ? 0.35 : 0.85
      const isGoal = roll < advantage

      const missRoll = Math.random()
      const result: ShotOutcome['result'] = isGoal ? 'goal' : missRoll > 0.5 ? 'saved' : 'post'

      const outcome: ShotOutcome = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        round: shotsTaken + 1,
        direction,
        keeperGuess,
        result,
      }

      setHistory((prev) => [outcome, ...prev].slice(0, 8))
      setShotsTaken((prev) => prev + 1)

      let updatedLives = lives

      if (result === 'goal') {
        setScore((prev) => {
          const next = prev + 1
          if (next > bestScore) {
            setBestScore(next)
          }
          return next
        })
        setStreak((prev) => {
          const next = prev + 1
          if (next > bestStreak) {
            setBestStreak(next)
          }
          return next
        })
        setFeedback(randomChoice([
          'Keeperen står og ser ballen suse inn! Legg på press.',
          'Publikum eksploderer – du er i sonen!',
          'Iskald avslutning. Fortsett å dominere!',
        ]))
      } else {
        setLives((prev) => {
          const next = Math.max(prev - 1, 0)
          updatedLives = next
          return next
        })
        setStreak(0)
        setFeedback(
          result === 'saved'
            ? 'Keeperen plukker den! Ta et øyeblikk, pust og gå igjen.'
            : 'Au! Stolpen er ingen venn. Rist det av deg og prøv igjen.'
        )
      }

      if (typeof window !== 'undefined') {
        timeoutRef.current = window.setTimeout(() => {
          setIsResolving(false)
          if (result !== 'goal') {
            if (updatedLives === 1) {
              setFeedback('Siste sjanse! Finn et hjørne og avslutt klinisk.')
            } else if (updatedLives === 0) {
              setFeedback('Game over! Trykk «Spill igjen» for å jakte ny rekord.')
            }
          }
        }, 650)
      } else {
        setIsResolving(false)
      }
    },
    [bestScore, bestStreak, gameOver, isResolving, lives, setBestScore, setBestStreak, shotsTaken]
  )

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <p className="text-sm font-semibold text-emerald-200">Straffekonk – uendelig modus</p>
        <p className="mt-1 text-sm text-slate-200">
          Sett straffespark på løpende bånd. Du har tre baller i magasinet – mister du alle, er det over.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Score</p>
          <p className="mt-1 text-3xl font-semibold text-white">{score}</p>
          <p className="mt-2 text-xs text-slate-400">Personlig rekord: {bestScore}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Streak</p>
          <p className="mt-1 text-3xl font-semibold text-white">{streak}</p>
          <p className="mt-2 text-xs text-slate-400">Beste run: {bestStreak}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Treffsikkerhet</p>
          <p className="mt-1 text-3xl font-semibold text-white">{accuracy}%</p>
          <p className="mt-2 text-xs text-slate-400">Skudd tatt: {shotsTaken}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Liv igjen</p>
          <div className="mt-2 flex gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`h-10 flex-1 rounded-2xl border transition ${
                  index < lives
                    ? 'border-emerald-400/60 bg-emerald-500/30'
                    : 'border-white/10 bg-white/5 text-slate-500'
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">Hold på alle tre for å bygge monstrøse rekker.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-sm text-emerald-100 backdrop-blur">
        <p className="font-semibold text-emerald-200">{feedback}</p>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur">
        <p className="text-sm font-semibold text-slate-200">Velg hvor du går for neste straffe</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {DIRECTIONS.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => handleShot(option.id)}
              whileTap={{ scale: 0.94 }}
              disabled={isResolving || gameOver}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-4 text-left shadow-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-300/70 ${
                option.gradient
              } ${isResolving || gameOver ? 'opacity-70' : 'hover:opacity-90'}`}
            >
              <div className="relative z-10">
                <p className="text-lg font-semibold text-white">{option.label}</p>
                <p className="mt-1 text-xs text-white/80">{option.sublabel}</p>
              </div>
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-0 bg-white/15 mix-blend-overlay" />
              </div>
            </motion.button>
          ))}
        </div>
        {gameOver && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <p className="font-semibold text-white">Game over!</p>
            <p className="mt-1 text-slate-300">Rekordene er lagret. Trykk under for å spille igjen.</p>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={resetGame} variant="secondary" className="bg-white/10 text-slate-100 hover:bg-white/20">
            Spill igjen
          </Button>
          <Button
            onClick={() => {
              if (!isResolving && !gameOver) {
                handleShot(randomChoice(DIRECTIONS.map((d) => d.id)))
              }
            }}
            variant="ghost"
            className="text-slate-300 hover:text-white"
          >
            Overrask meg
          </Button>
        </div>
      </div>

      <div className="flex-1 rounded-3xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur">
        <p className="text-sm font-semibold text-slate-200">Siste avslutninger</p>
        {history.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">Ingen skudd ennå. Gå til straffemerket og sett tonen.</p>
        ) : (
          <ul className="mt-3 space-y-3 overflow-y-auto pr-1 text-sm">
            {history.map((shot) => (
              <li
                key={shot.id}
                className={`flex flex-col rounded-2xl border p-4 transition ${
                  shot.result === 'goal'
                    ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-100'
                    : 'border-white/10 bg-white/5 text-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base font-semibold">
                    {resultCopy[shot.result].title}{' '}
                    <span className="text-xs uppercase tracking-[0.2em] text-white/70">Skudd #{shot.round}</span>
                  </p>
                  <p className="text-xs text-white/70">
                    Du skjøt {shot.direction === 'left' ? 'til venstre' : shot.direction === 'right' ? 'til høyre' : 'midt i mål'}
                  </p>
                </div>
                <p className="mt-1 text-xs text-white/70">
                  Keeperen gikk {shot.keeperGuess === 'left' ? 'mot venstre' : shot.keeperGuess === 'right' ? 'mot høyre' : 'sto igjen i midten'}.
                </p>
                <p className="mt-2 text-sm">{resultCopy[shot.result].tone}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {keeperTendencies && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 backdrop-blur">
          <p className="font-semibold text-slate-100">Keeperens tendenser</p>
          <p className="mt-1 text-xs text-slate-400">Hold øye med hvor ofte målvakten går – utnytt mønstrene.</p>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Venstre</p>
              <p className="mt-1 text-lg font-semibold text-white">{keeperTendencies.left}%</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Midten</p>
              <p className="mt-1 text-lg font-semibold text-white">{keeperTendencies.center}%</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Høyre</p>
              <p className="mt-1 text-lg font-semibold text-white">{keeperTendencies.right}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PenaltyShootout
