import { useLoader } from "../hooks/useLoader";
import { useLoaderAnimation } from "../hooks/useLoaderAnimation";

const IMAGE_SRCS = [
  "/images/image-01.avif",
  "/images/image-02.avif",
  "/images/image-03.avif",
  "/images/image-04.avif",
  "/images/image-05.avif",
  "/images/image-06.avif",
];

const LETTERS = ["d", "r", "y", "f", "t", "y"];

export default function Loader({ onDone }) {
  const { isLoading } = useLoader();

  const { loaderRef, cardRefs, letterRefs, counterRef, curtainRef } =
    useLoaderAnimation({
      active: isLoading,
      onComplete: onDone,
    });

  if (!isLoading) return null;

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[9999]">
      {/* ── Curtain — this slides up on exit ── */}
      <div ref={curtainRef} className="absolute inset-0 bg-[#ede8e2]" />

      {/* ── Content — stays fixed, never moves ── */}
      <div className="fixed inset-0 flex items-center justify-center">
        {/* Image stack */}
        <div
          className="relative"
          style={{
            width: "clamp(120px, 24vw, 300px)",
            height: "clamp(150px, 31vw, 380px)",
          }}
        >
          {/* Cards */}
          {IMAGE_SRCS.map((src, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute inset-0 overflow-hidden"
              style={{
                transformOrigin: "center center",
                willChange: "transform",
              }}
            >
              <div className="absolute inset-0" />
              {src && (
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover block select-none pointer-events-none"
                  draggable={false}
                />
              )}
            </div>
          ))}

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="flex font-['Neue-bold'] uppercase text-[clamp(64px,10vw,120px)] text-[#FF0101] mix-blend-multiply">
              {LETTERS.map((char, i) => (
                <span
                  key={i}
                  className="overflow-hidden inline-flex leading-none"
                >
                  <span
                    ref={(el) => (letterRefs.current[i] = el)}
                    className="inline-block will-change-transform"
                  >
                    {char}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Counter */}
          <div className="absolute flex flex-col items-end gap-1 z-10 select-none -right-20 top-35 md:-right-30 md:top-50 lg:-right-40 lg:top-25 -translate-y-1/2 overflow-hidden">
            <span
              ref={counterRef}
              className="font-['Neue'] tabular-nums text-[clamp(20px,1.6vw,25px)] text-[#FF0101] "
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
