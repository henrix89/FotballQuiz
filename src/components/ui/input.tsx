import React from 'react'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`rounded-xl px-3 py-2 border bg-slate-800 border-slate-700 text-slate-100 outline-none focus:ring-2 focus:ring-slate-300`} {...props} />
}
