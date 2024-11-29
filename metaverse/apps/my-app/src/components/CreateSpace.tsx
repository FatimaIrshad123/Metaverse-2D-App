import { useEffect, useState } from 'react';
import axios from 'axios';
import { templatedata } from '../data/templatedata';

const CreateSpace = () => {
  
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string[]>([]);
  const [elementIds, setElementIds] = useState<any>([]);
  const [mapId, setMapId] = useState<any>();
  const [spaceId, setSpaceId] = useState<any>();
  const [width, setWidth] = useState<Number | any>();
  const [height, setHeight] = useState<Number | any>('');
  const [name, setName] = useState<string[]>([]);
  const [templates, setTemplates] = useState<any>([])

  const BACKEND_URL = 'http://localhost:3000';
    let adminToken = localStorage.getItem('adminToken')
    
  const createElements = async () => {
    try {
      const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
        imageUrl,
        width,
        height,
        static: true
      }, {
        headers: { authorization: `Bearer ${adminToken}` }
      });
      const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
        imageUrl,
        width,
        height,
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
        dimensions:`${width}x${height}`,
        name,
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
        dimensions: `${width}x${height}`,
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
    console.log(template)
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
        width: item.width,
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
      <div>
        {templates.map((template:any, index:any) => (
          <div key={index}>
            <h2>{name[index]}</h2>
            <img
              src={imageUrl[index]} 
              alt={name[index]}
              width={width[index]} 
              height={height[index]} 
            />
            <button onClick={(e) => handleSubmit(e,template)}>{name[index]}</button>
            <img src={thumbnailUrl[index]} hidden/>
          </div>
        ))}
      </div>
    </div>
  )
};

export default CreateSpace;