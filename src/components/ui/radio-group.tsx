import React from 'react'

type Props = {
  value?: string
  onValueChange?: (v: string) => void
  className?: string
  children?: React.ReactNode
}

type RadioGroupContextValue = {
  selectedValue?: string
  onSelect?: (value: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({})

export function RadioGroup({ value, onValueChange, className = '', children }: Props) {
  const contextValue = React.useMemo<RadioGroupContextValue>(
    () => ({ selectedValue: value, onSelect: onValueChange }),
    [value, onValueChange],
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={className} role="radiogroup" data-value={value}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

type RadioGroupItemProps = {
  value: string
  id?: string
  className?: string
}

export function RadioGroupItem({ value, id, className }: RadioGroupItemProps) {
  const { selectedValue, onSelect } = React.useContext(RadioGroupContext)
  const checked = selectedValue === value

  return (
    <span
      id={id}
      onClick={() => onSelect?.(value)}
      className={`inline-block h-4 w-4 rounded-full border ${checked ? 'bg-slate-200 border-slate-200' : 'border-slate-500'} cursor-pointer ${className ?? ''}`}
      role="radio"
      aria-checked={checked}
      data-value={value}
    />
  )
}
