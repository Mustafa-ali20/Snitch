import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useNavAnimation() {
  const navRef = useRef(null)

  useEffect(() => {
    if (!navRef.current) return

    gsap.set(navRef.current, { y: '-100%' })

    gsap.to(navRef.current, {
      y: '0%',
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.1,
    })
  }, [])

  return { navRef }
}