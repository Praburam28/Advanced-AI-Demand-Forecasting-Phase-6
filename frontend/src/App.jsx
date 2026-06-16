import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

// Auth
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Main
import Dashboard from "./pages/Dashboard";
import Datasets from "./pages/Datasets";
import Forecast from "./pages/Forecast";
import ForecastWorkspace from "./pages/ForecastWorkspace";
import ScenarioAnalysis from "./pages/ScenarioAnalysis";

// Enterprise
import OrganizationManagement from "./pages/OrganizationManagement";
import OrganizationSettings from "./pages/OrganizationSettings";
import AnnouncementCenter from "./pages/AnnouncementCenter";
import ForecastApprovals from "./pages/ForecastApprovals";
import GovernanceCenter from "./pages/GovernanceCenter";
import StrategicPlanning from "./pages/StrategicPlanning";
import KPIManagement from "./pages/KPIManagement";
import KPIAnalytics from "./pages/KPIAnalytics";
import DataQualityCenter from "./pages/DataQualityCenter";
import WorkflowAutomation from "./pages/WorkflowAutomation";
import NotificationManagement from "./pages/NotificationManagement";
import ExecutiveCommandCenter from "./pages/ExecutiveCommandCenter";

// AI
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import ExecutiveBICharts from "./pages/ExecutiveBICharts";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import AIInsights from "./pages/AIInsights";
import AccuracyCenter from "./pages/AccuracyCenter";

// Reports
import Reports from "./pages/Reports";
import ExecutiveReports from "./pages/ExecutiveReports";
import ReportSharing from "./pages/ReportSharing";
import ReportScheduling from "./pages/ReportScheduling";
import ForecastCollaboration from "./pages/ForecastCollaboration";

// Admin
import PermissionManagement from "./pages/PermissionManagement";
import Notifications from "./pages/Notifications";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Integrations from "./pages/Integrations";
import DatasetComparison from "./pages/DatasetComparison";

export default function App() {
  const location = useLocation();

  const authPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const isAuthPage = authPages.includes(location.pathname);

  // Auth Layout (No Sidebar / No Navbar)
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    );
  }

  // Main Application Layout
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <TopNavbar />

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Main */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workspace" element={<ForecastWorkspace />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/scenarios" element={<ScenarioAnalysis />} />

            {/* Enterprise */}
            <Route path="/organizations" element={<OrganizationManagement />} />
            <Route path="/organization-settings" element={<OrganizationSettings />} />
            <Route path="/announcement-center" element={<AnnouncementCenter />} />
            <Route path="/forecast-approvals" element={<ForecastApprovals />} />
            <Route path="/governance-center" element={<GovernanceCenter />} />
            <Route path="/strategic-planning" element={<StrategicPlanning />} />
            <Route path="/kpi-management" element={<KPIManagement />} />
            <Route path="/kpi-analytics" element={<KPIAnalytics />} />
            <Route path="/data-quality-center" element={<DataQualityCenter />} />
            <Route path="/workflow-automation" element={<WorkflowAutomation />} />
            <Route path="/notification-management" element={<NotificationManagement />} />
            <Route path="/executive-command-center" element={<ExecutiveCommandCenter />} />

            {/* AI */}
            <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
            <Route path="/executive-bi-charts" element={<ExecutiveBICharts />} />
            <Route path="/dashboard-analytics" element={<DashboardAnalytics />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/accuracy-center" element={<AccuracyCenter />} />

            {/* Reports */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/executive-reports" element={<ExecutiveReports />} />
            <Route path="/report-sharing" element={<ReportSharing />} />
            <Route path="/report-scheduling" element={<ReportScheduling />} />
            <Route path="/collaboration" element={<ForecastCollaboration />} />

            {/* Admin */}
            <Route path="/permissions" element={<PermissionManagement />} />
            <Route path="/dataset-comparison" element={<DatasetComparison />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/integrations" element={<Integrations />} />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}