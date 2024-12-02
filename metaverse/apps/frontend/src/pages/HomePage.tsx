import IntroPage from "./IntroPage"
import Navbar from "../components/Navbar"
import VirtualPage from "../components/VirtualPage"

const HomePage = () => {
    return (
      <div className="min-h-screen" style={{
          backgroundImage: "url('/bgh.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <Navbar />
          <VirtualPage />
          <IntroPage />
      </div>
    )
  }
  
  export default HomePage