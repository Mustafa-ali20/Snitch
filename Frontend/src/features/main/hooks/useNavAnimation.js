import { useEffect, useRef } from "react";
import gsap from "gsap";
import { loaderState } from "../utils/loaderState";

export function useNavAnimation() {
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.set(navRef.current, { y: "-100%" });

    gsap.to(navRef.current, {
      y: "0%",
      duration: 0.9,
      ease: "power3.out",
      delay: loaderState.didPlay ? 2.2 : 0,
    });
  }, []);

  return { navRef };
}
