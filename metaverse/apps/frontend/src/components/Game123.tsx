import { useEffect, useState, useCallback } from 'react';
import { User, Wifi, WifiOff, Users } from 'lucide-react';

const Game123 = () => {
  const [users, setUsers] = useState(new Map());
  const [currentUser, setCurrentUser] = useState<any>();
  const [ws, setWs] = useState<any>();
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapElements, setMapElements] = useState<any>();
  const [userCount, setUserCount] = useState(0);
  const [params, setParams] = useState({ token: '', spaceId: '' });
  
  // Constants from the test
  const SPACE_WIDTH = 100;
  const SPACE_HEIGHT = 200;

  // Mock map elements from test
  const defaultElements = [
    { elementId: 'element1', x: 20, y: 20 },
    { elementId: 'element1', x: 18, y: 20 },
    { elementId: 'element2', x: 19, y: 20 }
  ];

  const handleKeyPress = useCallback((e) => {
    const keyMoves = {
      'ArrowUp': [0, -1],
      'ArrowDown': [0, 1],
      'ArrowLeft': [-1, 0],
      'ArrowRight': [1, 0]
    };

    if (keyMoves[e.key]) {
      e.preventDefault();
      handleMove(...keyMoves[e.key]);
    }
  }, []);

  useEffect(() => {
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || '';
    const spaceId = urlParams.get('spaceId') || '';
    setParams({ token, spaceId });
console.log(params)

    const socket = new WebSocket('ws://localhost:3001');
    
    socket.onopen = () => {
      setConnected(true);
      setError(null);
      socket.send(JSON.stringify({
        type: 'join',
        payload: {
          spaceId: 'test-space',
          token: 'mock-token'
        }
      }));
    };

    socket.onclose = () => {
      setConnected(false);
      setError('Connection lost. Attempting to reconnect...');
    };
    
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      switch (message.type) {
        case 'space-joined':
            console.log('message.payload',message.payload)
          setCurrentUser({
            id: message.payload.userId,
            x: message.payload.spawn.x,
            y: message.payload.spawn.y
          });
          setMapElements(defaultElements);
          const initialUsers = new Map();
          message.payload.users.forEach((user:any) => {
            initialUsers.set(user.userId, { x: user.x, y: user.y });
          });
          setUsers(initialUsers);
          setUserCount(message.payload.users.length + 1);
          break;
          
        case 'user-joined':
          setUsers(prev => {
            const next = new Map(prev);
            next.set(message.payload.userId, {
              x: message.payload.x,
              y: message.payload.y
            });
            return next;
          });
          setUserCount(prev => prev + 1);
          break;
          
        case 'movement':
          setUsers(prev => {
            const next = new Map(prev);
            next.set(message.payload.userId, {
              x: message.payload.x,
              y: message.payload.y
            });
            return next;
          });
          break;
          
        case 'movement-rejected':
          setError('Movement rejected - Invalid position');
          setTimeout(() => setError(null), 2000);
          break;
          
        case 'user-left':
          setUsers(prev => {
            const next = new Map(prev);
            next.delete(message.payload.userId);
            return next;
          });
          setUserCount(prev => prev - 1);
          break;
      }
    };
    
    setWs(socket);
    
    return () => {
      socket.close();
    };
  }, []);
  
  const handleMove = (dx:any, dy:any) => {
    if (!currentUser || !ws) return;
    
    const newX = currentUser.x + dx;
    const newY = currentUser.y + dy;
    
    // Validate movement
    if (
      newX < 0 || newX >= SPACE_WIDTH ||
      newY < 0 || newY >= SPACE_HEIGHT ||
      Math.abs(dx) > 1 || Math.abs(dy) > 1
    ) {
      setError('Invalid movement - Out of bounds or too far');
      setTimeout(() => setError(null), 2000);
      return;
    }

    // Check collision with map elements
    const hasCollision = mapElements.some((element:any) => 
      element.x === newX && element.y === newY
    );

    if (hasCollision) {
      setError('Invalid movement - Blocked by obstacle');
      setTimeout(() => setError(null), 2000);
      return;
    }
    
    ws.send(JSON.stringify({
      type: 'move',
      payload: {
        x: newX,
        y: newY
      }
    }));

    // Optimistically update current user position
    setCurrentUser((prev:any) => ({
      ...prev,
      x: newX,
      y: newY
    }));
  };
  
  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {connected ? (
            <>
              <Wifi className="text-green-500" />
              <span className="text-green-500 font-medium">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="text-red-500" />
              <span className="text-red-500 font-medium">Disconnected</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Users className="text-gray-500" />
          <span className="text-gray-600 font-medium">{userCount} users online</span>
        </div>
      </div>

      {error && (
        <div className="mb-4">
          <div>{error}</div>
        </div>
      )}
      
      <div 
        className="relative bg-gray-100 border border-gray-300 rounded-lg shadow-inner"
        style={{
          width: '100%',
          height: '500px',
          overflow: 'hidden'
        }}
      >
        {/* Map elements */}
        {mapElements?.map((element:any, index:any) => (
          <div
            key={`${element.elementId}-${index}`}
            className="absolute bg-gray-400 rounded"
            style={{
              left: `${(element.x / SPACE_WIDTH) * 100}%`,
              top: `${(element.y / SPACE_HEIGHT) * 100}%`,
              width: '16px',
              height: '16px',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}

        {/* Current user */}
        {currentUser && (
          <div
            className="absolute transition-all duration-200"
            style={{
              left: `${(currentUser.x / SPACE_WIDTH) * 100}%`,
              top: `${(currentUser.y / SPACE_HEIGHT) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative">
              <User className="h-8 w-8 text-blue-500" />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-100 px-2 py-0.5 rounded text-xs font-medium">
                You
              </div>
            </div>
          </div>
        )}
        
        {/* Other users */}
        {Array.from(users.entries()).map(([userId, position]) => (
          <div
            key={userId}
            className="absolute transition-all duration-200"
            style={{
              left: `${(position.x / SPACE_WIDTH) * 100}%`,
              top: `${(position.y / SPACE_HEIGHT) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <User className="h-8 w-8 text-gray-500" />
          </div>
        ))}
      </div>
      
      {/* Movement controls */}
      <div className="mt-6 grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
        <div />
        <button 
          className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
          onClick={() => handleMove(0, -1)}
        >
          ↑
        </button>
        <div />
        <button
          className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
          onClick={() => handleMove(-1, 0)}
        >
          ←
        </button>
        <div className="p-3 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
          WASD or<br/>Arrow Keys
        </div>
        <button
          className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
          onClick={() => handleMove(1, 0)}
        >
          →
        </button>
        <div />
        <button
          className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
          onClick={() => handleMove(0, 1)}
        >
          ↓
        </button>
        <div />
      </div>
    </div>
  );
};

export default Game123;