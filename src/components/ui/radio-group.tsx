import React from 'react'

type Props = {
  value?: string
  onValueChange?: (v: string) => void
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

type RadioGroupContextValue = {
  selectedValue?: string
  onSelect?: (value: string) => void
  disabled?: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({})

export function RadioGroup({ value, onValueChange, className = '', children, disabled = false }: Props) {
  const contextValue = React.useMemo<RadioGroupContextValue>(
    () => ({ selectedValue: value, onSelect: onValueChange, disabled }),
    [value, onValueChange, disabled],
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={className} role="radiogroup" data-value={value} aria-disabled={disabled}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

type RadioGroupItemProps = {
  value: string
  id?: string
  className?: string
  disabled?: boolean
}

export function RadioGroupItem({ value, id, className, disabled: itemDisabled }: RadioGroupItemProps) {
  const { selectedValue, onSelect, disabled: groupDisabled } = React.useContext(RadioGroupContext)
  const checked = selectedValue === value
  const disabled = itemDisabled ?? groupDisabled

  function handleClick() {
    if (disabled) return
    onSelect?.(value)
  }

  return (
    <span
      id={id}
      onClick={handleClick}
      className={`inline-block h-4 w-4 rounded-full border ${checked ? 'bg-slate-200 border-slate-200' : 'border-slate-500'} ${
        disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
      } ${className ?? ''}`}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled}
      data-value={value}
    />
  )
}
