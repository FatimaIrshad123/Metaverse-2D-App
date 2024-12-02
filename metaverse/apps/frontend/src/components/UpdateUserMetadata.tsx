import { useState } from 'react';

const MetadataPage = () => {
  const [avatarId, setAvatarId] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleUpdateMetadata = async () => {
    try {
      const response = await fetch('/api/user/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatarId })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setIsError(false);
      } else {
        setMessage(data.message);
        setIsError(true);
      }
    } catch (error) {
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