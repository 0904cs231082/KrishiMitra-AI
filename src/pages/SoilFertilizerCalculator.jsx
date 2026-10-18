import { useMemo, useState } from "react";
import {
  Calculator,
  CheckCircle2,
  Info,
  Leaf,
  RefreshCw,
  Sprout,
  TriangleAlert,
} from "lucide-react";

const fertilizerData = {
  Urea: {
    nitrogen: 46,
    phosphorus: 0,
    potassium: 0,
  },
  DAP: {
    nitrogen: 18,
    phosphorus: 46,
    potassium: 0,
  },
  MOP: {
    nitrogen: 0,
    phosphorus: 0,
    potassium: 60,
  },
};

const cropRequirements = {
  Wheat: {
    nitrogen: 60,
    phosphorus: 30,
    potassium: 20,
  },
  Rice: {
    nitrogen: 80,
    phosphorus: 40,
    potassium: 40,
  },
  Mustard: {
    nitrogen: 50,
    phosphorus: 25,
    potassium: 20,
  },
  Soybean: {
    nitrogen: 30,
    phosphorus: 40,
    potassium: 30,
  },
  Maize: {
    nitrogen: 70,
    phosphorus: 35,
    potassium: 30,
  },
  Gram: {
    nitrogen: 25,
    phosphorus: 30,
    potassium: 20,
  },
};

function SoilFertilizerCalculator() {
  const [crop, setCrop] = useState("Wheat");
  const [area, setArea] = useState("1");
  const [unit, setUnit] = useState("acre");

  const [soilTest, setSoilTest] = useState("No");

  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const [calculated, setCalculated] = useState(false);

  const selectedCrop = cropRequirements[crop];

  const areaInAcres = useMemo(() => {
    const value = Number(area) || 0;

    if (unit === "hectare") {
      return value * 2.47105;
    }

    return value;
  }, [area, unit]);

  const calculateAmount = (nutrientRequired, fertilizerPercent) => {
    if (!fertilizerPercent) return 0;

    return (
      (nutrientRequired * areaInAcres) /
      (fertilizerPercent / 100)
    );
  };

  const fertilizerPlan = useMemo(() => {
    const nRequirement =
      soilTest === "Yes" && nitrogen !== ""
        ? Number(nitrogen)
        : selectedCrop.nitrogen;

    const pRequirement =
      soilTest === "Yes" && phosphorus !== ""
        ? Number(phosphorus)
        : selectedCrop.phosphorus;

    const kRequirement =
      soilTest === "Yes" && potassium !== ""
        ? Number(potassium)
        : selectedCrop.potassium;

    const urea = calculateAmount(
      nRequirement,
      fertilizerData.Urea.nitrogen
    );

    const dap = calculateAmount(
      pRequirement,
      fertilizerData.DAP.phosphorus
    );

    const mop = calculateAmount(
      kRequirement,
      fertilizerData.MOP.potassium
    );

    return {
      nitrogen: nRequirement,
      phosphorus: pRequirement,
      potassium: kRequirement,
      urea,
      dap,
      mop,
    };
  }, [
    crop,
    areaInAcres,
    soilTest,
    nitrogen,
    phosphorus,
    potassium,
    selectedCrop,
  ]);

  const handleCalculate = () => {
    if (!area || Number(area) <= 0) return;

    setCalculated(true);
  };

  const resetCalculator = () => {
    setCrop("Wheat");
    setArea("1");
    setUnit("acre");
    setSoilTest("No");
    setNitrogen("");
    setPhosphorus("");
    setPotassium("");
    setCalculated(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-xl bg-amber-100 p-2 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <Calculator size={22} />
            </div>

            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              SMART CALCULATOR
            </span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Soil & Fertilizer Calculator
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Crop, field area aur nutrient requirement ke
            basis par approximate fertilizer quantity calculate
            karein.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">

          {/* Input Section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Sprout size={21} />
              </div>

              <div>
                <h2 className="font-bold">
                  Field Information
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Apne field ki basic information enter karein.
                </p>
              </div>
            </div>

            <div className="space-y-5">

              {/* Crop */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Select Crop
                </label>

                <select
                  value={crop}
                  onChange={(e) => {
                    setCrop(e.target.value);
                    setCalculated(false);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950"
                >
                  {Object.keys(cropRequirements).map(
                    (cropName) => (
                      <option
                        key={cropName}
                        value={cropName}
                      >
                        {cropName}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Field Area
                </label>

                <div className="grid grid-cols-[1fr_130px] gap-3">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={area}
                    onChange={(e) => {
                      setArea(e.target.value);
                      setCalculated(false);
                    }}
                    placeholder="Enter area"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950"
                  />

                  <select
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value);
                      setCalculated(false);
                    }}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <option value="acre">
                      Acre
                    </option>

                    <option value="hectare">
                      Hectare
                    </option>
                  </select>
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Calculation ke liye area internally acres
                  me convert hota hai.
                </p>
              </div>

              {/* Soil Test */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Do you have Soil Test values?
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSoilTest("Yes");
                      setCalculated(false);
                    }}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      soilTest === "Yes"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                    }`}
                  >
                    Yes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSoilTest("No");
                      setCalculated(false);
                    }}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      soilTest === "No"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Soil Test Inputs */}
              {soilTest === "Yes" && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                  <div className="mb-4 flex gap-2">
                    <Info
                      size={17}
                      className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                    />

                    <p className="text-xs leading-5 text-emerald-700 dark:text-emerald-400">
                      Soil test report me recommended N, P aur
                      K requirement enter karein. Values
                      kg/acre ke reference me honi chahiye.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <NutrientInput
                      label="Nitrogen"
                      value={nitrogen}
                      onChange={setNitrogen}
                      placeholder="N"
                    />

                    <NutrientInput
                      label="Phosphorus"
                      value={phosphorus}
                      onChange={setPhosphorus}
                      placeholder="P"
                    />

                    <NutrientInput
                      label="Potassium"
                      value={potassium}
                      onChange={setPotassium}
                      placeholder="K"
                    />
                  </div>
                </div>
              )}

              {/* Default Requirement */}
              {soilTest === "No" && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="mb-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Reference nutrient requirement
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <RequirementBox
                      label="N"
                      value={selectedCrop.nitrogen}
                    />

                    <RequirementBox
                      label="P"
                      value={selectedCrop.phosphorus}
                    />

                    <RequirementBox
                      label="K"
                      value={selectedCrop.potassium}
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleCalculate}
                  disabled={!area || Number(area) <= 0}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Calculator size={18} />
                  Calculate Fertilizer
                </button>

                <button
                  onClick={resetCalculator}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                >
                  <RefreshCw size={17} />
                  Reset
                </button>
              </div>
            </div>
          </section>

          {/* Result Section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-6">
              <h2 className="font-bold">
                Fertilizer Recommendation
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Approximate quantity based on selected inputs.
              </p>
            </div>

            {!calculated ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 text-center dark:border-slate-700">
                <div className="mb-4 rounded-2xl bg-emerald-50 p-4 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Calculator size={32} />
                </div>

                <h3 className="font-bold">
                  Ready to calculate
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Crop aur field area enter karke
                  <strong> Calculate Fertilizer </strong>
                  button press karein.
                </p>
              </div>
            ) : (
              <div className="space-y-4">

                {/* Field summary */}
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Crop
                      </p>

                      <p className="mt-1 font-bold">
                        {crop}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Area
                      </p>

                      <p className="mt-1 font-bold">
                        {areaInAcres.toFixed(2)} acres
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fertilizer cards */}
                <FertilizerCard
                  name="Urea"
                  formula="46% Nitrogen"
                  amount={fertilizerPlan.urea}
                  color="blue"
                  description="Nitrogen source"
                />

                <FertilizerCard
                  name="DAP"
                  formula="18% N + 46% P₂O₅"
                  amount={fertilizerPlan.dap}
                  color="amber"
                  description="Nitrogen + phosphorus source"
                />

                <FertilizerCard
                  name="MOP"
                  formula="60% Potassium"
                  amount={fertilizerPlan.mop}
                  color="purple"
                  description="Potassium source"
                />

                {/* Nutrient summary */}
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <h3 className="mb-3 text-sm font-bold">
                    Nutrient Requirement
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    <RequirementBox
                      label="Nitrogen"
                      value={`${fertilizerPlan.nitrogen} kg`}
                    />

                    <RequirementBox
                      label="Phosphorus"
                      value={`${fertilizerPlan.phosphorus} kg`}
                    />

                    <RequirementBox
                      label="Potassium"
                      value={`${fertilizerPlan.potassium} kg`}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Fertilizer Information */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Leaf size={20} />
            </div>

            <div>
              <h2 className="font-bold">
                Fertilizer Reference
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calculator me used fertilizer nutrient percentages.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <ReferenceCard
              name="Urea"
              value="46% N"
              description="Nitrogen fertilizer"
            />

            <ReferenceCard
              name="DAP"
              value="18% N + 46% P₂O₅"
              description="Nitrogen + phosphorus"
            />

            <ReferenceCard
              name="MOP"
              value="60% K₂O"
              description="Potassium fertilizer"
            />
          </div>
        </section>

        {/* Warning */}
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
          <div className="flex gap-3">
            <TriangleAlert
              size={20}
              className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
            />

            <div>
              <h3 className="font-bold text-amber-800 dark:text-amber-300">
                Important
              </h3>

              <p className="mt-1 text-sm leading-6 text-amber-700 dark:text-amber-400">
                Ye calculator educational/reference purpose ke
                liye approximate calculation karta hai. Actual
                fertilizer recommendation soil test, crop
                variety, season, irrigation, previous crop aur
                local agricultural recommendation par depend
                karti hai. Final application se pehle local
                agriculture expert ya soil-test recommendation
                verify karein.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          Calculations are estimates and should not replace a
          soil-test-based fertilizer recommendation.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------
   Nutrient Input
---------------------------------- */

function NutrientInput({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold">
        {label}
      </label>

      <div className="relative">
        <input
          type="number"
          min="0"
          step="0.1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2.5 pr-10 text-sm outline-none focus:border-emerald-500 dark:border-emerald-900 dark:bg-slate-900"
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          kg
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------
   Requirement Box
---------------------------------- */

function RequirementBox({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold">
        {value}
      </p>
    </div>
  );
}

/* ---------------------------------
   Fertilizer Card
---------------------------------- */

function FertilizerCard({
  name,
  formula,
  amount,
  description,
  color,
}) {
  const colors = {
    blue: {
      wrapper:
        "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/20",
      icon:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      amount:
        "text-blue-700 dark:text-blue-400",
    },

    amber: {
      wrapper:
        "border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20",
      icon:
        "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
      amount:
        "text-amber-700 dark:text-amber-400",
    },

    purple: {
      wrapper:
        "border-purple-200 bg-purple-50 dark:border-purple-900/40 dark:bg-purple-950/20",
      icon:
        "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
      amount:
        "text-purple-700 dark:text-purple-400",
    },
  };

  const style = colors[color];

  return (
    <div
      className={`rounded-xl border p-4 ${style.wrapper}`}
    >
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${style.icon}`}>
          <Leaf size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-bold">
                {name}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formula}
              </p>
            </div>

            <div className="text-right">
              <p className={`text-xl font-bold ${style.amount}`}>
                {amount.toFixed(1)} kg
              </p>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                approximate
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <CheckCircle2 size={14} />
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------
   Reference Card
---------------------------------- */

function ReferenceCard({
  name,
  value,
  description,
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold">{name}</h3>

        <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          {value}
        </span>
      </div>

      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default SoilFertilizerCalculator;