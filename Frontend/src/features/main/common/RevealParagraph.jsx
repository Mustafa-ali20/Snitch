import { useRef } from 'react'
import { useLineReveal } from '../hooks/useLineReveal'

export default function RevealParagraph({ children, className, delay = 0 }) {
  const ref = useRef(null)
  useLineReveal(ref, delay)

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  )
}