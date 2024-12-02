import { useEffect, useState } from 'react';
import axios from 'axios';
import { templatedata } from '../data/templatedata';

const CreateSpace = () => {
  
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string[]>([]);
  const [elementIds, setElementIds] = useState<any>([]);
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
    let adminToken = localStorage.getItem('adminToken')
    
  const createElements = async () => {
    try {
      const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
        imageUrl: selectedImageUrl,
        width:selectedWidth,
        height: selectedHeight,
        static: true
      }, {
        headers: { authorization: `Bearer ${adminToken}` }
      });
      const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
        imageUrl: selectedImageUrl,
        width: selectedWidth,
        height: selectedHeight,
        static: true
      }, {
        headers: { authorization: `Bearer ${adminToken}` }
      });
      console.log('element1Response.data', element1Response.data)
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
        thumbnail: selectedImageUrl,
        dimensions:`${selectedWidth}x${selectedHeight}`,
        name: selectedName,
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
        dimensions: `${selectedWidth}x${selectedHeight}`,
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

  const handleSubmit = async (e: React.MouseEvent,template:any) => {
    e.preventDefault();
    setSelectedName(template.name)
    setSelectedWidth(template.width1);
    setSelectedHeight(template.height);
    setSelectedImageUrl(template.imageUrl);

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
      setThumbnailUrl(processedThumbnailUrls);

      const processedData = templatedata.map((item) => ({
        name: item.name,
        width1: item.width,
        height: item.height,
        imageUrl: item.imageUrl,
        thumbnailUrl: item.thumbnail,
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
                console.log('template.width',selectedWidth);
                console.log('template',template);
                handleSubmit(e,template);
              }}
            />
            <h2>{name[index]}</h2>
            <img src={thumbnailUrl[index]} hidden/>
          </div>
        ))}
      </div>
    </div>
  )
};

export default CreateSpace;