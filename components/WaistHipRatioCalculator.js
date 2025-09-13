"use client";

import React, { useMemo, useState } from "react";

const UNIT_OPTIONS = [
  { key: "metric", label: "Metric (cm)" },
  { key: "imperial", label: "Imperial (inches)" },
];

const GENDER_OPTIONS = [
  { key: "female", label: "Female" },
  { key: "male", label: "Male" },
];

const RISK_CATEGORIES = {
  female: [
    { name: "Low Risk", range: "≤ 0.85", min: 0, max: 0.85, color: "green", description: "Excellent body fat distribution" },
    { name: "Moderate Risk", range: "0.86 - 1.0", min: 0.86, max: 1.0, color: "yellow", description: "Some health risk factors" },
    { name: "High Risk", range: "> 1.0", min: 1.01, max: 10, color: "red", description: "Increased health risks" },
  ],
  male: [
    { name: "Low Risk", range: "≤ 0.90", min: 0, max: 0.90, color: "green", description: "Excellent body fat distribution" },
    { name: "Moderate Risk", range: "0.91 - 1.0", min: 0.91, max: 1.0, color: "yellow", description: "Some health risk factors" },
    { name: "High Risk", range: "> 1.0", min: 1.01, max: 10, color: "red", description: "Increased health risks" },
  ]
};

export default function WaistHipRatioCalculator() {
  const [unit, setUnit] = useState("metric");
  const [gender, setGender] = useState("female");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const reset = () => {
    setWaist("");
    setHip("");
    // Scroll back to top of the calculator
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { ratio, category, isValid, healthTips } = useMemo(() => {
    const waistValue = parseFloat(waist) || 0;
    const hipValue = parseFloat(hip) || 0;
    
    let ratioValue = 0;
    let isValidCalc = false;
    
    if (waistValue > 0 && hipValue > 0) {
      ratioValue = waistValue / hipValue;
      isValidCalc = true;
    }

    // Determine risk category based on gender
    const categories = RISK_CATEGORIES[gender];
    const cat = categories.find(c => ratioValue >= c.min && ratioValue <= c.max) || categories[0];
    
 const generateHealthTips = (category, userGender) => {
    const tips = {
      "Low Risk": [
        "Maintain your current healthy lifestyle",
        "Continue regular physical activity",
        "Keep eating a balanced diet",
        "Monitor your WHR every 3-6 months"
      ],
      "Moderate Risk": [
        "Focus on reducing abdominal fat through cardio exercise",
        "Incorporate strength training to build muscle",
        "Reduce refined carbohydrates and added sugars",
        "Consider consulting a healthcare provider"
      ],
      "High Risk": [
        "Consult with a healthcare professional immediately",
        "Develop a structured exercise plan with professional guidance",
        "Consider working with a registered dietitian",
        "Monitor for diabetes and cardiovascular risk factors"
      ]
    };
    return tips[category.name] || [];
  };
    // Generate health tips based on category
    const tips = generateHealthTips(cat, gender);

    return {
      ratio: ratioValue,
      category: cat,
      isValid: isValidCalc,
      healthTips: tips
    };
  }, [waist, hip, gender]);

 

  const getCategoryStyles = (color) => {
    const styles = {
      green: "bg-green-50 border-green-200 text-green-900",
      yellow: "bg-yellow-50 border-yellow-200 text-yellow-900", 
      red: "bg-red-50 border-red-200 text-red-900"
    };
    return styles[color] || styles.green;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Calculate Your WHR</h2>
              <p className="text-sm text-gray-600 mt-1">Enter your measurements to assess health risk</p>
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
            <p className="text-xs text-gray-500 mt-1">Different risk thresholds apply for men and women</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Waist Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Waist Circumference ({unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={unit === "metric" ? "75" : "30"}
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">Measure at the narrowest point above your belly button</p>
            </div>

            {/* Hip Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Hip Circumference ({unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={unit === "metric" ? "95" : "38"}
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">Measure at the widest point of your hips</p>
            </div>
          </div>

          {/* Results Section */}
          {isValid ? (
            <div className="mt-8">
              {/* Main Result Card */}
              <div className={`text-center py-12 rounded-lg border-2 ${getCategoryStyles(category.color)}`}>
                <div className="text-sm font-medium uppercase tracking-wide mb-2">
                  Your Waist-to-Hip Ratio
                </div>
                <div className="text-6xl font-bold mb-4">
                  {ratio.toFixed(2)}
                </div>
                <div className="text-lg font-semibold mb-2">
                  {category.name}
                </div>
                <div className="text-sm opacity-80">
                  {category.description}
                </div>
              </div>

              {/* Risk Categories Reference */}
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">
                  Risk Categories for {gender === "female" ? "Women" : "Men"}
                </h4>
                <div className="space-y-2">
                  {RISK_CATEGORIES[gender].map((cat, index) => (
                    <div key={index} className={`flex justify-between items-center py-2 px-3 rounded ${
                      cat.name === category.name ? getCategoryStyles(cat.color) : 'bg-white border border-gray-200'
                    }`}>
                      <span className={`font-medium ${cat.name === category.name ? '' : 'text-gray-700'}`}>
                        {cat.name}
                      </span>
                      <span className={`text-sm ${cat.name === category.name ? '' : 'text-gray-500'}`}>
                        {cat.range}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Recommendations */}
              <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3">Health Recommendations</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  {healthTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medical Disclaimer */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Important:</strong> This calculator provides general health risk assessment based on waist-to-hip ratio. 
                  Results should not replace professional medical advice. Individual factors like age, genetics, muscle mass, 
                  and overall health status affect health risks. Consult healthcare professionals for personalized assessment.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9l6.75-6.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Enter Your Measurements</h3>
              <p className="text-gray-600">
                Fill in your waist and hip measurements to calculate your WHR
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
                  const result = `My waist-to-hip ratio is ${ratio.toFixed(2)} (${category.name} for ${gender === "female" ? "women" : "men"})`;
                  if (navigator.share) {
                    navigator.share({ title: 'WHR Result', text: result });
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