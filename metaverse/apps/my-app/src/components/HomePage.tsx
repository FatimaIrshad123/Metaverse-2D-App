import Navbar from "./Navbar"

const HomePage = () => {
    return (
      <div className="min-h-screen" style={{
          backgroundImage: "url('/bgh.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <Navbar />
          
      </div>
    )
  }
  
  export default HomePage