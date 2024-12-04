import { useState } from 'react';
import { BACKENDURL } from '../url';
import axios from 'axios';

const MetadataPage = () => {
  const [avatarId, setAvatarId] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  let userToken = localStorage.getItem('userToken');

  const handleUpdateMetadata = async () => {
    try {
      const response = await axios.post(`${BACKENDURL}/api/v1/user/metadata`, {
        avatarId: avatarId
      }, 
      {
        headers: { authorization: `Bearer ${userToken}` }
      })
      console.log(response);
    } catch (error) {
      console.log(error)
      setMessage("Network error occurred");
      setIsError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update User Metadata</h1>
      <div className="space-y-4">
        <input 
          placeholder="Enter Avatar ID" 
          value={avatarId}
          onChange={(e) => setAvatarId(e.target.value)}
        />
        <button 
          onClick={handleUpdateMetadata}
          className="w-full"
        >
          Update Metadata
        </button>
        {message && (
          <div className={`p-2 rounded ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetadataPage;