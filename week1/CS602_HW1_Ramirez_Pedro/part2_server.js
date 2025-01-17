import net from 'node:net';

import * as courseDB from './courseModule.js';
import { exit } from 'node:process';

const server = net.createServer((socket) => {
  console.log('Client connection...');

  socket.on('end', () => {
    console.log('Client disconnected...');
  });

  const handleCommand = (input) => {
    // Splitting it by comma, trimming the arguments, and destructuring the input
    const [command, arg] = input.split(',').map((part) => part.trim());

    switch (command) {
      case 'lookupByCourseId':
        return courseDB.lookupByCourseId(arg);
      case 'lookupByCourseName':
        return courseDB.lookupByCourseName(arg);
      case 'getRandomCourse':
        return courseDB.getRandomCourse();
      default:
        return 'Invalid request';
    }
  };

  // process data from client
  socket.on('data', (data) => {
    const input = data.toString();
    console.log('...Received server:', input);
    const result = handleCommand(input);

    socket.write(JSON.stringify(result, null, 2));
  });
});

// listen for client connections
server.listen(3000, () => {
  console.log('Listening for connections on port 3000');
});
