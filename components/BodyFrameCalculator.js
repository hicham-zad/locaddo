"use client";

import React, { useMemo, useState } from "react";

const UNIT_OPTIONS = [
  { key: "metric", label: "Metric" },
  { key: "imperial", label: "Imperial" },
];

const GENDER_OPTIONS = [
  { key: "female", label: "Female" },
  { key: "male", label: "Male" },
];

const METHOD_OPTIONS = [
  { key: "wrist", label: "Wrist Circumference", description: "Easier to measure" },
  { key: "elbow", label: "Elbow Breadth", description: "More precise" },
];

// Frame size thresholds based on scientific studies
const FRAME_THRESHOLDS = {
  wrist: {
    female: {
      heightCm: [157, 165], // height thresholds in cm
      small: [0, 14.0], // wrist circumference in cm for small frame
      medium: [14.0, 15.9],
      large: [15.9, 999]
    },
    male: {
      heightCm: [168, 178],
      small: [0, 16.5],
      medium: [16.5, 18.4],
      large: [18.4, 999]
    }
  },
  elbow: {
    female: {
      small: [0, 5.7], // elbow breadth in cm
      medium: [5.7, 6.4],
      large: [6.4, 999]
    },
    male: {
      small: [0, 6.9],
      medium: [6.9, 7.6],
      large: [7.6, 999]
    }
  }
};

export default function BodyFrameCalculator() {
  const [unit, setUnit] = useState("metric");
  const [gender, setGender] = useState("female");
  const [method, setMethod] = useState("wrist");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [wrist, setWrist] = useState("");
  const [elbow, setElbow] = useState("");

  const reset = () => {
    setHeight("");
    setFeet("");
    setInches("");
    setWrist("");
    setElbow("");
    // Scroll back to top of the calculator
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { frameSize, isValid, idealWeightRange, recommendations } = useMemo(() => {
    let heightCm = 0;
    
    // Calculate height in cm
    if (unit === "metric") {
      heightCm = parseFloat(height) || 0;
    } else {
      const ft = parseFloat(feet) || 0;
      const inc = parseFloat(inches) || 0;
      const totalInches = ft * 12 + inc;
      heightCm = totalInches * 2.54;
    }

    let measurement = 0;
    let isValidCalc = false;
    let frameResult = "";

    // Get measurement based on method
    if (method === "wrist") {
      let wristValue = parseFloat(wrist) || 0;
      if (unit === "imperial") {
        wristValue = wristValue * 2.54; // convert inches to cm
      }
      measurement = wristValue;
      isValidCalc = heightCm > 0 && wristValue > 0;
    } else {
      let elbowValue = parseFloat(elbow) || 0;
      if (unit === "imperial") {
        elbowValue = elbowValue * 2.54; // convert inches to cm
      }
      measurement = elbowValue;
      isValidCalc = elbowValue > 0;
    }

    // Calculate frame size
    if (isValidCalc) {
      const thresholds = FRAME_THRESHOLDS[method][gender];
      
      if (method === "wrist") {
        // Wrist method considers height
        let adjustedThresholds = thresholds;
        if (heightCm < thresholds.heightCm[0]) {
          // Shorter height - reduce thresholds slightly
          adjustedThresholds = {
            small: [0, thresholds.small[1] - 0.5],
            medium: [thresholds.small[1] - 0.5, thresholds.medium[1] - 0.5],
            large: [thresholds.medium[1] - 0.5, 999]
          };
        } else if (heightCm > thresholds.heightCm[1]) {
          // Taller height - increase thresholds slightly
          adjustedThresholds = {
            small: [0, thresholds.small[1] + 0.5],
            medium: [thresholds.small[1] + 0.5, thresholds.medium[1] + 0.5],
            large: [thresholds.medium[1] + 0.5, 999]
          };
        } else {
          adjustedThresholds = {
            small: thresholds.small,
            medium: thresholds.medium,
            large: thresholds.large
          };
        }

        if (measurement <= adjustedThresholds.small[1]) frameResult = "Small";
        else if (measurement <= adjustedThresholds.medium[1]) frameResult = "Medium";
        else frameResult = "Large";
      } else {
        // Elbow method
        if (measurement <= thresholds.small[1]) frameResult = "Small";
        else if (measurement <= thresholds.medium[1]) frameResult = "Medium";
        else frameResult = "Large";
      }
    }

    // Calculate ideal weight range based on frame size
    let weightRange = "";
    if (heightCm > 0 && frameResult) {
      const heightM = heightCm / 100;
      let baseBMI = 22; // Standard BMI for calculations
      
      // Adjust BMI range based on frame size
      let minBMI, maxBMI;
      if (frameResult === "Small") {
        minBMI = 18.5;
        maxBMI = 22;
      } else if (frameResult === "Medium") {
        minBMI = 20;
        maxBMI = 24;
      } else {
        minBMI = 22;
        maxBMI = 26;
      }

      const minWeight = minBMI * heightM * heightM;
      const maxWeight = maxBMI * heightM * heightM;

      if (unit === "metric") {
        weightRange = `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} kg`;
      } else {
        const minLbs = minWeight / 0.453592;
        const maxLbs = maxWeight / 0.453592;
        weightRange = `${minLbs.toFixed(1)} - ${maxLbs.toFixed(1)} lbs`;
      }
    }

     const generateRecommendations = (frame) => {
    const recommendations = {
      "Small": [
        "Focus on maintaining lean muscle mass through strength training",
        "Avoid aggressive bulking phases - gradual weight gain is better",
        "Pay attention to bone health with adequate calcium and vitamin D",
        "Consider lighter weights with higher repetitions in training"
      ],
      "Medium": [
        "You have flexibility in training and nutrition approaches",
        "Standard fitness and nutrition guidelines typically apply well",
        "Balance cardiovascular and strength training for optimal health",
        "Monitor body composition rather than just weight"
      ],
      "Large": [
        "You can handle more intensive strength training programs",
        "Don't be discouraged by higher numbers on the scale",
        "Focus on body composition and how you feel rather than weight alone",
        "You may need higher caloric intake to support your frame"
      ]
    };
    return recommendations[frame] || [];
  };

    // Generate recommendations
    const recs = generateRecommendations(frameResult);

    return {
      frameSize: frameResult,
      isValid: isValidCalc,
      idealWeightRange: weightRange,
      recommendations: recs
    };
  }, [unit, gender, method, height, feet, inches, wrist, elbow]);

 

  const getFrameColor = (frame) => {
    const colors = {
      "Small": "bg-cyan-400",
      "Medium": "bg-cyan-500", 
      "Large": "bg-cyan-600"
    };
    return colors[frame] || "bg-gray-400";
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Calculate Your Frame Size</h2>
              <p className="text-sm text-gray-600 mt-1">Choose a measurement method and enter your details</p>
            </div>
            
            {/* Unit Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {UNIT_OPTIONS.map((u) => (
                <button
                  key={u.key}
                  onClick={() => setUnit(u.key)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
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
          {/* Gender Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">Gender</label>
            <div className="flex gap-4">
              {GENDER_OPTIONS.map((g) => (
                <label key={g.key} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g.key}
                    checked={gender === g.key}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{g.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Measurement Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">Measurement Method</label>
            <div className="grid sm:grid-cols-2 gap-4">
              {METHOD_OPTIONS.map((m) => (
                <label key={m.key} className="flex items-center cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-cyan-300 transition-colors">
                  <input
                    type="radio"
                    name="method"
                    value={m.key}
                    checked={method === m.key}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">{m.label}</span>
                    <p className="text-xs text-gray-500">{m.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Height Input */}
            {unit === "metric" ? (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Height (cm)</label>
                <input
                  type="number"
                  placeholder="170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Required for wrist method calculations</p>
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
                    placeholder="7"
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

            {/* Measurement Input */}
            {method === "wrist" ? (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Wrist Circumference ({unit === "metric" ? "cm" : "inches"})
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder={unit === "metric" ? "15.5" : "6.1"}
                  value={wrist}
                  onChange={(e) => setWrist(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Measure at the narrowest point below the wrist bone</p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Elbow Breadth ({unit === "metric" ? "cm" : "inches"})
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder={unit === "metric" ? "6.5" : "2.6"}
                  value={elbow}
                  onChange={(e) => setElbow(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Measure between the two prominent bones on either side of your elbow</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {isValid ? (
            <div className="mt-8">
              {/* Main Result Card */}
              <div className={`text-center py-12 rounded-lg border-2 bg-cyan-50 border-cyan-200`}>
                <div className="text-sm font-medium text-cyan-700 uppercase tracking-wide mb-2">
                  Your Body Frame Size
                </div>
                <div className={`inline-flex items-center justify-center w-16 h-16 ${getFrameColor(frameSize)} rounded-full text-white text-2xl font-bold mb-4`}>
                  {frameSize.charAt(0)}
                </div>
                <div className="text-4xl font-bold text-cyan-900 mb-2">
                  {frameSize} Frame
                </div>
                <div className="text-lg text-cyan-800">
                  {frameSize === "Small" && "Delicate bone structure"}
                  {frameSize === "Medium" && "Average bone structure"}
                  {frameSize === "Large" && "Robust bone structure"}
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Ideal Weight Range</h4>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{idealWeightRange}</div>
                  <p className="text-sm text-gray-600">
                    Adjusted for your {frameSize.toLowerCase()} frame size
                  </p>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Frame Characteristics</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {frameSize === "Small" && (
                      <>
                        <li>• Narrow wrists and ankles</li>
                        <li>• Delicate bone structure</li>
                        <li>• May appear taller than actual height</li>
                      </>
                    )}
                    {frameSize === "Medium" && (
                      <>
                        <li>• Proportionate bone structure</li>
                        <li>• Average wrist and ankle size</li>
                        <li>• Balanced body proportions</li>
                      </>
                    )}
                    {frameSize === "Large" && (
                      <>
                        <li>• Broad shoulders and chest</li>
                        <li>• Thick wrists and ankles</li>
                        <li>• Strong, sturdy appearance</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3">Recommendations for {frameSize} Frame</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Note:</strong> Frame size is one factor in determining healthy weight ranges. Individual factors like muscle mass, 
                  age, health status, and fitness goals also matter. Use this as a general guide and consult healthcare professionals 
                  for personalized health and fitness planning.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Enter Your Measurements</h3>
              <p className="text-gray-600">
                Fill in your details to determine your body frame size
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
                  const result = `My body frame size is ${frameSize} (${gender})`;
                  if (navigator.share) {
                    navigator.share({ title: 'Body Frame Size Result', text: result });
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