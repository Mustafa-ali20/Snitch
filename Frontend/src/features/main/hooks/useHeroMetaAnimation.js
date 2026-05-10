import { useEffect, useRef } from "react";
import gsap from "gsap";
import { loaderState } from "../utils/loaderState";

export function useHeroMetaAnimation() {
  const brandRef = useRef(null);
  const whyLabelRef = useRef(null);
  const visitRef = useRef(null);
  const shippingRef = useRef(null);
  const copyrightRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const els = [brandRef, whyLabelRef, visitRef, shippingRef, copyrightRef];
    if (els.some((r) => !r.current)) return;

    ctxRef.current = gsap.context(() => {
      const singleEls = [
        brandRef.current,
        whyLabelRef.current,
        visitRef.current,
        shippingRef.current,
        copyrightRef.current,
      ];

      gsap.set(singleEls, { y: "110%" });

      const tl = gsap.timeline({ delay: loaderState.didPlay ? 5.1 : 0 });

      tl.to(
        brandRef.current,
        { y: "0%", duration: 0.9, ease: "power3.out" },
        0,
      );
      tl.to(
        whyLabelRef.current,
        { y: "0%", duration: 0.9, ease: "power3.out" },
        0.05,
      );
      tl.to(
        visitRef.current,
        { y: "0%", duration: 0.9, ease: "power3.out" },
        0.06,
      );
      tl.to(
        shippingRef.current,
        { y: "0%", duration: 0.9, ease: "power3.out" },
        0.1,
      );
      tl.to(
        copyrightRef.current,
        { y: "0%", duration: 0.9, ease: "power3.out" },
        0.1,
      );
    });

    return () => ctxRef.current?.revert();
  }, []);

  return { brandRef, whyLabelRef, visitRef, shippingRef, copyrightRef };
}
