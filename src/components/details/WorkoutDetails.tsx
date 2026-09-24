"use client";

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
import { toast } from "react-toastify";

import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

type WorkoutDetailsProps = {
  workout: Workout;
};

export default function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  const { planIds, hydrated, addToPlan, saveForLater, isInPlan, isSaved } =
    usePlan();

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  function handleAddToPlan() {
    const result = addToPlan(workout.id);

    if (result === "added") {
      toast.success("Added to today's plan.");
    }

    if (result === "exists") {
      toast.info("This workout is already in today's plan.");
    }

    if (result === "limit") {
      toast.error("Today's plan can contain up to 5 lifts.");
    }
  }

  function handleSave() {
    const result = saveForLater(workout.id);

    if (result === "saved") {
      toast.success("Workout saved for later.");
    }

    if (result === "exists") {
      toast.info("This workout is already saved.");
    }
  }

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
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-[#272b33] bg-[#15171c]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-black uppercase text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h1 className="display-font text-5xl font-bold uppercase leading-none sm:text-6xl">
            {workout.name}
          </h1>

          <p className="mt-6 leading-7 text-white/55">{workout.description}</p>

          <div className="mt-7 flex flex-wrap gap-5 border-y border-white/10 py-5 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <LuClock3 size={16} />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-2">
              <LuFlame size={16} />
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-2">
              <LuStar size={16} />
              {workout.rating}
            </span>
          </div>

          <div className="mt-7 overflow-hidden rounded-2xl border border-[#272b33]">
            {[
              ["EQUIPMENT", workout.equipment],
              ["DIFFICULTY", workout.difficulty],
              ["SETS", String(workout.sets)],
              ["REPS", workout.reps],
              ["DURATION", `${workout.duration} minutes`],
              ["CALORIES", `${workout.caloriesBurned} kcal`],
              ["RATING", String(workout.rating)],
            ].map(([label, value], index, array) => (
              <div
                key={label}
                className={`grid grid-cols-2 ${
                  index !== array.length - 1 ? "border-b border-[#272b33]" : ""
                }`}
              >
                <div className="p-4 text-xs font-bold tracking-wider text-white/40">
                  {label}
                </div>

                <div className="border-l border-[#272b33] p-4 text-sm">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="display-font text-3xl font-bold uppercase">
              Instructions
            </h2>

            <ol className="mt-5 space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={instruction}
                  className="flex gap-4 border-b border-white/5 pb-4"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-white/60">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToPlan}
              disabled={
                !hydrated ||
                alreadyInPlan ||
                (planIds.length >= 5 && !alreadyInPlan)
              }
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:bg-[#d8ff33] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <LuCalendarPlus size={18} />
              {alreadyInPlan ? "In today's plan" : "Add to today's plan"}
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!hydrated || alreadySaved}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <LuBookmark size={18} />
              {alreadySaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
