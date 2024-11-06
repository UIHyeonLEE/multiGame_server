import net from 'net';
import { PORT, HOST } from './constants/env.js';
import { onConnection } from './events/onConnection.js';
import initServer from './init/index.js';

const server = net.createServer(onConnection);

initServer()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`서버가 ${HOST}:${PORT}에서 실행중입니다.`);
      console.log(server.address());
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

server.maxConnections = 100;
