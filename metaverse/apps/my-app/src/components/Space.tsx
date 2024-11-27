import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Layout, 
  MapPin, 
  Move, 
  Layers, 
  Settings,
  Trash2
} from 'lucide-react';

// Mock element types similar to Gather.town
const ELEMENT_TYPES = [
  { id: 'desk', name: 'Desk', icon: <Layers className="mr-2" />, width: 2, height: 1 },
  { id: 'chair', name: 'Chair', icon: <Move className="mr-2" />, width: 1, height: 1 },
  { id: 'wall', name: 'Wall', icon: <Layout className="mr-2" />, width: 1, height: 1 },
];

interface Item {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number
}

const Space = () => {
  const [spaces, setSpaces] = useState<any[]>([]);
  const [currentSpace, setCurrentSpace] = useState<Item[] | any>();
  //const [elements, setElements] = useState([]);
  const [selectedElementType, setSelectedElementType] = useState<Item[] | any>();

  // Create a new space
  const createSpace = () => {
    const newSpace = {
      id: `space-${Date.now()}`,
      name: `Space ${spaces.length + 1}`,
      dimensions: "20x20",
      elements: []
    };
    setSpaces(prev => [...prev, newSpace]);
    setCurrentSpace(newSpace);
  };

  // Add an element to the current space
  const addElement = () => {
    if (!currentSpace || !selectedElementType) return;

    const newElement = {
      id: `element-${Date.now()}`,
      type: selectedElementType.id,
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
      width: selectedElementType.width,
      height: selectedElementType.height
    };

    setSpaces(prev => prev.map(space => 
      space.id === currentSpace.id 
        ? {...space, elements: [...space.elements, newElement]} 
        : space
    ));

    setCurrentSpace(prev => prev ? {...prev, elements: [...prev.elements, newElement]} : null);
  };

  // Remove an element from the current space
  const removeElement = (elementId:any) => {
    setSpaces(prev => prev.map(space => 
      space.id === currentSpace.id 
        ? {...space, elements: space.elements.filter(el => el.id !== elementId)} 
        : space
    ));

    setCurrentSpace(prev => prev 
      ? {...prev, elements: prev.elements.filter(el => el.id !== elementId)} 
      : null
    );
  };

  // Delete a space
  const deleteSpace = (spaceId) => {
    setSpaces(prev => prev.filter(space => space.id !== spaceId));
    if (currentSpace?.id === spaceId) {
      setCurrentSpace(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <MapPin className="mr-2" /> Your Spaces
        </h2>
        
        {/* Create Space Button */}
        <button 
          onClick={createSpace}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4 flex items-center justify-center hover:bg-blue-600"
        >
          <PlusCircle className="mr-2" /> Create New Space
        </button>

        {/* Spaces List */}
        <div className="space-y-2">
          {spaces.map(space => (
            <div 
              key={space.id} 
              className={`p-2 rounded flex justify-between items-center cursor-pointer ${currentSpace?.id === space.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
              onClick={() => setCurrentSpace(space)}
            >
              <span>{space.name}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSpace(space.id);
                }}
                className="text-red-500 hover:bg-red-100 p-1 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Element Types */}
        {currentSpace && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2 flex items-center">
              <Settings className="mr-2" /> Add Elements
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {ELEMENT_TYPES.map(elementType => (
                <button
                  key={elementType.id}
                  onClick={() => setSelectedElementType(elementType)}
                  className={`p-2 rounded flex flex-col items-center ${
                    selectedElementType?.id === elementType.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {elementType.icon}
                  <span className="text-xs mt-1">{elementType.name}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={addElement}
              disabled={!selectedElementType}
              className="w-full mt-2 bg-green-500 text-white py-2 rounded disabled:bg-gray-300"
            >
              Add to Space
            </button>
          </div>
        )}
      </div>

      {/* Space Editor */}
      <div className="flex-grow p-8">
        {currentSpace ? (
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{currentSpace.name}</h1>
              <span className="text-gray-600">Dimensions: {currentSpace.dimensions}</span>
            </div>

            {/* Space Grid */}
            <div 
              className="grid gap-1 bg-gray-50 border"
              style={{
                gridTemplateColumns: `repeat(20, 1fr)`,
                gridTemplateRows: `repeat(20, 2rem)`,
                width: '100%',
                height: '40rem'
              }}
            >
              {currentSpace.elements.map(element => (
                <div
                  key={element.id}
                  className={`
                    bg-blue-200 border border-blue-400 rounded 
                    flex items-center justify-center relative
                    ${element.type === 'desk' ? 'bg-green-200 border-green-400' : ''}
                    ${element.type === 'chair' ? 'bg-purple-200 border-purple-400' : ''}
                  `}
                  style={{
                    gridColumn: `${element.x + 1} / span ${element.width}`,
                    gridRow: `${element.y + 1} / span ${element.height}`
                  }}
                >
                  <span className="text-xs">{element.type}</span>
                  <button 
                    onClick={() => removeElement(element.id)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Select or create a space to get started
          </div>
        )}
      </div>
    </div>
  );
};

export default Space;