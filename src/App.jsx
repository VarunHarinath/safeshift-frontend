import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ShiftLogs from './pages/ShiftLogs';
import SafetyPlans from './pages/SafetyPlans';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shift-logs" element={<ShiftLogs />} />
      <Route path="/safety-plans" element={<SafetyPlans />} />
    </Routes>
  </Router>
);

export default App;
