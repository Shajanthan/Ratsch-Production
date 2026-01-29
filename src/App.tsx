import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnderProduction from "./pages/UnderProduction";
import HomePage from "./pages/HomePage";
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
          </>
        ) : (
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
        )}
      </Routes>
    </Router>
  );
}

export default App;
