import { useNavAnimation } from "../../hooks/useNavAnimation";
import { useSelector } from "react-redux";
import { User } from "lucide-react";
import { useState } from "react";
import AuthModal from "../../../auth/pages/AuthModel";
import { useAuth } from "../../../auth/hook/useAuth";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { navRef } = useNavAnimation();
  const bagCount = useSelector((s) => s.bag?.count ?? 0);
  const user = useSelector((s) => s.auth.user);
  const [authOpen, setAuthOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-99 flex items-center justify-between px-5 py-8 md:py-10 md:px-6 lg:px-10 lg:py-12 will-change-transform"
      >
        <div className="font-['Neue-bold'] text-[#ede8e2] uppercase text-base lg:text-2xl">
          DY
        </div>

        <div className="flex items-center gap-8 lg:gap-30">
          <span className="hidden md:block font-['Neue'] text-[#ede8e2] text-xl lg:text-2xl cursor-pointer">
            Menu
          </span>
          <span className="hidden md:block font-['Neue'] text-[#ede8e2] text-xl lg:text-2xl cursor-pointer">
            Shop
          </span>
          <span className="font-['Neue'] text-[#ede8e2] text-xl lg:text-2xl cursor-pointer">
            Bag ({bagCount})
          </span>
          <span className="md:hidden font-['Neue'] text-[#ede8e2] text-base cursor-pointer">
            Menu
          </span>

          {/* User area */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="w-8 h-8 rounded-full bg-[#ede8e2] text-[#0f0f0f] flex items-center justify-center font-['Neue-bold'] text-xs cursor-pointer"
              >
                {getInitials(user.fullname)}
              </button>

              {dropdownOpen && (
                <>
                  {/* close on outside click */}
                  <div
                    className="fixed inset-0 z-98"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-10 z-99 bg-[#0f0f0f] border border-[#ede8e2]/10 flex flex-col min-w-40">
                    <div className="px-4 py-3 border-b border-[#ede8e2]/10">
                      <p className="font-['Neue'] text-[#ede8e2] text-xs tracking-widest uppercase truncate">
                        {user.fullname}
                      </p>
                      <p className="font-['Neue'] text-[#ede8e2]/40 text-xs truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    {user.role === "admin" && (
                      <button
                        onClick={() => {
                          navigate("/admin/dashboard");
                          setDropdownOpen(false);
                        }}
                        className="px-4 py-3 text-left font-['Neue'] text-[#ede8e2] text-xs uppercase tracking-widest cursor-pointer hover:bg-[#ede8e2]/5"
                      >
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={async () => {
                        await handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-3 text-left font-['Neue'] text-[#FF0101] text-xs uppercase tracking-widest cursor-pointer hover:bg-[#ede8e2]/5"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="text-[#ede8e2] cursor-pointer"
            >
              <User size={22} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
