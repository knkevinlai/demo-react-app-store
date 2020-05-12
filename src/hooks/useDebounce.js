import { useState, useEffect, useRef } from 'react'
import debounce from 'lodash/debounce'

export default function useDebounce(value, delay) {
  const [ debouncedValue, setDebouncedValue ] = useState(value)

  const debounceSetDebouncedValueRef = useRef(debounce(setDebouncedValue, delay))

  useEffect(() => {
    debounceSetDebouncedValueRef.current(value)
  }, [ value ])

  return [ debouncedValue, setDebouncedValue ]
}
