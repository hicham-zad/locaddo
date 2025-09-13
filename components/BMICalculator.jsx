"use client";

import React, { useMemo, useState } from "react";

const UNIT_OPTIONS = [
  { key: "metric", label: "Metric" },
  { key: "imperial", label: "Imperial" },
];

const BMI_CATEGORIES = [
  { name: "Underweight", range: "Below 18.5", min: 0, max: 18.5 },
  { name: "Normal weight", range: "18.5 - 24.9", min: 18.5, max: 24.9 },
  { name: "Overweight", range: "25.0 - 29.9", min: 25.0, max: 29.9 },
  { name: "Obesity", range: "30.0+", min: 30.0, max: 100 },
];

export default function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const reset = () => {
    setWeight("");
    setHeight("");
    setFeet("");
    setInches("");
    // Scroll back to top of the calculator
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { bmi, category, healthyRange, isValid } = useMemo(() => {
    let heightM = 0;
    let weightKg = parseFloat(weight) || 0;

    if (unit === "metric") {
      const heightCm = parseFloat(height) || 0;
      heightM = heightCm / 100;
    } else {
      const ft = parseFloat(feet) || 0;
      const inc = parseFloat(inches) || 0;
      const totalInches = ft * 12 + inc;
      heightM = totalInches * 0.0254;
      weightKg = weightKg * 0.453592; // Convert lbs to kg
    }

    let bmiValue = 0;
    let isValidCalc = false;
    
    if (heightM > 0 && weightKg > 0) {
      bmiValue = weightKg / (heightM * heightM);
      isValidCalc = true;
    }

    // Determine category
    const cat = BMI_CATEGORIES.find(c => bmiValue >= c.min && bmiValue < c.max) || BMI_CATEGORIES[0];

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

    return {
      bmi: bmiValue,
      category: cat,
      healthyRange: { min: healthyMin, max: healthyMax },
      isValid: isValidCalc
    };
  }, [unit, weight, height, feet, inches]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Calculate Your BMI</h2>
              <p className="text-sm text-gray-600 mt-1">Enter your measurements below</p>
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
            {/* Weight Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Weight {unit === "metric" ? "(kg)" : "(lbs)"}
              </label>
              <input
                type="number"
                placeholder={unit === "metric" ? "70" : "154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
              />
            </div>

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
          </div>

          {/* Results Section */}
          {isValid ? (
            <div className="space-y-6">
              {/* BMI Result */}
              <div className="text-center py-8 border border-gray-200 rounded-lg bg-gray-50">
                <div className="text-sm text-gray-600 uppercase tracking-wide font-medium mb-2">
                  Your BMI
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-4">
                  {bmi.toFixed(1)}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {category.name}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">BMI Category Range</div>
                  <div className="font-medium text-gray-900">{category.range}</div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Healthy Weight Range</div>
                  <div className="font-medium text-gray-900">
                    {healthyRange.min.toFixed(1)} - {healthyRange.max.toFixed(1)} {unit === "metric" ? "kg" : "lbs"}
                  </div>
                </div>
              </div>

              {/* BMI Scale */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-900 mb-3">BMI Categories</div>
                {BMI_CATEGORIES.map((cat, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    cat.name === category.name 
                      ? 'border-cyan-500 bg-cyan-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        cat.name === category.name ? 'bg-cyan-500' : 'bg-gray-300'
                      }`}></div>
                      <span className={`font-medium ${
                        cat.name === category.name ? 'text-cyan-900' : 'text-gray-700'
                      }`}>
                        {cat.name}
                      </span>
                    </div>
                    <span className={`text-sm ${
                      cat.name === category.name ? 'text-cyan-800' : 'text-gray-500'
                    }`}>
                      {cat.range}
                    </span>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Medical Disclaimer</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      BMI is a screening tool and may not reflect health status for all individuals. 
                      Consult healthcare professionals for comprehensive health assessment and personalized advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18a2.25 2.25 0 01-2.25 2.25h-9A2.25 2.25 0 012.25 18v-9A2.25 2.25 0 014.5 6.75h9A2.25 2.25 0 0116.5 9v.75" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Enter Your Measurements</h3>
              <p className="text-gray-600">
                Fill in your weight and height to calculate your BMI
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={reset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            
            {/* {isValid && (
              <button
                onClick={() => {
                  const result = `BMI: ${bmi.toFixed(1)} (${category.name})`;
                  if (navigator.share) {
                    navigator.share({ title: 'BMI Result', text: result });
                  } else if (navigator.clipboard) {
                    navigator.clipboard.writeText(result);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Share Result
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}