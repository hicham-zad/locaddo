"use client";

import { useEffect, useMemo, useState } from "react";

const PRESETS = [15, 30, 45, 60];

function listTimeZones() {
  try {
    return (Intl.supportedValuesOf && Intl.supportedValuesOf("timeZone")) || [];
  } catch {
    return [];
  }
}

function addMinutes(date, mins) {
  return new Date(date.getTime() + mins * 60_000);
}

// Format helpers
function fmtTime(date, timeZone) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function fmtDate(date, timeZone) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

// Card for each timezone
function ZoneCard({ zone, date }) {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow transition">
      <div className="text-xs font-medium text-cyan-700/90 mb-1">{zone}</div>
      <div className="font-mono tabular-nums text-2xl font-semibold text-gray-900 whitespace-nowrap leading-tight">
        {fmtTime(date, zone)}
      </div>
      <div className="text-sm text-gray-500 mt-1 whitespace-nowrap">
        {fmtDate(date, zone)}
      </div>
    </div>
  );
}

export default function TimeFromNow({ defaultMinutes = 15 }) {
  const [now, setNow] = useState(new Date());
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [tz, setTz] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  );

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const zones = useMemo(() => {
    const z = listTimeZones();
    return z.length ? z : [tz, "UTC"];
  }, [tz]);

  const future = useMemo(() => addMinutes(now, Number(minutes) || 0), [now, minutes]);
  const displayNow = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(now),
    [now, tz]
  );
  const displayFuture = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(future),
    [future, tz]
  );

  const copyResult = async () => {
    const text = `${minutes} minutes from now is ${displayFuture} (${tz}).`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      alert(text);
    }
  };

  const shareResult = async () => {
    const text = `${minutes} minutes from now is ${displayFuture} (${tz}).`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Time From Now", text });
      } catch {}
    } else {
      await copyResult();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Exact Time Calculator</h2>
            <p className="text-sm text-gray-600 mt-1">Live result with timezone support</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="px-8 py-8 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Minutes Input */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Minutes From Now
              </label>
              <input
                type="number"
                min={0}
                step={1}
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value || "0", 10))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              <div className="flex gap-2 mt-2">
                {PRESETS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinutes(m)}
                    className={`px-3 py-1.5 text-xs rounded-md border transition ${
                      Number(minutes) === m
                        ? "border-cyan-500 bg-cyan-50 text-cyan-800"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {/* Timezone Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-900 mb-2">Time Zone</label>
              <select
                value={tz}
                onChange={(e) => setTz(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                {zones.map((z) => (
                  <option value={z} key={z}>
                    {z}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Auto-detected: {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </p>
            </div>
          </div>

          {/* Current and Future Result */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <div className="text-sm text-gray-600 uppercase mb-1">Current Time</div>
              <div className="font-mono text-lg text-gray-900">{displayNow}</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <div className="text-sm text-gray-600 uppercase mb-1">
                {Number(minutes) || 0} Minutes From Now
              </div>
              <div className="font-mono text-2xl font-semibold text-gray-900">{displayFuture}</div>
            </div>
          </div>

          {/* Other Popular Time Zones */}
          <div className="border border-gray-200 rounded-lg p-5">
            <div className="text-base font-semibold text-gray-900 mb-3">
              Other Popular Time Zones
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {["UTC", "America/New_York", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Australia/Sydney"].map(
                (zone) => (
                  <ZoneCard key={zone} zone={zone} date={future} />
                )
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={copyResult}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Copy Result
            </button>
            <button
              onClick={shareResult}
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
            >
              Share
            </button>
          </div>

          {/* Disclaimer */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-cyan-500 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8 4a1 1 0 100-2 1 1 0 000 2zm1-8H9v6h2V6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-600">
                Results use your browser’s time and the selected timezone. Daylight saving transitions are handled automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
