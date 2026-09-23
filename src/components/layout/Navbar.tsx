"use client";

import Image from "next/image";
import Link from "next/link";
import NavLogo from "@/assets/logo.png";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const workoutActive =
    pathname === "/" || pathname.startsWith("/workouts");

  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="border-b border-white/5 bg-[#0d0e11]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
       
      {/* Logo */}
   <Link
   href="/"
   className="flex items-center gap-2 text-white"
   onClick={() => setMenuOpen(false)}
   >
  <span className="grid size-9 place-items-center rounded-full">
    <Image
      src={NavLogo}
      alt="FitLog Logo"
      width={19}
      height={19}
      className="object-contain"
    />
  </span>

  <span className="display-font text-xl font-bold tracking-wide">
    FITLOG
  </span>
</Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`text-sm font-medium transition ${
              workoutActive
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-medium transition ${
              planActive
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black"
          >
            Plan
            <span className="grid size-5 place-items-center rounded-full bg-black text-xs text-[#ccff00]">
              0
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white"
          >
            Saved
            <span className="grid size-5 place-items-center rounded-full bg-white/10 text-xs">
              0
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="grid size-10 place-items-center rounded-lg border border-white/10 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <LuX size={21} /> : <LuMenu size={21} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/5 px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium ${
                workoutActive ? "text-[#ccff00]" : "text-white/70"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium ${
                planActive ? "text-[#ccff00]" : "text-white/70"
              }`}
            >
              My Plan
            </Link>

            <div className="flex gap-3 pt-2">
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black"
              >
                Plan 0
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold"
              >
                Saved 0
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}