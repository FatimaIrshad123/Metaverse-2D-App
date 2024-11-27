import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import SignupPage from "./components/SignupPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from "./components/UserDashboard";
import MySpaces from "./components/MySpaces";
import Space from "./components/Space";
import JoinSpace from "./components/JoinSpace";

function App() {
  
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/spaces" element={<MySpaces />} />
        <Route path="/space" element={<Space />} />
        <Route path="/joinspace" element={<JoinSpace />}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
