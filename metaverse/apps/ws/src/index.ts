import { WebSocketServer } from 'ws';
import { User } from './User';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function connection(ws) {
  let user = new User(ws);

  ws.on('open', function message() {
    user = new User(ws);
  });

  ws.on('close', () => {
    user?.destroy();
  })
});