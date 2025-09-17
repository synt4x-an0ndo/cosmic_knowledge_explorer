import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LandingPage from "pages/LandingPage";
import GuidedTourMode from './pages/guided-tour-mode';
import UniverseExplorer from './pages/3d-universe-explorer';
import UserDashboard from './pages/user-dashboard';
import EducationalQuizCenter from './pages/educational-quiz-center';
import ObjectInformationPanel from './pages/object-information-panel';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/guided-tour-mode" element={<GuidedTourMode />} />
        <Route path="/3d-universe-explorer" element={<UniverseExplorer />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/educational-quiz-center" element={<EducationalQuizCenter />} />
        <Route path="/object-information-panel" element={<ObjectInformationPanel />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;