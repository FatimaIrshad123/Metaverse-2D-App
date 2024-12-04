import { useEffect, useState } from 'react';
import axios from 'axios';
import { templatedata } from '../data/templatedata';
import { useNavigate } from 'react-router-dom';

const CreateSpace = () => {  
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [mapId, setMapId] = useState<any>();
  const [spaceId, setSpaceId] = useState<any>();
  const [width1, setWidth] = useState<Number| any> ();
  const [height, setHeight] = useState<Number| any> ();
  const [name, setName] = useState<string[]>([]);
  const [templates, setTemplates] = useState<any>([])
  const [selectedWidth, setSelectedWidth] = useState<Number >(200)
  const [selectedHeight, setSelectedHeight] = useState<Number >(200)
  const [selectedImageUrl, setSelectedImageUrl] = useState<any>('https://plus.unsplash.com/premium_photo-1668116307088-583ee0d4aaf7?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  const [selectedName, setSelectedName] = useState('')

  const BACKEND_URL = 'http://localhost:3000';
  let userToken = localStorage.getItem('userToken')
  const navigate = useNavigate();

  const createSpace = async () => {
    try {
      const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space`, {
        name: selectedName,
        dimensions: `${selectedWidth}x${selectedHeight}`,
        mapId
      }, {
        headers: { authorization: `Bearer ${userToken}` }
      });

      setSpaceId(spaceResponse.data.spaceId);
      localStorage.setItem('spaceId',spaceResponse.data.spaceId)
      return spaceResponse.data.spaceId;
    } catch (error) {
      console.error('Error creating space:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.MouseEvent,template:any) => {
    e.preventDefault();
    setSelectedName(template.name)
    setSelectedWidth(template.width1);
    setSelectedHeight(template.height);
    setSelectedImageUrl(template.imageUrl);

    try {
      await createSpace();
      alert('Successfully created Space');
      navigate('/space')
    } catch (error) {
        console.log(error)
      alert('Failed to create Space');
    }
  };
  
  useEffect(() => {
    if (templatedata.length > 0) {
      const processedNames = templatedata.map((item) => item.name);
      const processedWidths = templatedata.map((item) => item.width);
      const processedHeights = templatedata.map((item) => item.height);
      const processedImageUrls = templatedata.map((item) => item.imageUrl);
      
      setName(processedNames);
      setWidth(processedWidths);
      setHeight(processedHeights);
      setImageUrl(processedImageUrls);
      
      const processedData = templatedata.map((item) => ({
        name: item.name,
        width1: item.width,
        height: item.height,
        imageUrl: item.imageUrl,
      }));
      setTemplates(processedData);
    }
  }, [templatedata]);

  return (
    <div className="bg-white min-h-screen m-10">
      <div>
        <h2 className="font-bold text-2xl">Select a Template</h2>
      </div>
      <div className='grid lg:grid-cols-5 md:grid-cols-3 gap-4 sm:justify-center mt-7'>
        {templates.map((template:any, index:any) => (
          <div key={index} className=''>
            <img
              className='rounded-lg'
              src={imageUrl[index]} 
              alt={name[index]}
              width={width1[index]} 
              height={height[index]} 
              onClick={(e) => {
                setSelectedWidth(template.width)
                handleSubmit(e,template);
              }}
            />
            <h2>{name[index]}</h2>
          </div>
        ))}
      </div>
    </div>
  )
};

export default CreateSpace;