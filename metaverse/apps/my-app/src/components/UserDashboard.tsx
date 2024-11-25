import UserNavbar from "./UserNavbar"


const UserDashboard = () => {
  return (
    <div className="min-h-screen" style={{
        backgroundImage: "url('/bgh.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <UserNavbar />
    </div>
  )
}

export default UserDashboard
