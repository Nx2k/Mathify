import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AlgebraPage from './pages/AlgebraPage';
import CalculusPage from './pages/CalculusPage';
import GeometryPage from './pages/GeometryPage';
import StatisticsPage from './pages/StatisticsPage';
import NumberTheoryPage from './pages/NumberTheoryPage';
import DiscreteMathPage from './pages/DiscreteMathPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/algebra" element={<AlgebraPage />} />
            <Route path="/calculus" element={<CalculusPage />} />
            <Route path="/geometry" element={<GeometryPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/number-theory" element={<NumberTheoryPage />} />
            <Route path="/discrete-math" element={<DiscreteMathPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
