"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getWorkouts } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

import Spinner from "@/components/shared/Spinner";
import PlanMetrics from "./PlanMetrics";
import PlanWorkoutCard from "./PlanWorkoutCard";

type Tab = "plan" | "saved";

export default function PlanClient() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("plan");

  const { planIds, savedIds } = usePlan();

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const planWorkouts = workouts.filter((workout) =>
    planIds.includes(workout.id),
  );

  const savedWorkouts = workouts.filter((workout) =>
    savedIds.includes(workout.id),
  );

  const currentWorkouts = activeTab === "plan" ? planWorkouts : savedWorkouts;

  const totalMinutes = planWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = planWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-[1280px] flex-col items-center justify-center px-5">
        <Spinner />

        <p className="mt-4 text-sm text-white/50">Loading workouts…</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 lg:py-16">
      <div className="mb-10">
        <h1 className="display-font text-5xl font-bold uppercase">My Plan</h1>

        <p className="mt-3 text-white/50">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <PlanMetrics
        exercises={planWorkouts.length}
        minutes={totalMinutes}
        calories={totalCalories}
      />

      <div className="mt-10">
        <div className="tabs tabs-box">
          <input
            type="radio"
            name="plan_tabs"
            className="tab"
            aria-label="Today's Plan"
            checked={activeTab === "plan"}
            onChange={() => setActiveTab("plan")}
          />

          <input
            type="radio"
            name="plan_tabs"
            className="tab"
            aria-label="Saved"
            checked={activeTab === "saved"}
            onChange={() => setActiveTab("saved")}
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {currentWorkouts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 px-5 py-20 text-center">
            <h2 className="display-font text-3xl font-bold uppercase">
              Nothing Here Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/45">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-6 inline-flex rounded-full bg-[#ccff00] px-5 py-3 text-sm font-black text-black"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          currentWorkouts.map((workout) => (
            <PlanWorkoutCard
              key={workout.id}
              workout={workout}
              mode={activeTab}
            />
          ))
        )}
      </div>
    </section>
  );
}
