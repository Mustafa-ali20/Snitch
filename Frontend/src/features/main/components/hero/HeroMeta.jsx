import { useHeroMetaAnimation } from "../../hooks/useHeroMetaAnimation";
import RevealParagraph from "../../common/RevealParagraph";

export default function HeroMeta() {
  const {
    brandRef,
    whyLabelRef,
    whyTextRef,
    visitRef,
    shippingRef,
    copyrightRef,
  } = useHeroMetaAnimation();

  return (
    <div className="w-full px-4 lg:px-10 py-8 text-[#ede8e2] font-['Neue']">
      {/* Large screen: single row — small/medium: wraps to grid */}
      <div className="grid grid-cols-2 md:grid-cols-[1fr_2fr_1fr_1fr] gap-y-8 gap-x-4">
        {/* Brand */}
        <div className="overflow-hidden h-fit">
          <span
            ref={brandRef}
            className="inline-block will-change-transform uppercase text-xs lg:text-sm"
          >
            dryfty
          </span>
        </div>

        {/* Why */}
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden">
            <span
              ref={whyLabelRef}
              className="inline-block will-change-transform uppercase text-xs lg:text-sm"
            >
              why
            </span>
          </div>

          <RevealParagraph
            className="lg:text-sm text-xs leading-relaxed text-[#ede8e2] max-w-xl"
            delay={5.1}
          >
            Created by the dryfty team, this store and signature collection
            celebrates our collective creativity and passion for apparel.
            Carefully designed.
          </RevealParagraph>
        </div>

        {/* Visit */}
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden">
            <span
              ref={visitRef}
              className="inline-block will-change-transform uppercase text-xs lg:text-sm cursor-pointer transition-opacity"
            >
              <a
                href="https://mustafa-space.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className=" no-underline"
              >
                visit portfolio
              </a>
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              ref={shippingRef}
              className="inline-block will-change-transform uppercase text-xs lg:text-sm cursor-pointer transition-opacity"
            >
              shipping &amp; returns
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="overflow-hidden h-fit flex col-span-1 md:col-span-1 justify-end">
          <span
            ref={copyrightRef}
            className="inline-block will-change-transform uppercase text-xs lg:text-sm text-[#ede8e2]"
          >
            © 2026
          </span>
        </div>
      </div>
    </div>
  );
}
