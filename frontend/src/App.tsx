import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import SplashScreen, { MIN_DISPLAY_MS } from "./components/SplashScreen";
import { prefetchAppData } from "./utils/prefetch";
import UnderProduction from "./pages/UnderProduction";
import HomePage from "./pages/HomePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import ProjectsPage from "./pages/ProjectsPage";
import LoginPage from "./pages/Admin/LoginPage";
import AdminLayout from "./layout/AdminLayout";
import AdminPage from "./pages/Admin/AdminPage";
import AdminHomepagePage from "./pages/Admin/AdminHomepagePage";
import AdminServicesPage from "./pages/Admin/AdminServicesPage";
import AdminProjectsPage from "./pages/Admin/AdminProjectsPage";
import AdminClientsPage from "./pages/Admin/AdminClientsPage";
import AdminClientReviewPage from "./pages/Admin/AdminClientReviewPage";
import AdminCoreValuesPage from "./pages/Admin/AdminCoreValuesPage";
import MainLayout from "./layout/MainLayout";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function AppContent() {
  const isUnderProduction = true;
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {isUnderProduction ? (
            <>
              <Route path="/" element={<UnderProduction />} />
              <Route
                path="/demo"
                element={
                  <>
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/demo/"
                element={
                  <>
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/demo/project/:id"
                element={
                  <>
                    <MainLayout>
                      <ProjectDetailsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/demo/about"
                element={
                  <>
                    <MainLayout>
                      <AboutUsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/demo/service/:id"
                element={
                  <>
                    <MainLayout>
                      <ServiceDetailsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/demo/projects"
                element={
                  <>
                    <MainLayout>
                      <ProjectsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/project/:id"
                element={
                  <>
                    <MainLayout>
                      <ProjectDetailsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/service/:id"
                element={
                  <>
                    <MainLayout>
                      <ServiceDetailsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <MainLayout>
                      <AboutUsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminPage />} />
                <Route path="homepage" element={<AdminHomepagePage />} />
                <Route path="services" element={<AdminServicesPage />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="clients" element={<AdminClientsPage />} />
                <Route
                  path="client-reviews"
                  element={<AdminClientReviewPage />}
                />
                <Route path="core-values" element={<AdminCoreValuesPage />} />
              </Route>
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <>
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/project/:id"
                element={
                  <>
                    <MainLayout>
                      <ProjectDetailsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/service/:id"
                element={
                  <>
                    <MainLayout>
                      <ServiceDetailsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/projects"
                element={
                  <>
                    <MainLayout>
                      <ProjectsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <MainLayout>
                      <AboutUsPage />
                    </MainLayout>
                  </>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminPage />} />
                <Route path="homepage" element={<AdminHomepagePage />} />
                <Route path="services" element={<AdminServicesPage />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="clients" element={<AdminClientsPage />} />
                <Route
                  path="client-reviews"
                  element={<AdminClientReviewPage />}
                />
                <Route path="core-values" element={<AdminCoreValuesPage />} />
              </Route>
            </>
          )}
        </Routes>
      </Router>
    </ToastProvider>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashClosing, setSplashClosing] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [prefetchReady, setPrefetchReady] = useState(false);
  const [typingReady, setTypingReady] = useState(false);

  useEffect(() => {
    const prefetch = prefetchAppData((percent) => setLoadProgress(percent));
    Promise.all([prefetch, delay(MIN_DISPLAY_MS)])
      .then(() => setPrefetchReady(true))
      .catch(() => setShowSplash(false));
  }, []);

  // Close splash only when BOTH typing and prefetch (and min delay) are done
  useEffect(() => {
    if (prefetchReady && typingReady) {
      setSplashClosing(true);
    }
  }, [prefetchReady, typingReady]);

  // When closing: render app underneath so splash fades out to reveal it (no flash)
  const showAppUnderneath = splashClosing;
  const showSplashOverlay = showSplash;

  return (
    <>
      {(showAppUnderneath || !showSplashOverlay) && <AppContent />}
      {showSplashOverlay && (
        <SplashScreen
          progress={loadProgress}
          isFetchComplete={prefetchReady}
          onTypingComplete={() => setTypingReady(true)}
          isClosing={splashClosing}
          onCloseComplete={() => setShowSplash(false)}
        />
      )}
    </>
  );
}

export default App;
