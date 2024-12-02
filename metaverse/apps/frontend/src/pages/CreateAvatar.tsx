import { useState } from "react"
import axios from 'axios';
import { BACKENDURL } from "../url";

const CreateAvatar = () => {
    const [avatarName, setAvatarName] = useState<string>();
    const [imageUrl, setImageUrl] = useState<string>();
  
    let adminToken = localStorage.getItem('adminToken')

    const createavatar = async () => {
        try {
          const avatarResponse = await axios.post(`${BACKENDURL}/api/v1/admin/avatar`, {
            name: avatarName,
            imageUrl
          }, {
            headers: { authorization: `Bearer ${adminToken}` }
          });
          console.log(avatarResponse.data)
          return avatarResponse.data;
        } catch (error) {
          console.error('Error creating avatar:', error);
          throw error;
        }
      };

       const handleSubmit = async(e:any) => {
        e.preventDefault();
        try {
          await createavatar();
          alert('Avatar created successfully')
        }catch(error){
          console.log(error);
          alert('Error creating avatar')
        }
          
          
       }
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-200">
        <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-semibold text-gray-900">
              Create Avatar
            </h2>
          </div>
  
          {/* Form */}
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="avatarname" className='text-gray-600 pl-2'>Avatar Name</label>
                <input
                  name="avatarname"
                  type="text"
                  required
                  value={avatarName}
                  onChange={(e) => setAvatarName(e.target.value)}
                  className="appearance-none relative block w-full pl-3 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg sm:text-sm transition-colors duration-200"
                  placeholder="Enter avatar name"
                />
              </div>

              <div className="relative">
                <label htmlFor="imageurl" className='text-gray-600 pl-2'>ImageUrl</label>
                <input
                  name="imageurl"
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="appearance-none relative block w-full pl-3 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg sm:text-sm transition-colors duration-200"
                  placeholder="Enter imageUrl"
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring-500 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
                    Create avatar
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default CreateAvatar
