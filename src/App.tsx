import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnderProduction from "./pages/UnderProduction";
import HomePage from "./pages/HomePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AboutUsPage from "./pages/AboutUsPage";
import MainLayout from "./layout/MainLayout";

function App() {
  const isUnderProduction = true;
  return (
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
              path="/about"
              element={
                <>
                  <MainLayout>
                    <AboutUsPage />
                  </MainLayout>
                </>
              }
            />
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
              path="/about"
              element={
                <>
                  <MainLayout>
                    <AboutUsPage />
                  </MainLayout>
                </>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
