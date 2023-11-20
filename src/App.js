import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import HomePizza from './Components/Pizza/HomePizza';
import HomePasta from './Components/Pasta/HomePasta';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<HomePizza />} />
          <Route path="/homepasta" element={<HomePasta />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
