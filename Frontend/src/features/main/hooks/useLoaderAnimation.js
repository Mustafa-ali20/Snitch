import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useLoaderAnimation({ onComplete, active }) {
  const cardRefs = useRef([]);
  const letterRefs = useRef([]);
  const counterRef = useRef(null);
  const loaderRef = useRef(null);
  const ctxRef = useRef(null);
  const curtainRef = useRef(null);

  const ROTATIONS = [-14, 8, -5, 18, -22, 3];
  const SCALES = [1, 0.97, 1.02, 0.95, 1.01, 0.98];

  const LETTER_ORDER = [2, 5, 0, 1, 4, 3];

  useEffect(() => {
    if (!active) return;

    const cards = cardRefs.current;
    const letters = letterRefs.current;
    const counter = counterRef.current;
    const loader = loaderRef.current;

    if (!cards.length || !letters.length || !counter || !loader) return;

    ctxRef.current = gsap.context(() => {
      // ── Initial states ──
      gsap.set(cards, { scale: 0, transformOrigin: "center center" });
      cards.forEach((card, i) => gsap.set(card, { rotation: ROTATIONS[i] }));
      gsap.set(letters, { y: "110%" });

      const tl = gsap.timeline();

      tl.to(
        cards,
        {
          scale: (i) => SCALES[i],
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          opacity: 1,
        },
        0,
      );

      const counterObj = { val: 0 };
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 1.8,
          ease: "power1.inOut",
          onUpdate() {
            counter.textContent = String(Math.round(counterObj.val)).padStart(
              3,
              "0",
            );
          },
        },
        0,
      );

      const lettersIn = gsap.timeline();
      LETTER_ORDER.forEach((idx, i) => {
        lettersIn.to(
          letters[idx],
          {
            y: "0%",
            duration: 0.9,
            ease: "power3.out",
          },
          i * 0.12,
        );
      });
      tl.add(lettersIn, 0.1);

      tl.to({}, { duration: 1.1 });

      const lettersOut = gsap.timeline();
      LETTER_ORDER.forEach((idx, i) => {
        lettersOut.to(
          letters[idx],
          {
            y: "-110%",
            duration: 0.48,
            ease: "power3.in",
          },
          i * 0.07,
        );
      });

      const exitStart = tl.duration();
      tl.to(
        counterRef.current,
        {
          y: "-110%",
          duration: 0.4,
          ease: "power3.in",
        },
        "+=0",
      );
      tl.add(lettersOut, "+=0");
      tl.to(
        [...cards].reverse(),
        {
          scale: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.in",
        },
        "<",
      );

      tl.to(
        curtainRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: "power3.inOut",
          onComplete,
        },
        "-=0.3",
      );
    });

    return () => {
      ctxRef.current?.revert();
    };
  }, [active]);

  return {
    loaderRef,
    cardRefs,
    letterRefs,
    counterRef,
    curtainRef,
  };
}
