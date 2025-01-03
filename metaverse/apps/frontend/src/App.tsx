import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from "./pages/UserDashboard";
import MySpaces from "./pages/MySpaces";
import Space from "./components/Space";
import CreateSpace from "./pages/CreateSpace";
import Arena from "./components/Game";
import AvatarPage from "./pages/Avatar";
import CreateAvatar from "./pages/CreateAvatar";
import MetadataPage from "./pages/UpdateMetadata";
import AllSpaces from "./pages/AllSpaces";
import UserMetadataPage from "./pages/UserMetadata";
import SpacePage from "./pages/SelectedSpace";
import PhaserGame from "./pages/Spacepractice";
import PhaserPractice from "./pages/PhaserPractice";
import Game123 from "./components/Game123";

function App() {
  
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/spaces" element={<MySpaces />} />
        <Route path="/space" element={<Space />} />
        <Route path="/createspace" element={<CreateSpace />}/>
        <Route path="/game" element={<Game123 />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/createavatar" element={<CreateAvatar />} />
        <Route path="/updatemetadata" element={<MetadataPage />} />
        <Route path="/allspaces" element={<AllSpaces />} />
        <Route path="/usermetadata" element={<UserMetadataPage />} />
        <Route path="/selectedspace" element={<SpacePage />} />
        <Route path="/spacepractice" element={<PhaserGame />} />
        <Route path="/phaserpractice" element={<PhaserPractice />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
