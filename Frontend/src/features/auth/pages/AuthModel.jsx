import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../hook/useAuth";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("signin");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const { handleLogin, handleRegister } = useAuth();
  const { loading, error } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signin") {
        const user = await handleLogin({
          identifier: formData.email,
          password: formData.password,
        });
        if (user.role === "admin") navigate("/admin/dashboard");
        else navigate("/");
      } else {
        const user = await handleRegister({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          contact: formData.contact,
        });
        if (user) navigate("/");
      }
      onClose();
    } catch (err) {
      // error already in redux via useAuth
    }
  };

  const inputClass =
    "bg-transparent border-b border-[#ede8e2]/20 py-2 text-[#ede8e2] font-['Neue'] text-sm outline-none placeholder:text-[#ede8e2]/30 focus:border-[#ede8e2]/60 transition-colors w-full";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-199 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed z-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-[#0f0f0f] border border-[#ede8e2]/10 p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-['Neue-bold'] text-[#ede8e2] uppercase text-lg tracking-widest">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </span>
          <button
            onClick={onClose}
            className="text-[#ede8e2]/60 cursor-pointer"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Toggle */}
        <div className="flex gap-6">
          {["signin", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`font-['Neue'] uppercase text-xs tracking-widest cursor-pointer pb-1 border-b transition-colors ${
                mode === m
                  ? "text-[#ede8e2] border-[#ede8e2]"
                  : "text-[#ede8e2]/30 border-transparent"
              }`}
            >
              {m === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="font-['Neue'] text-red-400 text-xs tracking-wide">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <>
              <input
                name="fullname"
                type="text"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="contact"
                type="text"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                className={inputClass}
              />
            </>
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 bg-[#ede8e2] text-[#0f0f0f] font-['Neue-bold'] uppercase text-xs tracking-widest cursor-pointer disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#ede8e2]/10" />
          <span className="font-['Neue'] text-[#ede8e2]/30 text-xs uppercase tracking-widest">
            or
          </span>
          <div className="flex-1 h-px bg-[#ede8e2]/10" />
        </div>

        {/* Google */}
        <button
          onClick={() => (window.location.href = "/api/auth/google")}
          className="w-full py-3 border border-[#ede8e2]/20 flex items-center justify-center gap-3 cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="font-['Neue'] text-[#ede8e2]/60 text-xs uppercase tracking-widest">
            Continue with Google
          </span>
        </button>
      </div>
    </>
  );
}
