import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UnderProduction from './pages/UnderProduction'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnderProduction />} />
      </Routes>
    </Router>
  )
}

export default App

