import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKENDURL } from '../url';

const SpacePage = () => {
  const [dimensions, setDimensions] = useState<string>('');
  const [elements, setElements] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userToken = localStorage.getItem('userToken');
  let spaceId = localStorage.getItem('spaceId')
    console.log('spaceId',spaceId)
  const fetchSpace = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKENDURL}/api/v1/space/${spaceId}`, {
        headers: { authorization: `Bearer ${userToken}` },
      });
      console.log(response)
      const { dimensions, elements } = response.data;
      
      setDimensions(dimensions);
      setElements(elements);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching space:', err);
      setError('Failed to fetch space. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
   if (spaceId) fetchSpace();
  }, [spaceId]);

  if (loading) {
    return <p className="text-white">Loading space...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl text-white mt-5">Space Details</h2>
        <p className="text-gray-300 mt-3">Dimensions: {dimensions}</p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:justify-center mt-7" 
      style={{
        backgroundImage: "url('https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/N4XpyYnWRAiFz9CP/jDBuCZ53Lz9AwEGxROt7m4')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        {elements.map((e) => (
          <div key={e.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <img
              src={e.element.imageUrl}
              alt={`Element ${e.id}`}
              className="rounded-lg"
              style={{
                width: `${e.element.width}px`,
                height: `${e.element.height}px`,
                objectFit: 'cover',
              }}
            />
            <div className="text-gray-400 mt-3">
              <p>Position: ({e.x}, {e.y})</p>
              <p>Static: {e.element.static ? 'Yes' : 'No'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpacePage;
