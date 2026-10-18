import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { isUserLoggedIn } from "../utils/authStorage";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import AIAssistant from "../pages/AIAssistant";
import MyCrops from "../pages/MyCrops";
import AITools from "../pages/AITools";
import Weather from "../pages/WeatherPlanner";
import MandiRates from "../pages/MandiRates";
import Saved from "../pages/Saved";
import Account from "../pages/Account";
import Notifications from "../pages/Notifications";
import Language from "../pages/Language";
import PrivacySecurity from "../pages/PrivacySecurity";
import HelpSupport from "../pages/HelpSupport";
import SarkariYojana from "../pages/SarkariYojana";
import CropDetails from "../pages/CropDetails";
import LeafDiseaseIdentifier from "../pages/LeafDiseaseIdentifier";
import SmartWeatherPlanner from "../pages/SmartWeatherPlanner";
import MandiRatesAnalyst from "../pages/MandiRatesAnalyst";
import SoilFertilizerCalculator from "../pages/SoilFertilizerCalculator";


// Protect all KrishiMitra pages
function ProtectedRoute({ children }) {
  const loggedIn = isUserLoggedIn();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// Login page:
// If user is already logged in, don't show login again.
function LoginRoute() {
  const loggedIn = isUserLoggedIn();

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Login />;
}


function ComingSoon({ title }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <div className="text-center">
        <p className="mb-2 text-sm font-medium text-green-600">
          KrishiMitra AI
        </p>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          This Feature is Coming Soon
        </p>
      </div>
    </div>
  );
}


function AppRoutes({
  onSettingsOpen,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}) {
  return (
    <Routes>

      {/* =========================
          LOGIN
      ========================= */}

      <Route
        path="/login"
        element={<LoginRoute />}
      />


      {/* =========================
          PROTECTED APP
      ========================= */}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout
              onSettingsOpen={onSettingsOpen}
              isMobileSidebarOpen={isMobileSidebarOpen}
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
          </ProtectedRoute>
        }
      >

        {/* Default route */}
        <Route
          path="/"
          element={
            <Navigate to="/dashboard" replace />
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* AI Assistant */}
        <Route
          path="/ai-assistant"
          element={<AIAssistant />}
        />

        {/* My Crops */}
        <Route
          path="/my-crops"
          element={<MyCrops />}
        />

        {/* AI Tools */}
        <Route
          path="/ai-tools"
          element={<AITools />}
        />

        {/* Weather */}
        <Route
          path="/weather"
          element={<Weather />}
        />

        {/* Mandi Rates */}
        <Route
          path="/mandi-rates"
          element={<MandiRates />}
        />

        {/* Saved */}
        <Route
          path="/saved"
          element={<Saved />}
        />

        {/* Account */}
        <Route
          path="/account"
          element={<Account />}
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* Language */}
        <Route
          path="/language"
          element={<Language />}
        />

        {/* Privacy & Security */}
        <Route
          path="/privacy-security"
          element={<PrivacySecurity />}
        />

        {/* Help & Support */}
        <Route
          path="/help-support"
          element={<HelpSupport />}
        />

        {/* Sarkari Yojana */}
        <Route
          path="/sarkari-yojana"
          element={<SarkariYojana />}
        />

        {/* Crop Details */}
        <Route
          path="/crop-details/:cropId"
          element={<CropDetails />}
        />

        {/* Leaf Disease */}
        <Route
          path="/ai-tools/leaf-disease"
          element={<LeafDiseaseIdentifier />}
        />

        {/* Smart Weather Planner */}
        <Route
          path="/ai-tools/weather-planner"
          element={<SmartWeatherPlanner />}
        />

        {/* Mandi Analyst */}
        <Route
          path="/ai-tools/mandi-analyst"
          element={<MandiRatesAnalyst />}
        />

        {/* Soil & Fertilizer Calculator */}
        <Route
          path="/ai-tools/soil-calculator"
          element={<SoilFertilizerCalculator />}
        />

      </Route>


      {/* =========================
          404
      ========================= */}

      <Route
        path="*"
        element={
          <Navigate to="/dashboard" replace />
        }
      />

    </Routes>
  );
}

export default AppRoutes;