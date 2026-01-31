import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
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

function App() {
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

export default App;
