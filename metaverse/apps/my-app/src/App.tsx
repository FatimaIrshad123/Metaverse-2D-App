import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import SignupPage from "./components/SignupPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
