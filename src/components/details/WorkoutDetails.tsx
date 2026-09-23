import Image from "next/image";
import Link from "next/link";
import {
  LuArrowLeft,
  LuBookmark,
  LuCalendarPlus,
  LuClock3,
  LuFlame,
  LuStar,
} from "react-icons/lu";

import { Workout } from "@/types/workout";

type WorkoutDetailsProps = {
  workout: Workout;
};

export default function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:py-16">
      <Link
        href="/#library"
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
      >
        <LuArrowLeft size={16} />
        Back to library
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-[#272b33] bg-[#15171c]">
          <Image
            src={workout.image}
            alt={workout.name}
            width={588}
            height={773}
            priority
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div>
          <h1 className="display-font text-3xl font-bold uppercase leading-[0.9] sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-4 pb-3 leading-6 text-white/55">
            {workout.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-black uppercase text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#272b33] bg-[#1E2330]">
            <div className="flex items-center justify-between border-b border-[#272b33] px-3 py-2.5">
              <span className="text-[10px] font-bold tracking-wider text-white/40">
                EQUIPMENT
              </span>
              <span className="text-xs text-white">{workout.equipment}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#272b33] px-3 py-2.5">
              <span className="text-[10px] font-bold tracking-wider text-white/40">
                DIFFICULTY
              </span>
              <span className="text-xs text-white">{workout.difficulty}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#272b33] px-3 py-2.5">
              <span className="text-[10px] font-bold tracking-wider text-white/40">
                SETS
              </span>
              <span className="text-xs text-white">{workout.sets}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#272b33] px-3 py-2.5">
              <span className="text-[10px] font-bold tracking-wider text-white/40">
                REPS
              </span>
              <span className="text-xs text-white">{workout.reps}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#272b33] px-3 py-2.5">
              <span className="text-[10px] font-bold tracking-wider text-white/40">
                DURATION
              </span>
              <span className="text-xs text-white">
                {workout.duration} minutes
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#272b33] px-3 py-2.5">
              <span className="text-[10px] font-bold tracking-wider text-white/40">
                CALORIES
              </span>
              <span className="text-xs text-white">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="text-[10px] font-bold tracking-wider text-white/40">
                RATING
              </span>
              <span className="text-xs text-white">{workout.rating}</span>
            </div>
          </div>
          {/* Instructions */}
          <div className="mt-7">
            <h2 className="text-[16px] font-extrabold uppercase">
              Instructions
            </h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3">
                  <span className="shrink-0 text-sm font-bold text-[#ccff00]">
                    {index + 1}.
                  </span>

                  <p className="text-sm leading-5 text-white/60">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-[12px] bg-[#ccff00] px-3 py-3 text-sm font-black text-black"
            >
              <LuCalendarPlus size={18} />
              Add to today&apos;s plan
            </button>

            <button
              type="button"
              className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-[12px] border border-white/15 px-3 py-3 text-sm font-bold text-white"
            >
              <LuBookmark size={18} />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
