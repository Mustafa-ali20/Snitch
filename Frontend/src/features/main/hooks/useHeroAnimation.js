import { useEffect, useRef } from "react";
import gsap from "gsap";
import { loaderState } from '../utils/loaderState'

export function useHeroAnimation() {
  const letterRefs = useRef([]);
  const underlineRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const letters = letterRefs.current;
    const underline = underlineRef.current;

    if (!letters.length || !underline) return;

    const ORDER = [2, 3, 1, 4, 0, 5];

    ctxRef.current = gsap.context(() => {
      gsap.set(letters, { y: "110%" });
      gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });

const tl = gsap.timeline({ delay: loaderState.didPlay ? 5 : 0 })

      ORDER.forEach((idx, i) => {
        tl.to(
          letters[idx],
          {
            y: "0%",
            duration: 1.1,
            ease: "power4.out",
          },
          i * 0.055,
        ); // tiny stagger, almost simultaneous
      });

      tl.to(
        underline,
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
        },
        0,
      );
    });

    return () => ctxRef.current?.revert();
  }, []);

  return { letterRefs, underlineRef };
}
