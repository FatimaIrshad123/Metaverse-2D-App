import UserNavbar from "./UserNavbar"
import {Search} from 'lucide-react'

const UserDashboard = () => {
  return (
    <div className="min-h-screen" style={{
        backgroundImage: "url('/bgh.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <UserNavbar />
      <div className="px-14 lg:flex md:flex justify-end">
        <h2 className="text-white font-bold text-2xl px-5 pb-3 lg:hidden md:hidden">Your Spaces</h2>
        <button className="text-white font-semibold bg-slate-500 rounded-2xl px-7 py-3 hidden md:block lg:block">
            My Events
        </button>
        <div className="relative ml-5 rounded-xl">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="text-white h-4 w-5"/>
            </div>
            <input type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search" required />
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
