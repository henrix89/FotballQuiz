import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost'
}

export function Button({ variant = 'default', className = '', ...props }: Props) {
  const base = 'rounded-2xl px-4 py-2 text-sm font-semibold transition shadow-sm'
  const styles: Record<string, string> = {
    default: 'bg-slate-100 text-slate-900 hover:bg-white',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-600',
    ghost: 'bg-transparent text-slate-200 hover:bg-slate-800',
  }
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />
}
