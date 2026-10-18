import { useState } from "react";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  X,
  Leaf,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function LeafDiseaseIdentifier() {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB.");
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setResult(null);
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setResult(null);

    // Demo analysis.
    // Later this function can call a real AI inference API.
    setTimeout(() => {
      setResult({
        disease: "Leaf Spot",
        confidence: 86,
        severity: "Moderate",
        symptoms: [
          "Small dark spots may appear on the leaf surface.",
          "Affected areas can gradually become larger.",
          "Leaves may start losing their healthy green appearance.",
        ],
        recommendations: [
          "Remove heavily affected leaves if practical.",
          "Avoid unnecessary overhead irrigation.",
          "Keep proper spacing between plants for airflow.",
          "Consult a local agriculture expert if symptoms spread rapidly.",
        ],
      });

      setIsAnalyzing(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/ai-tools")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={18} />
          Back to AI Tools
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Leaf size={21} />
            </div>

            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              AI Vision Tool
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Leaf Disease Identifier
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
            Upload a clear crop leaf image to analyze possible disease
            symptoms and get basic recommendations.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">

            <div className="mb-5">
              <h2 className="text-lg font-bold">
                Upload Leaf Image
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Use a clear image where the leaf is visible properly.
              </p>
            </div>

            {!previewUrl ? (
              <label className="flex min-h-[330px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 text-center transition-all hover:border-emerald-400 hover:bg-emerald-50/40 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/20">

                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Upload size={28} />
                </div>

                <h3 className="font-semibold">
                  Upload a leaf image
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-5 text-slate-500 dark:text-slate-400">
                  Click here to select an image from your device.
                </p>

                <span className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                  Choose Image
                </span>

                <p className="mt-3 text-xs text-slate-400">
                  JPG, PNG or WEBP • Maximum 5 MB
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div>
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-950">
                  <img
                    src={previewUrl}
                    alt="Selected crop leaf"
                    className="h-[330px] w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <ImageIcon
                    size={18}
                    className="text-slate-500 dark:text-slate-400"
                  />

                  <p className="min-w-0 flex-1 truncate text-sm font-medium">
                    {selectedImage?.name}
                  </p>

                  <span className="text-xs text-slate-400">
                    {(selectedImage?.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Sparkles size={18} />

                  {isAnalyzing
                    ? "Analyzing Image..."
                    : "Analyze Leaf"}
                </button>
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">

            <div className="mb-5">
              <h2 className="text-lg font-bold">
                Analysis Result
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your leaf analysis will appear here.
              </p>
            </div>

            {!result && !isAnalyzing && (
              <div className="flex min-h-[330px] flex-col items-center justify-center rounded-2xl bg-slate-50 px-6 text-center dark:bg-slate-950">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <Leaf size={28} />
                </div>

                <h3 className="font-semibold">
                  No analysis yet
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Upload a leaf image and click "Analyze Leaf" to see the
                  result.
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex min-h-[330px] flex-col items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-950">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600 dark:border-slate-700 dark:border-t-emerald-400" />

                <h3 className="mt-5 font-semibold">
                  Analyzing your leaf...
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Checking visible symptoms.
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-5">

                {/* Disease */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                        <AlertCircle size={20} />
                      </div>

                      <div>
                        <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                          Possible condition
                        </p>

                        <h3 className="mt-1 text-lg font-bold">
                          {result.disease}
                        </h3>
                      </div>
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-amber-700 shadow-sm dark:bg-slate-900 dark:text-amber-400">
                      {result.confidence}% confidence
                    </span>
                  </div>
                </div>

                {/* Severity */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Estimated severity
                    </p>

                    <p className="mt-1 font-semibold">
                      {result.severity}
                    </p>
                  </div>

                  <CheckCircle2
                    size={22}
                    className="text-emerald-500"
                  />
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="mb-3 font-semibold">
                    Possible Symptoms
                  </h3>

                  <div className="space-y-2">
                    {result.symptoms.map((symptom, index) => (
                      <div
                        key={index}
                        className="flex gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-emerald-500"
                        />

                        <p className="text-sm leading-5 text-slate-600 dark:text-slate-300">
                          {symptom}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="mb-3 font-semibold">
                    Basic Recommendations
                  </h3>

                  <div className="space-y-2">
                    {result.recommendations.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/20"
                      >
                        <ShieldCheck
                          size={17}
                          className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                        />

                        <p className="text-sm leading-5 text-slate-600 dark:text-slate-300">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={19}
              className="mt-0.5 shrink-0 text-blue-500"
            />

            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
              This tool provides preliminary information for educational
              support. Image-based identification may not always be accurate.
              For serious crop damage or rapidly spreading disease, consult
              a qualified agricultural expert.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LeafDiseaseIdentifier;