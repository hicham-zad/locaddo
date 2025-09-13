"use client";

import React, { useMemo, useState } from "react";

const BP_CATEGORIES = [
  { name: "Normal", systolic: [0, 120], diastolic: [0, 80], color: "green", description: "Ideal blood pressure range" },
  { name: "Elevated", systolic: [120, 130], diastolic: [0, 80], color: "yellow", description: "Warning sign - take action" },
  { name: "Stage 1 Hypertension", systolic: [130, 140], diastolic: [80, 90], color: "orange", description: "High blood pressure - see doctor" },
  { name: "Stage 2 Hypertension", systolic: [140, 180], diastolic: [90, 120], color: "red", description: "Serious - medical attention needed" },
  { name: "Hypertensive Crisis", systolic: [180, 999], diastolic: [120, 999], color: "red", description: "Emergency - call 911" },
];

export default function AverageBPCalculator() {
  const [readings, setReadings] = useState([
    { id: 1, systolic: "", diastolic: "", date: "", time: "" }
  ]);

  const addReading = () => {
    const newId = Math.max(...readings.map(r => r.id)) + 1;
    setReadings([...readings, { id: newId, systolic: "", diastolic: "", date: "", time: "" }]);
  };

  const removeReading = (id) => {
    if (readings.length > 1) {
      setReadings(readings.filter(r => r.id !== id));
    }
  };

  const updateReading = (id, field, value) => {
    setReadings(readings.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const reset = () => {
    setReadings([{ id: 1, systolic: "", diastolic: "", date: "", time: "" }]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { averages, category, isValid, trend, recommendations } = useMemo(() => {
    const validReadings = readings.filter(r => 
      parseFloat(r.systolic) > 0 && parseFloat(r.diastolic) > 0
    );

    if (validReadings.length === 0) {
      return { averages: null, category: null, isValid: false, trend: null, recommendations: [] };
    }

    // Calculate averages
    const avgSystolic = validReadings.reduce((sum, r) => sum + parseFloat(r.systolic), 0) / validReadings.length;
    const avgDiastolic = validReadings.reduce((sum, r) => sum + parseFloat(r.diastolic), 0) / validReadings.length;

    // Determine category based on higher risk classification
    let bpCategory = BP_CATEGORIES[0]; // Default to normal
    
    for (const cat of BP_CATEGORIES) {
      if ((avgSystolic >= cat.systolic[0] && avgSystolic < cat.systolic[1]) ||
          (avgDiastolic >= cat.diastolic[0] && avgDiastolic < cat.diastolic[1])) {
        bpCategory = cat;
        break;
      }
    }

    // Calculate trend if we have readings with dates
    let trendData = null;
    const readingsWithDates = validReadings.filter(r => r.date).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (readingsWithDates.length >= 2) {
      const first = readingsWithDates[0];
      const last = readingsWithDates[readingsWithDates.length - 1];
      const systolicChange = parseFloat(last.systolic) - parseFloat(first.systolic);
      const diastolicChange = parseFloat(last.diastolic) - parseFloat(first.diastolic);
      
      trendData = {
        systolic: systolicChange,
        diastolic: diastolicChange,
        direction: (systolicChange + diastolicChange) / 2 > 2 ? "increasing" : 
                  (systolicChange + diastolicChange) / 2 < -2 ? "decreasing" : "stable"
      };
    }

    // Generate recommendations
    const recs = generateRecommendations(bpCategory, trendData, validReadings.length);

    return {
      averages: { systolic: avgSystolic, diastolic: avgDiastolic },
      category: bpCategory,
      isValid: true,
      trend: trendData,
      recommendations: recs
    };
  }, [readings]);

  const generateRecommendations = (category, trend, readingCount) => {
    const baseRecs = {
      "Normal": [
        "Maintain your healthy lifestyle with regular exercise",
        "Continue eating a heart-healthy diet low in sodium",
        "Monitor blood pressure annually or as recommended",
        "Keep stress levels manageable through relaxation techniques"
      ],
      "Elevated": [
        "Increase physical activity to at least 150 minutes per week",
        "Reduce sodium intake to less than 2,300mg daily",
        "Maintain a healthy weight through diet and exercise",
        "Schedule regular check-ups with your healthcare provider"
      ],
      "Stage 1 Hypertension": [
        "Consult your healthcare provider about treatment options",
        "Follow the DASH diet rich in fruits and vegetables",
        "Limit alcohol consumption and quit smoking if applicable",
        "Monitor blood pressure regularly at home"
      ],
      "Stage 2 Hypertension": [
        "See your doctor immediately for evaluation and treatment",
        "Take prescribed medications exactly as directed",
        "Make aggressive lifestyle changes with professional guidance",
        "Monitor blood pressure daily and keep detailed records"
      ],
      "Hypertensive Crisis": [
        "Seek emergency medical attention immediately",
        "Call 911 if experiencing symptoms like chest pain or shortness of breath",
        "Do not wait - this is a medical emergency",
        "Follow up with cardiology specialist"
      ]
    };

    let recs = [...(baseRecs[category.name] || [])];

    // Add trend-specific recommendations
    if (trend) {
      if (trend.direction === "increasing") {
        recs.unshift("Your blood pressure shows an increasing trend - discuss with your doctor");
      } else if (trend.direction === "decreasing") {
        recs.unshift("Great! Your blood pressure shows improvement over time");
      }
    }

    // Add reading count recommendations
    if (readingCount < 3) {
      recs.push("Take more readings over different days for a more accurate average");
    }

    return recs;
  };

  const getCategoryStyles = (color) => {
    const styles = {
      green: "bg-green-50 border-green-200 text-green-900",
      yellow: "bg-yellow-50 border-yellow-200 text-yellow-900",
      orange: "bg-orange-50 border-orange-200 text-orange-900",
      red: "bg-red-50 border-red-200 text-red-900"
    };
    return styles[color] || styles.green;
  };

  const getCategoryColor = (color) => {
    const colors = {
      green: "text-green-600",
      yellow: "text-yellow-600", 
      orange: "text-orange-600",
      red: "text-red-600"
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Calculate Average Blood Pressure</h2>
              <p className="text-sm text-gray-600 mt-1">Enter multiple blood pressure readings to get your average</p>
            </div>
            
            <button
              onClick={addReading}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm font-medium"
            >
              Add Reading
            </button>
          </div>
        </div>

        {/* Readings Input */}
        <div className="px-8 py-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Blood Pressure Readings</h3>
            
            {readings.map((reading, index) => (
              <div key={reading.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Reading #{index + 1}</h4>
                  {readings.length > 1 && (
                    <button
                      onClick={() => removeReading(reading.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Systolic (mmHg)
                    </label>
                    <input
                      type="number"
                      min="70"
                      max="250"
                      placeholder="120"
                      value={reading.systolic}
                      onChange={(e) => updateReading(reading.id, 'systolic', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Top number</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diastolic (mmHg)
                    </label>
                    <input
                      type="number"
                      min="40"
                      max="150"
                      placeholder="80"
                      value={reading.diastolic}
                      onChange={(e) => updateReading(reading.id, 'diastolic', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Bottom number</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={reading.date}
                      onChange={(e) => updateReading(reading.id, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time (Optional)
                    </label>
                    <input
                      type="time"
                      value={reading.time}
                      onChange={(e) => updateReading(reading.id, 'time', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results Section */}
          {isValid ? (
            <div className="mt-8">
              {/* Average Results */}
              <div className={`text-center py-12 rounded-lg border-2 ${getCategoryStyles(category.color)}`}>
                <div className="text-sm font-medium uppercase tracking-wide mb-2">
                  Your Average Blood Pressure
                </div>
                <div className="text-5xl font-bold mb-4">
                  {averages.systolic.toFixed(0)}/{averages.diastolic.toFixed(0)}
                </div>
                <div className="text-lg font-semibold mb-2">
                  {category.name}
                </div>
                <div className="text-sm opacity-80">
                  {category.description}
                </div>
                {trend && (
                  <div className="mt-4 text-sm">
                    <span className={`font-medium ${getCategoryColor(
                      trend.direction === "decreasing" ? "green" : 
                      trend.direction === "increasing" ? "red" : "gray"
                    )}`}>
                      Trend: {trend.direction}
                      {trend.direction !== "stable" && (
                        <span className="ml-1">
                          ({trend.systolic > 0 ? "+" : ""}{trend.systolic.toFixed(0)}/
                          {trend.diastolic > 0 ? "+" : ""}{trend.diastolic.toFixed(0)} mmHg)
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Summary Stats */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{readings.filter(r => r.systolic && r.diastolic).length}</div>
                  <div className="text-sm text-gray-600">Total Readings</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.max(...readings.filter(r => r.systolic).map(r => parseInt(r.systolic) || 0)) || 0}/
                    {Math.max(...readings.filter(r => r.diastolic).map(r => parseInt(r.diastolic) || 0)) || 0}
                  </div>
                  <div className="text-sm text-gray-600">Highest Reading</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.min(...readings.filter(r => r.systolic).map(r => parseInt(r.systolic) || 999)) || 0}/
                    {Math.min(...readings.filter(r => r.diastolic).map(r => parseInt(r.diastolic) || 999)) || 0}
                  </div>
                  <div className="text-sm text-gray-600">Lowest Reading</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3">Recommendations</h4>
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

              {/* Emergency Warning */}
              {category.name === "Hypertensive Crisis" && (
                <div className="mt-6 p-6 bg-red-100 rounded-lg border border-red-300">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <h4 className="font-bold text-red-900 text-lg">MEDICAL EMERGENCY</h4>
                  </div>
                  <p className="text-red-800 font-medium">
                    Your blood pressure readings indicate a hypertensive crisis. This is a medical emergency. 
                    Call 911 or go to the emergency room immediately, especially if you have symptoms like 
                    chest pain, shortness of breath, severe headache, or vision changes.
                  </p>
                </div>
              )}

              {/* Medical Disclaimer */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Important:</strong> This calculator is for educational purposes only and should not replace professional medical advice. 
                  Blood pressure interpretation requires clinical context. Always consult qualified healthcare professionals for diagnosis 
                  and treatment decisions. If you have concerns about your blood pressure, contact your doctor.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50 mt-8">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Enter Your Blood Pressure Readings</h3>
              <p className="text-gray-600">
                Add your systolic and diastolic blood pressure measurements to calculate your average
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={reset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All Readings
            </button>
            
            {isValid && (
              <button
                onClick={() => {
                  const result = `My average blood pressure is ${averages.systolic.toFixed(0)}/${averages.diastolic.toFixed(0)} mmHg (${category.name})`;
                  if (navigator.share) {
                    navigator.share({ title: 'Average Blood Pressure Result', text: result });
                  } else if (navigator.clipboard) {
                    navigator.clipboard.writeText(result);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Share Results
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}