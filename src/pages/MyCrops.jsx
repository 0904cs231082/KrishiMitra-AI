import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Sprout,
  CalendarDays,
  MapPin,
  MoreVertical,
  ArrowRight,
  X,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";

const initialCropForm = {
  name: "",
  variety: "",
  area: "",
  sowingDate: "",
  location: "",
  status: "Growing",
  progress: 0,
};

function MyCrops() {
  /* =========================
     Crop Data
  ========================= */
  const navigate = useNavigate();

  const [crops, setCrops] = useState(() => {
    try {
      const savedCrops = localStorage.getItem("krishimitra-crops");

      return savedCrops ? JSON.parse(savedCrops) : [];
    } catch (error) {
      console.error("Unable to load crops:", error);
      return [];
    }
  });

  /* =========================
     Modal State
  ========================= */

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingCropId, setEditingCropId] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);

  const [formData, setFormData] = useState(initialCropForm);

  /* =========================
     Save Crops to LocalStorage
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "krishimitra-crops",
      JSON.stringify(crops)
    );
  }, [crops]);

  /* =========================
     Summary Calculations
  ========================= */

  const totalArea = useMemo(() => {
    return crops.reduce((total, crop) => {
      const area = parseFloat(crop.area) || 0;
      return total + area;
    }, 0);
  }, [crops]);

  const activeCrops = useMemo(() => {
    return crops.filter(
      (crop) =>
        crop.status === "Growing" ||
        crop.status === "Active"
    ).length;
  }, [crops]);

  /* =========================
     Input Handler
  ========================= */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================
     Open Add Crop Modal
  ========================= */

  const handleAddCrop = () => {
    setEditingCropId(null);
    setFormData(initialCropForm);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  /* =========================
     Open Edit Crop Modal
  ========================= */

  const handleEditCrop = (crop) => {
    setEditingCropId(crop.id);

    setFormData({
      name: crop.name,
      variety: crop.variety,
      area: crop.area,
      sowingDate: crop.sowingDate,
      location: crop.location,
      status: crop.status,
      progress: crop.progress,
    });

    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  /* =========================
     Delete Crop
  ========================= */

  const handleDeleteCrop = (cropId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this crop?"
    );

    if (!confirmDelete) return;

    setCrops((previous) =>
      previous.filter((crop) => crop.id !== cropId)
    );

    setOpenMenuId(null);
  };

  /* =========================
     Form Submit
  ========================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.area ||
      !formData.sowingDate ||
      !formData.location.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const formattedDate = new Date(
      formData.sowingDate
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const cropData = {
      ...formData,
      name: formData.name.trim(),
      variety: formData.variety.trim(),
      location: formData.location.trim(),
      area: formData.area,
      progress: Number(formData.progress),
      sowingDate: formattedDate,
    };

    /* =========================
       Edit Existing Crop
    ========================= */

    if (editingCropId) {
      setCrops((previous) =>
        previous.map((crop) =>
          crop.id === editingCropId
            ? {
                ...crop,
                ...cropData,
              }
            : crop
        )
      );
    }

    /* =========================
       Add New Crop
    ========================= */

    else {
      const newCrop = {
        id: Date.now(),
        ...cropData,
      };

      setCrops((previous) => [
        ...previous,
        newCrop,
      ]);
    }

    setFormData(initialCropForm);
    setEditingCropId(null);
    setIsModalOpen(false);
  };

  /* =========================
     Close Modal
  ========================= */

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCropId(null);
    setFormData(initialCropForm);
  };

  /* =========================
     JSX
  ========================= */

  return (
    <div className="min-h-full bg-slate-50 p-4 transition-colors duration-300 dark:bg-slate-950 sm:p-6 lg:p-8">

      {/* =========================
          Header
      ========================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="mb-1 text-sm font-medium text-green-600 dark:text-green-400">
            Crop Management
          </p>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            My Crops
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Apni crops ko manage karein aur unki growth track karein.
          </p>
        </div>

        <button
          onClick={handleAddCrop}
          className="flex w-fit items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md"
        >
          <Plus size={18} />
          Add Crop
        </button>
      </div>

      {/* =========================
          Crop Summary
      ========================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Crops */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
            <Sprout size={21} />
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Crops
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {String(crops.length).padStart(2, "0")}
          </h2>
        </div>

        {/* Total Area */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <MapPin size={21} />
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Area
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {totalArea} Acres
          </h2>
        </div>

        {/* Active Crops */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
            <CalendarDays size={21} />
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Active Crops
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {String(activeCrops).padStart(2, "0")}
          </h2>
        </div>
      </div>

      {/* =========================
          Crop List Header
      ========================= */}

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Your Crops
        </h2>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          {crops.length}{" "}
          {crops.length === 1 ? "crop" : "crops"}
        </span>
      </div>

      {/* =========================
          Empty State
      ========================= */}

      {crops.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
            <Sprout size={28} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            No crops added yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Apni first crop add karein aur uski growth aur details ko
            yahan manage karein.
          </p>

          <button
            onClick={handleAddCrop}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Your First Crop
          </button>
        </div>
      )}

      {/* =========================
          Crop Cards
      ========================= */}

      {crops.length > 0 && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

          {crops.map((crop) => (
            <div
              key={crop.id}
              className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >

              {/* =========================
                  Card Header
              ========================= */}

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400">
                    <Sprout size={24} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {crop.name}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {crop.variety || "Variety not specified"}
                    </p>
                  </div>
                </div>

                {/* More Menu */}

                <div className="relative">

                  <button
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === crop.id
                          ? null
                          : crop.id
                      )
                    }
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {openMenuId === crop.id && (
                    <div className="absolute right-0 top-11 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">

                      <button
                        onClick={() =>
                          handleEditCrop(crop)
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteCrop(crop.id)
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* =========================
                  Crop Details
              ========================= */}

              <div className="mt-5 grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-slate-400">
                    Area
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {crop.area} Acres
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Sowing Date
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {crop.sowingDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {crop.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      crop.status === "Growing"
                        ? "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                        : crop.status === "Harvested"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                        : "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
                    }`}
                  >
                    {crop.status}
                  </span>
                </div>
              </div>

              {/* =========================
                  Growth Progress
              ========================= */}

              <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Growth Progress
                  </span>

                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {crop.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

                  <div
                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                    style={{
                      width: `${crop.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* =========================
                  View Details
              ========================= */}

              <button
  onClick={() => navigate(`/crop-details/${crop.id}`)}
  className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-600 transition-all duration-200 group-hover:gap-3 dark:text-green-400"
>
  View Crop Details
  <ArrowRight size={16} />
</button>
            </div>
          ))}
        </div>
      )}

      {/* =========================
          Add / Edit Crop Modal
      ========================= */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >

          <div
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >

            {/* Modal Header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingCropId
                    ? "Edit Crop"
                    : "Add New Crop"}
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Apni crop ki details enter karein.
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >

              {/* Crop Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Crop Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Wheat"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Variety */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Variety
                </label>

                <input
                  type="text"
                  name="variety"
                  value={formData.variety}
                  onChange={handleInputChange}
                  placeholder="e.g. Lok-1"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Area + Date */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Area (Acres) *
                  </label>

                  <input
                    type="number"
                    name="area"
                    min="0"
                    step="0.01"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="e.g. 2"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Sowing Date *
                  </label>

                  <input
                    type="date"
                    name="sowingDate"
                    value={
                      editingCropId
                        ? ""
                        : formData.sowingDate
                    }
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />

                  {editingCropId && (
                    <p className="mt-1 text-xs text-slate-400">
                      Existing date will remain unchanged.
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Location *
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Gwalior, MP"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Status */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="Growing">Growing</option>
                  <option value="Active">Active</option>
                  <option value="Harvested">Harvested</option>
                  <option value="Planned">Planned</option>
                </select>
              </div>

              {/* Progress */}

              <div>
                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Growth Progress
                  </label>

                  <span className="text-sm font-bold text-green-600 dark:text-green-400">
                    {formData.progress}%
                  </span>
                </div>

                <input
                  type="range"
                  name="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleInputChange}
                  className="w-full accent-green-600"
                />
              </div>

              {/* Buttons */}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <Save size={17} />

                  {editingCropId
                    ? "Update Crop"
                    : "Save Crop"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCrops;