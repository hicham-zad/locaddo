"use client";

import React, { useMemo, useState } from "react";

const UNIT_OPTIONS = [
  { key: "metric", label: "Metric" },
  { key: "imperial", label: "Imperial" },
];

export default function ReverseBMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [height, setHeight] = useState(""); // metric (cm)
  const [targetBmi, setTargetBmi] = useState("");
  const [feet, setFeet] = useState(""); // imperial
  const [inches, setInches] = useState("");

  const reset = () => {
    setHeight("");
    setTargetBmi("");
    setFeet("");
    setInches("");
    // Scroll back to top of the calculator
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { weightNeeded, healthyRange, isValid } = useMemo(() => {
    let heightM = 0;
    
    if (unit === "metric") {
      const heightCm = parseFloat(height) || 0;
      heightM = heightCm > 0 ? heightCm / 100 : 0;
    } else {
      const ft = parseFloat(feet) || 0;
      const inc = parseFloat(inches) || 0;
      const totalInches = ft * 12 + inc;
      heightM = totalInches > 0 ? totalInches * 0.0254 : 0;
    }

    const target = parseFloat(targetBmi) || 0;
    let weightKg = 0;
    let isValidCalc = false;

    if (heightM > 0 && target > 0) {
      weightKg = target * heightM * heightM;
      isValidCalc = true;
    }

    // Calculate healthy weight range (BMI 18.5-24.9)
    let healthyMin = 0, healthyMax = 0;
    if (heightM > 0) {
      healthyMin = 18.5 * heightM * heightM;
      healthyMax = 24.9 * heightM * heightM;
      
      if (unit === "imperial") {
        healthyMin = healthyMin / 0.453592; // Convert to lbs
        healthyMax = healthyMax / 0.453592;
      }
    }

    // Convert weight to display unit
    let displayWeight = weightKg;
    if (unit === "imperial" && weightKg > 0) {
      displayWeight = weightKg / 0.453592; // kg → lb
    }

    return {
      weightNeeded: displayWeight,
      healthyRange: { min: healthyMin, max: healthyMax },
      isValid: isValidCalc
    };
  }, [unit, height, feet, inches, targetBmi]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Calculate Target Weight</h2>
              <p className="text-sm text-gray-600 mt-1">Enter your height and target BMI</p>
            </div>
            
            {/* Unit Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {UNIT_OPTIONS.map((u) => (
                <button
                  key={u.key}
                  onClick={() => setUnit(u.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    unit === u.key 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="px-8 py-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Height Input */}
            {unit === "metric" ? (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Height (cm)</label>
                <input
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Height</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="5"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                  />
                  <input
                    type="number"
                    placeholder="9"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <span className="text-xs text-gray-500 text-center">feet</span>
                  <span className="text-xs text-gray-500 text-center">inches</span>
                </div>
              </div>
            )}

            {/* Target BMI Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">Target BMI</label>
              <input
                type="number"
                step="0.1"
                placeholder="22.0"
                value={targetBmi}
                onChange={(e) => setTargetBmi(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">Normal range: 18.5 - 24.9</p>
            </div>
          </div>

          {/* Results Section */}
          {isValid ? (
            <div className="mt-8">
              {/* Main Result Card */}
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 uppercase tracking-wide font-medium mb-2">
                  Target Weight
                </div>
                <div className="text-6xl font-bold text-gray-900 mb-4">
                  {weightNeeded.toFixed(1)}
                </div>
                <div className="text-lg text-gray-600 mb-6">
                  <span className="font-medium">{unit === "metric" ? "kg" : "lbs"}</span> to reach BMI {targetBmi}
                </div>
                
                {/* Healthy range info */}
                <div className="text-sm text-gray-600">
                  Healthy weight range: <span className="font-medium text-gray-900">
                    {healthyRange.min.toFixed(0)} - {healthyRange.max.toFixed(0)} {unit === "metric" ? "kg" : "lbs"}
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong>Note:</strong> This calculation shows the weight needed to reach your target BMI. 
                  Remember that BMI is a screening tool and doesn't account for muscle mass, bone density, 
                  or individual body composition. Consult healthcare professionals for personalized advice.
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Enter Your Details</h3>
              <p className="text-gray-600">
                Fill in your height and target BMI to see your target weight
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={reset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Calculate Again
            </button>
            
            {isValid && (
              <button
                onClick={() => {
                  const result = `Target weight: ${weightNeeded.toFixed(1)} ${unit === "metric" ? "kg" : "lbs"} for BMI ${targetBmi}`;
                  if (navigator.share) {
                    navigator.share({ title: 'Target Weight Result', text: result });
                  } else if (navigator.clipboard) {
                    navigator.clipboard.writeText(result);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Share Result
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}