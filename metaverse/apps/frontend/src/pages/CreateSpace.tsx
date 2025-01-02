import { useEffect, useState } from 'react';
import axios from 'axios';
import { templatedata } from '../data/templatedata';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const CreateSpace = () => {  
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [mapId, setMapId] = useState<any>();
  const [spaceId, setSpaceId] = useState<any>();
  const [width1, setWidth] = useState<Number| any> ();
  const [height, setHeight] = useState<Number| any> ();
  const [name, setName] = useState<string[]>([]);
  const [templates, setTemplates] = useState<any>([]);
  const [thumbnail,setThumbnail] = useState<any>('')
  
  const BACKEND_URL = 'http://localhost:3000';
  let userToken = localStorage.getItem('userToken')
  let token = localStorage.getItem('token')
  const navigate = useNavigate();

  const createSpace = async (name: string, dimensions: string, imageUrl: string, thumbnail: string) => {
    try {
      const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
        name,
        dimensions,
        imageUrl,
        thumbnail,
        mapId
      }, {
        headers: { authorization: `Bearer ${token}` }
      });
      setSpaceId(spaceResponse.data.spaceId);
      localStorage.setItem('spaceId',spaceResponse.data.spaceId)
      return spaceResponse.data.spaceId;
    } catch (error) {
      console.error('Error creating space:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    if (templatedata.length > 0) {
      const processedNames = templatedata.map((item) => item.name);
      const processedWidths = templatedata.map((item) => item.width);
      const processedHeights = templatedata.map((item) => item.height);
      const processedImageUrls = templatedata.map((item) => item.imageUrl);
      const processedThumbnailUrls = templatedata.map((item) => item.thumbnail);
      
      setName(processedNames);
      setWidth(processedWidths);
      setHeight(processedHeights);
      setImageUrl(processedImageUrls);
      setThumbnail(processedThumbnailUrls)
      
      const processedData = templatedata.map((item) => ({
        name: item.name,
        width1: item.width,
        height: item.height,
        imageUrl: item.imageUrl,
        thumbnail: item.thumbnail
      }));
      setTemplates(processedData);
    }
  }, [templatedata]);

  const handleSubmit = async (e: React.MouseEvent,template:any) => {
    e.preventDefault();
    const { name, width1, height, imageUrl, thumbnail} = template;
    console.log(template)
    try {
      await createSpace(name, `${width1}x${height}`,imageUrl, thumbnail);
      alert('Successfully created Space');
      navigate('/space')
    } catch (error) {
        console.log(error)
      alert('Failed to create Space');
    }
  };
  
  return (
    <div className="" style={{
      backgroundImage: "url('/bgh.avif')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <UserNavbar />
    <div className="min-h-screen p-10">
      <div>
        <h2 className="font-bold text-2xl text-white">Select a Template</h2>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:justify-center mt-7'>
        {templates.map((template:any, index:any) => {
          return (
          <div key={index} className=''>
            <img
              className='rounded-lg'
              src={imageUrl[index]} 
              alt={name[index]}
              width={width1[index]} 
              height={height[index]} 
              onClick={(e) => {
                handleSubmit(e,template);
              }}
            />
            <h2 className='text-white pt-3'>{name[index]}</h2>
          </div>
        )})}
      </div>
    </div>
   </div>
  )
};

export default CreateSpace;