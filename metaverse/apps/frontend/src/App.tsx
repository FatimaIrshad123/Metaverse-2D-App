import SignInPage from "./components/SignInPage";
import SignupPage from "./components/SignupPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const backgroundStyle = {
  backgroundImage: '/bg.jpg',
  backgroundSize: 'cover', // Ensures the image covers the entire area
  backgroundPosition: 'center', // Centers the image
  height: '100vh', // Full viewport height
  width: '100%',   // Full width
};

function App() {
  
  return (
    <div style={backgroundStyle}>

    
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
