import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import SignupPage from "./components/SignupPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from "./components/UserDashboard";
import MySpaces from "./components/MySpaces";
import Space from "./components/Space";
import CreateSpace from "./components/CreateSpace";
import Arena from "./components/Game";

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
        <Route path="/createspace" element={<CreateSpace />}/>
        <Route path="/game" element={<Arena />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
