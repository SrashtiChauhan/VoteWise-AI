import { useState } from "react";
import { steps } from "../data/electionSteps";
import TimelineItem from "../components/Timeline/TimelineItem";

export default function TimelinePage() {
  const [active, setActive] = useState(null);
  const [completed, setCompleted] = useState([]);

  const handleHover = (i) => {
    setActive(i);

    if (!completed.includes(i)) {
      setCompleted((prev) => [...prev, i]);
    }
  };

  return (
    <div className="pt-24 px-6 pb-16 max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Election Timeline
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Step-by-step election process
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative ml-6">

        {/* VERTICAL LINE */}
        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-gray-300 dark:bg-gray-700" />

        <div className="space-y-10">
          {steps.map((step, i) => (
            <div key={i} className="relative pl-8">

              {/* DOT */}
              <div
                className={`absolute -left-2 top-6 w-6 h-6 flex items-center justify-center rounded-full border
                ${
                  completed.includes(i)
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white dark:bg-gray-900 border-gray-400"
                }`}
              >
                {completed.includes(i) ? "✓" : ""}
              </div>

              {/* CARD */}
              <TimelineItem
                step={step}
                index={i}
                active={active === i}
                completed={completed.includes(i)}
                onHover={() => handleHover(i)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* PROGRESS */}
      <div className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
        Progress: {completed.length} / {steps.length}
      </div>
    </div>
  );
}