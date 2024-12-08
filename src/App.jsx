import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:id" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
