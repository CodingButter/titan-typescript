import { useState, useEffect } from "react"

export const useFunctionDebouncer = <T extends (...args: any[]) => any>(func: T, delay: number) => {
  const [debouncedFunc, setDebouncedFunc] = useState<T>(() => func)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedFunc(func)
    }, delay)

    return () => clearTimeout(timeout)
  }, [func, delay])

  return debouncedFunc
}

export const useValueDebouncer = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
