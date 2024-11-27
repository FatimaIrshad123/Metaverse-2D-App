import { useState } from 'react';
import axios from 'axios';

const JoinSpace = () => {
  
  const [imageUrl, setImageUrl] = useState('https://image.com/cat3.png');
  const [thumbnailUrl, setThumbnailUrl] = useState('https://thumbnail.com/a.png');
  const [elementIds, setElementIds] = useState<any>([]);
  const [mapId, setMapId] = useState<any>();
  const [spaceId, setSpaceId] = useState<any>();

  const BACKEND_URL = 'http://localhost:3000';
    let adminToken = localStorage.getItem('adminToken')
    
  const createElements = async () => {
    try {
      const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
        imageUrl,
        width: 1,
        height: 1,
        static: true
      }, {
        headers: { authorization: `Bearer ${adminToken}` }
      });
      const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
        imageUrl,
        width: 1,
        height: 1,
        static: true
      }, {
        headers: { authorization: `Bearer ${adminToken}` }
      });

      const newElementIds = [
        element1Response.data.id,
        element2Response.data.id, 
      ];
      setElementIds(newElementIds);
      return newElementIds;
    } catch (error) {
      console.error('Error creating elements:', error);
      throw error;
    }
  };

  const createMap = async (elementIds:any) => {
    try {
      const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
        thumbnail: thumbnailUrl,
        dimensions: "100x200",
        name: "100 person interview room",
        defaultElements: [
          { elementId: elementIds[0], x: 20, y: 20 },
          { elementId: elementIds[0], x: 18, y: 20 },
          { elementId: elementIds[1], x: 18, y: 20 }
        ]
      }, {
        headers: { authorization: `Bearer ${adminToken}` }
      });

      setMapId(mapResponse.data.id);
      localStorage.setItem('mapId',mapResponse.data.id)
      return mapResponse.data.id;
    } catch (error) {
      console.error('Error creating map:', error);
      throw error;
    }
  };

  const createSpace = async (mapId:any) => {
    try {
      const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
        name: "Test",
        dimensions: "100x200",
        mapId
      }, {
        headers: { authorization: `Bearer ${adminToken}` }
      });

      setSpaceId(spaceResponse.data.spaceId);
      localStorage.setItem('spaceId',spaceResponse.data.spaceId)
      return spaceResponse.data.spaceId;
    } catch (error) {
      console.error('Error creating space:', error);
      throw error;
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const elementIds = await createElements();
      const mapId = await createMap(elementIds);
      await createSpace(mapId);
      alert('Successfully created elements, map, and space!');
    } catch (error) {
        console.log(error)
      alert('Failed to create resources');
    }
  };
  console.log(elementIds)
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div>
        <h2>Create Elements, Map, and Space</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label>Image URL</label>
            <input 
              type="text" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              placeholder="Enter image URL" 
              required 
            />
          </div>
          <div>
            <label>Thumbnail URL</label>
            <input 
              type="text" 
              value={thumbnailUrl} 
              onChange={(e) => setThumbnailUrl(e.target.value)} 
              placeholder="Enter thumbnail URL" 
              required 
            />
          </div>
          <button type="submit" className="w-full">
            Create Resources
          </button>
        </form>

        {elementIds.length > 0 && (
          <div className="mt-4">
            <h3>Created Resources:</h3>
            <p>Element IDs: {elementIds.join(', ')}</p>
            <p>Map ID: {mapId}</p>
            <p>Space ID: {spaceId}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinSpace;