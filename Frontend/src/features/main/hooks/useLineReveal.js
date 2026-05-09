import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const useLineReveal = (ref, delay = 0) => {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const raf = requestAnimationFrame(() => {
      const text = el.innerText
      const words = text.split(' ')

      el.innerHTML = words
        .map(w => `<span class="gsap-word" style="display:inline-block;white-space:pre">${w} </span>`)
        .join('')

      const wordEls = el.querySelectorAll('.gsap-word')
      const lineGroups = []
      let currentLine = []
      let currentTop = null

      wordEls.forEach(wordEl => {
        const top = Math.round(wordEl.getBoundingClientRect().top)
        if (currentTop === null) currentTop = top
        if (top > currentTop + 4) {
          lineGroups.push(currentLine)
          currentLine = [wordEl]
          currentTop = top
        } else {
          currentLine.push(wordEl)
        }
      })
      if (currentLine.length) lineGroups.push(currentLine)

      el.innerHTML = ''
      lineGroups.forEach(group => {
        const wrapper = document.createElement('div')
        wrapper.style.cssText = 'overflow:hidden; display:block;'

        const inner = document.createElement('div')
        inner.className = 'gsap-line'
        inner.style.cssText = 'display:block; will-change:transform;'
        inner.textContent = group.map(w => w.textContent.trimEnd()).join(' ')

        wrapper.appendChild(inner)
        el.appendChild(wrapper)
      })

      const lines = el.querySelectorAll('.gsap-line')
      gsap.fromTo(lines,
        { y: '110%' },
        {
          y: '0%',
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          delay,
        }
      )
    })

    return () => cancelAnimationFrame(raf)
  }, [])
}