
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0b0d]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full">
            <Image
              src={logo}
              alt="FitLog Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </span>

          <span className="display-font font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        <p className="text-sm text-white/50">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

