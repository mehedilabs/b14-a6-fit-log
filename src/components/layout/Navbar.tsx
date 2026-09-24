"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuDumbbell, LuMenu, LuX } from "react-icons/lu";

import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { planIds, savedIds, hydrated } = usePlan();

  const planCount = hydrated ? planIds.length : 0;
  const savedCount = hydrated ? savedIds.length : 0;

  const workoutActive = pathname === "/" || pathname.startsWith("/workouts");

  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="border-b border-white/5 bg-[#0d0e11]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid size-9 place-items-center rounded-full bg-[#ccff00] text-black">
            <LuDumbbell size={19} />
          </span>

          <span className="display-font text-xl font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

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
              planActive ? "text-[#ccff00]" : "text-white/60 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black"
          >
            Plan
            <span className="grid size-5 place-items-center rounded-full bg-black text-xs text-[#ccff00]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold"
          >
            Saved
            <span className="grid size-5 place-items-center rounded-full bg-white/10 text-xs">
              {savedCount}
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="grid size-10 place-items-center rounded-lg border border-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <LuX size={21} /> : <LuMenu size={21} />}
        </button>
      </div>

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
                Plan {planCount}
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold"
              >
                Saved {savedCount}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
