import React, {createContext, useContext, useState} from 'react'

type TabsCtx = { value: string, setValue: (v: string) => void }
const Ctx = createContext<TabsCtx | null>(null)

export function Tabs({ defaultValue, children, className = '' }: { defaultValue: string, children: React.ReactNode, className?: string }) {
  const [value, setValue] = useState(defaultValue)
  return <div className={className}><Ctx.Provider value={{value, setValue}}>{children}</Ctx.Provider></div>
}

export function TabsList({ children, className='' }: { children: React.ReactNode, className?: string }) {
  return <div className={`inline-flex gap-2 rounded-xl p-1 ${className}`}>{children}</div>
}

export function TabsTrigger({ value, children, className='' }: { value: string, children: React.ReactNode, className?: string }) {
  const ctx = useContext(Ctx)!
  const active = ctx.value === value
  return (
    <button
      onClick={() => ctx.setValue(value)}
      className={`px-3 py-2 rounded-lg text-sm border ${active ? 'bg-slate-800 text-white border-slate-600' : 'bg-transparent text-slate-300 border-slate-700 hover:bg-slate-800' } ${className}`}
    >{children}</button>
  )
}

export function TabsContent({ value, children, className='' }: { value: string, children: React.ReactNode, className?: string }) {
  const ctx = useContext(Ctx)!
  if (ctx.value !== value) return null
  return <div className={className}>{children}</div>
}
