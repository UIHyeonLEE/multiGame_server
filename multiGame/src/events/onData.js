import { PACKET_TYPE_LENGTH, TOTAL_LENGTH, PACKET_TYPE } from '../constants/header.js';
import { getHandlerById } from '../handler/index.js';
import { packetParser } from '../utils/parser/packetParser.js';
export const onData = (socket) => (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  console.log(data);

  const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;

  while (socket.buffer.length > totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(TOTAL_LENGTH);
    if (socket.buffer.length >= length) {
      const packet = socket.buffer.subarray(totalHeaderLength, length);
      socket.buffer = socket.buffer.subarray(length);
      try {
        switch (packetType) {
          case PACKET_TYPE.NORMAL: {
            const { handlerId, userId, payload } = packetParser(packet);
            const handler = getHandlerById(handlerId);

            handler({ socket, userId, payload });
          }
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      break;
    }
  }
};
