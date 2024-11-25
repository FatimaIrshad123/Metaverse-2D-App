import IntroPage from "./IntroPage"
import Navbar from "./Navbar"
import VirtualPage from "./VirtualPage"

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