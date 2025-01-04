import React, { useEffect, useRef, useState } from "react";

export default function Game123 () {
  const canvasRef = useRef<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState(new Map());

  let token = localStorage.getItem('token')
  let spaceId = localStorage.getItem('spaceId')
  const ws = React.useRef<any>();

useEffect (() => {
  let token = localStorage.getItem('token')
  let spaceId = localStorage.getItem('spaceId')
 
  ws.current = new WebSocket('ws://localhost:3001');

  if (!token || !spaceId) {
    console.error('Missing token, spaceId, or userId in localStorage');
    return;
  }

  ws.current.onopen = () => {
      console.log('Connected')
    ws.current.send(JSON.stringify({
      type: 'join',
      payload: {
        spaceId,
        token,
      }
    }));
  };

  ws.current.onmessage = (event: any) => {
    const message = JSON.parse(event.data);
    console.log('message',message)
    handleWebSocketMessage(message)
  };
  
  return () => {
    if (ws.current) {
      ws.current.close();
    }
  };
  }, []);

  const handleWebSocketMessage = (message: any) => {
    
    switch (message.type) {
      case 'space-joined':
        setCurrentUser({
          x: message.payload.spawn.x,
          y: message.payload.spawn.y,
          userId: message.payload.spawn.id
        })
        const userMap = new Map([...users]);
        message.payload.users.forEach((user: any) => {
          console.log('user123',user)
          userMap.set(user.id,{
            x: message.payload.spawn.x,
            y: message.payload.spawn.y,
            userId: user.id
          });
        });
        console.log('currentUser',currentUser)
        setUsers(userMap);
        console.log('users',users)
        console.log('usersMap',userMap)
        break;

      case 'user-joined':
        setUsers(prev => {
          const newUsers = new Map(prev);
          newUsers.set(message.payload.userId, {
            x: message.payload.x,
            y: message.payload.y,
            userId: message.payload.id
          });
          return newUsers;
        });
        break;

      case 'movement':
        console.log('movement')
        setUsers(prev => {
          const newUsers = new Map(prev);
          const user = newUsers.get(message.payload.userId);
          if (user) {
            user.x = message.payload.x;
            user.y = message.payload.y;
            newUsers.set(message.payload.userId, user);
          }
          return newUsers;
        });
        break;

      case 'movement-rejected':
        console.log('movement-rejected',message.payload)
        setCurrentUser((prev: any) => ({
          ...prev,
          x: message.payload.x,
          y: message.payload.y
        }));
        console.log('currentUser123',currentUser)
        break;

      case 'user-left':
        setUsers(prev => {
          const newUsers = new Map(prev);
          newUsers.delete(message.payload.userId);
          return newUsers;
        });
        break;
    }
  };
  
  
  const handleMove = (newX: any, newY: any) => {
    if (!currentUser) return;
    console.log('handlemove', newX, newY)
    const xDisplacement = Math.abs(currentUser.x - newX);
    const yDisplacement = Math.abs(currentUser.y - newY);

    if ((xDisplacement === 1 && yDisplacement === 0) || (xDisplacement === 0 && yDisplacement === 1)) {
      ws.current.send(JSON.stringify({
          type: 'move',
          payload: { x: newX, y: newY }
      }));
  } else {
      console.warn('Invalid move attempted:', { x: newX, y: newY });
  }
  };
console.log('currentUser.userId',users)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#eee';
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    if (currentUser && currentUser.x) {
      ctx.beginPath();
      ctx.fillStyle = '#FF6B6B';
      ctx.arc(currentUser.x * 50, currentUser.y * 50, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('You', currentUser.x * 50, currentUser.y * 50 + 40);
    }

    // Draw other users
    users.forEach(user => {
      console.log('userabcd',user)
    if (!user.x) {
      console.log('after')
        return
    }
    console.log('before')
      ctx.beginPath();
      ctx.fillStyle = '#4ECDC4';
      ctx.arc(user.x * 50, user.y * 50, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`User ${user.userId}`, user.x * 50, user.y * 50 + 40);
    });
  }, [currentUser, users]);


  const handleKeyDown = (e: any) => {
    if (!currentUser) return;

    const { x, y } = currentUser;
    switch (e.key) {
      case 'ArrowUp':
        handleMove(x, y - 1);
        break;
      case 'ArrowDown':
        handleMove(x, y + 1);
        break;
      case 'ArrowLeft':
        handleMove(x - 1, y);
        break;
      case 'ArrowRight':
        handleMove(x + 1, y);
        break;
    }
  };
  
  return (
    <div className="p-4" onKeyDown={handleKeyDown} tabIndex={0}>
        <h1 className="text-2xl font-bold mb-4">Arena</h1>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Token: {token}</p>
          <p className="text-sm text-gray-600">Space ID: {spaceId}</p>
          <p className="text-sm text-gray-600">Connected Users: {users.size}</p>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={1500}
            height={1500}
            className="bg-white"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">Use arrow keys to move your avatar</p>
    </div>
  )
}