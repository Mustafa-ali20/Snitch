import { useHeroAnimation } from "../../hooks/useHeroAnimation";

const LETTERS = ["d", "r", "y", "f", "t", "y"];

export default function HeroText() {
  const { letterRefs, underlineRef } = useHeroAnimation();

  return (
    <div className="flex flex-col w-screen">
      <div className="flex w-screen overflow-hidden px-3 lg:px-0">
        {LETTERS.map((char, i) => (
          <span key={i} className="overflow-hidden inline-flex">
            <span
              ref={(el) => (letterRefs.current[i] = el)}
              className="inline-block will-change-transform font-['Neue-bold'] uppercase text-[23vw] lg:text-[24vw] leading-25 md:leading-40 lg:leading-120 text-[#ede8e2] "
            >
              {char}
            </span>
          </span>
        ))}
      </div>

      <div className="px-4 lg:px-10">
        <div
          ref={underlineRef}
          className="w-full h-1 md:h-1.5 bg-[#ede8e2] origin-left will-change-transform mt-1.5 md:mt-4 "
        />
      </div>
    </div>
  );
}
