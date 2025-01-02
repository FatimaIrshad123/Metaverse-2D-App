import React, { useEffect, useState } from "react";

export default function Game123 () {
  const [currentUser, setCurrentUser] = useState<any>({});
    const [users, setUsers] = useState(new Map());
  const ws = React.useRef<any>();
  
useEffect (() => {
  let token = localStorage.getItem('token')
  let spaceId = localStorage.getItem('spaceId')
  let userId = localStorage.getItem('userId')
  ws.current = new WebSocket('ws://localhost:3001');

  if (!token || !spaceId || !userId) {
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
        userId
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
    let userId = message.payload.users.map((user: { id: string }) => user.id)
    console.log('userId',userId)
    switch (message.type) {
      case 'space-joined':
        
        console.log({
            x: message.payload.spawn.x,
            y: message.payload.spawn.y,
            userId: userId
          })
        setCurrentUser({
          x: message.payload.spawn.x,
          y: message.payload.spawn.y,
          userId: userId
        });
        const userMap = new Map();
        message.payload.users.forEach((user: any) => {
          userMap.set(user.id, user);
        });
        setUsers(userMap);
        break;

      case 'user-joined':
        setUsers(prev => {
          const newUsers = new Map(prev);
          newUsers.set(message.payload.userId, {
            x: message.payload.x,
            y: message.payload.y,
            userId: message.payload.userId
          });
          return newUsers;
        });
        break;

      case 'movement':
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
        setCurrentUser((prev: any) => ({
          ...prev,
          x: message.payload.x,
          y: message.payload.y
        }));
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

  return (
    <div>
    
    </div>
  )
}