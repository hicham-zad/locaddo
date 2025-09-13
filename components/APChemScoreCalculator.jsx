"use client";

import { useMemo, useState } from "react";

/**
 * AP Chemistry Score Calculator (Unofficial Estimator)
 * - Section Weights: MCQ 50%, FRQ 50% (normalized to 100 composite)
 * - MCQ max: 60 questions
 * - FRQ max: 46 points (typical combined rubric total)
 * - Curves: thresholds for 1–5 are illustrative; adjust to taste/site data.
 */

const CURVES = {
  typical: { name: "Typical", bands: [0, 30, 45, 65, 85, 101] },  // 1,2,3,4,5
  lenient: { name: "Lenient", bands: [0, 28, 42, 60, 80, 101] },
  strict:  { name: "Strict",  bands: [0, 33, 50, 70, 88, 101] },
};

const MAXS = { mcq: 60, frq: 46 };

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, Number.isFinite(n) ? n : 0));
}

function pct(n) {
  return `${(n * 100).toFixed(0)}%`;
}

function scoreToBand(composite, bands) {
  // bands length 6 => [min, t2, t3, t4, t5, max]
  if (composite < bands[1]) return 1;
  if (composite < bands[2]) return 2;
  if (composite < bands[3]) return 3;
  if (composite < bands[4]) return 4;
  return 5;
}

export default function APChemScoreCalculator() {
  const [mcq, setMcq] = useState(36);      // default mid
  const [frq, setFrq] = useState(28);      // default mid
  const [curveKey, setCurveKey] = useState("typical");

  const curve = CURVES[curveKey];

  const { composite, apScore, mcqPct, frqPct, nextBreak, neededMcqForNext } = useMemo(() => {
    const mcqNorm = clamp(mcq, 0, MAXS.mcq) / MAXS.mcq; // 0..1
    const frqNorm = clamp(frq, 0, MAXS.frq) / MAXS.frq; // 0..1

    const composite = (mcqNorm * 50) + (frqNorm * 50); // 0..100
    const apScore = scoreToBand(composite, curve.bands);

    // find next band threshold (for CTA)
    let nextBreak = null;
    if (apScore < 5) {
      const thresholds = [null, curve.bands[1], curve.bands[2], curve.bands[3], curve.bands[4], curve.bands[5]];
      nextBreak = thresholds[apScore + 1];
    }

    // If user wants to reach nextBreak, given current FRQ, what's needed MCQ correct?
    let neededMcqForNext = null;
    if (nextBreak != null) {
      // nextBreak <= (mcq/60*50 + frq/46*50)
      // Solve for mcq: mcqNeeded = ((nextBreak - frqPart) / 50) * 60
      const frqPart = (frqNorm * 50);
      const mcqNeeded = ((nextBreak - frqPart) / 50) * MAXS.mcq;
      neededMcqForNext = Math.ceil(clamp(mcqNeeded, 0, MAXS.mcq));
    }

    return {
      composite,
      apScore,
      mcqPct: mcqNorm,
      frqPct: frqNorm,
      nextBreak,
      neededMcqForNext,
    };
  }, [mcq, frq, curve]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AP Chem Score Calculator</h2>
            <p className="text-sm text-gray-600 mt-1">
              Unofficial estimator • MCQ 50% + FRQ 50% • Tune the curve
            </p>
          </div>
          {/* Curve selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {Object.entries(CURVES).map(([key, v]) => (
              <button
                key={key}
                onClick={() => setCurveKey(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                  curveKey === key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="px-8 py-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* MCQ */}
            <div className="border border-gray-200 rounded-lg p-5">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                MCQ Correct <span className="text-gray-500">({mcq}/{MAXS.mcq})</span>
              </label>
              <input
                type="number"
                min={0}
                max={MAXS.mcq}
                value={mcq}
                onChange={(e) => setMcq(clamp(parseInt(e.target.value || "0", 10), 0, MAXS.mcq))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              <input
                type="range"
                min={0}
                max={MAXS.mcq}
                value={mcq}
                onChange={(e) => setMcq(parseInt(e.target.value, 10))}
                className="w-full mt-3"
              />
              <div className="text-sm text-gray-500 mt-1">
                Counts as <span className="font-medium text-gray-900">{pct(mcqPct)}</span> of MCQ section (50% overall).
              </div>
            </div>

            {/* FRQ */}
            <div className="border border-gray-200 rounded-lg p-5">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                FRQ Points <span className="text-gray-500">({frq}/{MAXS.frq})</span>
              </label>
              <input
                type="number"
                min={0}
                max={MAXS.frq}
                value={frq}
                onChange={(e) => setFrq(clamp(parseInt(e.target.value || "0", 10), 0, MAXS.frq))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              <input
                type="range"
                min={0}
                max={MAXS.frq}
                value={frq}
                onChange={(e) => setFrq(parseInt(e.target.value, 10))}
                className="w-full mt-3"
              />
              <div className="text-sm text-gray-500 mt-1">
                Counts as <span className="font-medium text-gray-900">{pct(frqPct)}</span> of FRQ section (50% overall).
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <div className="text-sm text-gray-600 uppercase mb-1">Estimated Composite</div>
              <div className="font-mono text-3xl font-semibold text-gray-900">
                {composite.toFixed(1)} / 100
              </div>
              <div className="text-xs text-gray-500 mt-1">
                MCQ {(mcq / MAXS.mcq * 50).toFixed(1)} + FRQ {(frq / MAXS.frq * 50).toFixed(1)}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <div className="text-sm text-gray-600 uppercase mb-1">Estimated AP Score</div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold
                ${apScore >= 4 ? "bg-emerald-100 text-emerald-800"
                  : apScore === 3 ? "bg-amber-100 text-amber-800"
                  : "bg-gray-200 text-gray-800"}`}>
                {apScore} / 5
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Curve: <span className="font-medium">{CURVES[curveKey].name}</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <div className="text-sm text-gray-600 uppercase mb-1">Path to Next Score</div>
              {apScore < 5 ? (
                <div className="text-sm text-gray-800">
                  Target composite: <span className="font-mono">{curve.bands[apScore]}+</span>
                  <div className="mt-1">
                    Needed MCQ (if FRQ stays {frq}/{MAXS.frq}):{" "}
                    <span className="font-semibold">
                      {Math.max(0, (neededMcqForNext ?? 0) - mcq)} more correct
                    </span>{" "}
                    ({neededMcqForNext}/{MAXS.mcq} total)
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-800">You’re already at the top band 🎉</div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-cyan-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-600">
                This tool is an <span className="font-medium">unofficial</span> estimator for the keyword
                “ap chem score calculator.” Real scoring varies by year. Adjust the curve to match
                released distributions or classroom guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
