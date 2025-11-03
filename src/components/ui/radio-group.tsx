import React from 'react'

type Props = {
  value?: string
  onValueChange?: (v: string) => void
  className?: string
  children?: React.ReactNode
}
export function RadioGroup({ value, onValueChange, className='', children }: Props) {
  return <div className={className} role='radiogroup' data-value={value}>{React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child
    return React.cloneElement(child as any, { selectedValue: value, onSelect: onValueChange })
  })}</div>
}

export function RadioGroupItem({ value, selectedValue, onSelect }: any) {
  const checked = selectedValue === value
  return (
    <span
      onClick={() => onSelect?.(value)}
      className={`inline-block h-4 w-4 rounded-full border ${checked ? 'bg-slate-200 border-slate-200' : 'border-slate-500'} cursor-pointer`}
      role='radio'
      aria-checked={checked}
      data-value={value}
    />
  )
}
