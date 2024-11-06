import { addGameSession } from '../sessions/game.session.js';
import { loadProtos } from './loadProto.js';
import { v4 as uuidv4 } from 'uuid';
const initServer = async () => {
  try {
    await loadProtos();
    const gameId = uuidv4();
    const gameSession = addGameSession(gameId);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default initServer;
