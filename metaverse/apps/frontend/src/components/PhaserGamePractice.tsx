import { useEffect, useRef } from "react";
import Phaser from 'phaser';

const sizes = {
  width: 1000,
  height: 800,
};

class GameScene extends Phaser.Scene {
  avatar!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  otherPlayers!: Phaser.Physics.Arcade.Group;
  users!: Map<string, any>;
  ws: WebSocket;
  currentUser: any;
  
  constructor(ws: WebSocket) {
    super('GameScene');
    this.ws = ws; // Pass the WebSocket instance
    this.users = new Map();
    this.currentUser = null;
    this.users = new Map();
  }

  preload() {
    this.load.image('avatar', '/avatar.png');
    this.load.image('background', 'https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/N4XpyYnWRAiFz9CP/jDBuCZ53Lz9AwEGxROt7m4');
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    this.avatar = this.physics.add.sprite(sizes.width / 2, sizes.height / 2, 'avatar');
    this.avatar.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard!.createCursorKeys() ?? undefined;

    this.otherPlayers = this.physics.add.group();

    let token = localStorage.getItem('token')
  let spaceId = localStorage.getItem('spaceId')
 
    this.ws = new WebSocket('ws://localhost:3001');

  if (!token || !spaceId) {
    console.error('Missing token, spaceId, or userId in localStorage');
    return;
  }

  this.ws.onopen = () => {
      console.log('Connected')
    this.ws.send(JSON.stringify({
      type: 'join',
      payload: {
        spaceId,
        token,
      }
    }));
  };

  this.ws.onmessage = (event: any) => {
    const message = JSON.parse(event.data);
    console.log('message',message)
    this.handleWebSocketMessage(message)
  };
  
  return () => {
    if (this.ws) {
      this.ws.close();
    }
  };
}

  update() {
    const speed = 200;

    if (this.cursors?.left?.isDown) {
      this.avatar.setVelocityX(-speed);
      this.sendMovement(this.avatar.x - 1, this.avatar.y);
    } else if (this.cursors?.right?.isDown) {
      this.avatar.setVelocityX(speed);
      this.sendMovement(this.avatar.x + 1, this.avatar.y);
    } else {
      this.avatar.setVelocityX(0);
    }

    if (this.cursors?.up?.isDown) {
      this.avatar.setVelocityY(-speed);
      this.sendMovement(this.avatar.x, this.avatar.y - 1);
    } else if (this.cursors?.down?.isDown) {
      this.avatar.setVelocityY(speed);
      this.sendMovement(this.avatar.x, this.avatar.y + 1);
    } else {
      this.avatar.setVelocityY(0);
    }
  }

  sendMovement(x: number, y: number) {
    this.ws.send(JSON.stringify({
      type: 'move',
      payload: { x, y },
    }));
  }

  handleWebSocketMessage(message: any) {
    switch (message.type) {
      case 'space-joined':
        this.currentUser = {
          x: message.payload.spawn.x,
          y: message.payload.spawn.y,
          userId: message.payload.spawn.id,
        };
        message.payload.users.forEach((user: any) => {
          this.users.set(user.id, {
            x: message.payload.spawn.x,
            y: message.payload.spawn.y,
            userId: user.id,
          });
        });
        console.log('this.currentUser',this.currentUser)
        this.updatePlayers();
        break;

      case 'user-joined':
        this.users.set(message.payload.userId, {
          x: message.payload.x,
          y: message.payload.y,
          userId: message.payload.userId,
        });
        this.updatePlayers();
        break;

      case 'movement':
        console.log('movement')
        const user = this.users.get(message.payload.userId);
        if (user) {
          user.x = message.payload.x;
          user.y = message.payload.y;
          this.users.set(message.payload.userId, user);
        }
        this.updatePlayers();
        break;

      case 'movement-rejected':
        console.log('movement-rejected')
        this.currentUser = {
          ...this.currentUser,
          x: message.payload.x,
          y: message.payload.y,
        };
        this.updatePlayers();
        break;

      case 'user-left':
        this.users.delete(message.payload.userId);
        this.updatePlayers();
        break;
    }
  }

  handleMove = (newX: any, newY: any) => {
    if (!this.currentUser) return;
    console.log('handlemove', newX, newY)
    const xDisplacement = Math.abs(this.currentUser.x - newX);
    const yDisplacement = Math.abs(this.currentUser.y - newY);

    if ((xDisplacement === 1 && yDisplacement === 0) || (xDisplacement === 0 && yDisplacement === 1)) {
      this.ws.send(JSON.stringify({
          type: 'move',
          payload: { x: newX, y: newY }
      }));
  } else {
      console.warn('Invalid move attempted:', { x: newX, y: newY });
  }
  };

  updatePlayers() {
    // Logic to update avatars and positions in the Phaser scene
    console.log('Updating players:', this.users);
  }


}
  /*handleWebSocketMessage = (message: any) => {
    
    switch (message.type) {
      case 'space-joined':
        this.currentUser({
          x: message.payload.spawn.x,
          y: message.payload.spawn.y,
          userId: message.payload.spawn.id
        })
        const userMap = new Map([...this.users]);
        message.payload.users.forEach((user: any) => {
          console.log('user123',user)
          userMap.set(user.id,{
            x: message.payload.spawn.x,
            y: message.payload.spawn.y,
            userId: user.id
          });
        });
        console.log('currentUser',this.currentUser)
        this.users(userMap);
        console.log('users',this.users)
        console.log('usersMap',userMap)
        break;

      case 'user-joined':
        this.users((prev:any) => {
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
        this.users((prev:any) => {
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
        this.currentUser((prev: any) => ({
          ...prev,
          x: message.payload.x,
          y: message.payload.y
        }));
        console.log('currentUser123',this.currentUser)
        break;

      case 'user-left':
        this.users((prev:any) => {
          const newUsers = new Map(prev);
          newUsers.delete(message.payload.userId);
          return newUsers;
        });
        break;
    }
  };
  handleWebSocketMessage(message: any) {
    switch (message.type) {
      case 'user-joined':
        const newPlayer = this.otherPlayers.create(message.payload.x, message.payload.y, 'avatar');
        console.log('newPlayer',newPlayer)
        this.users.set(message.payload.userId, { x: message.payload.x, y: message.payload.y, userId: message.payload.userId });
        break;

      case 'movement':
        const user = this.users.get(message.payload.userId);
        if (user) {
          user.x = message.payload.x;
          user.y = message.payload.y;

          const player = this.otherPlayers.getChildren().find((p: any) => p.userId === user.userId);
          if (player) {
            console.log(player)
          }
        }
        break;

      case 'user-left':
        this.users.delete(message.payload.userId);
        const playerToRemove = this.otherPlayers.getChildren().find((p: any) => p.userId === message.payload.userId);
        if (playerToRemove) {
          playerToRemove.destroy();
        }
        break;
    }
  }*/


const PhaserGamePractice: React.FC<{ ws: WebSocket }> = ({ ws }) => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: sizes.width,
      height: sizes.height,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: true,
        },
      },
      scene: [new GameScene(ws)], // Pass WebSocket instance
      parent: gameContainerRef.current ?? undefined,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [ws]);

  return <div ref={gameContainerRef} style={{ width: sizes.width, height: sizes.height }} >
    <div className="p-4" tabIndex={0}>
        <h1 className="text-2xl font-bold mb-4">Arena</h1>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Token: </p>
          <p className="text-sm text-gray-600">Space ID: </p>
          <p className="text-sm text-gray-600">Connected Users: </p>
        </div>
        <div className="border rounded-lg overflow-hidden">
          
        </div>
        <p className="mt-2 text-sm text-gray-500">Use arrow keys to move your avatar</p>
    </div>
  </div>;
};

export default PhaserGamePractice;