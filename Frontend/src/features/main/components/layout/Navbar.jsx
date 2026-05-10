import { useNavAnimation } from "../../hooks/useNavAnimation";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { navRef } = useNavAnimation();
  const bagCount = useSelector((s) => s.bag?.count ?? 0);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-99 flex items-center justify-between px-5 py-8 md:py-10 md:px-6 lg:px-10 lg:py-12 will-change-transform"
    >
      {/* Logo */}
      <div className="font-['Neue-bold'] text-[#ede8e2] uppercase text-base lg:text-2xl">
        DY
      </div>

      {/* Right */}
      <div className="flex items-center gap-8 lg:gap-30">
        {/* Shop — large only */}

        <span className="hidden md:block font-['Neue'] text-[#ede8e2] text-xl lg:text-2xl cursor-pointer">
          Menu
        </span>

        <span className="hidden md:block font-['Neue'] text-[#ede8e2] text-xl lg:text-2xl cursor-pointer">
          Shop
        </span>

        {/* Bag */}
        <span className="font-['Neue'] text-[#ede8e2] text-xl lg:text-2xl cursor-pointer">
          Bag ({bagCount})
        </span>

        {/* Menu — small only, text only, beside bag */}
        <span className="md:hidden font-['Neue'] text-[#ede8e2] text-base cursor-pointer">
          Menu
        </span>
      </div>
    </nav>
  );
}
