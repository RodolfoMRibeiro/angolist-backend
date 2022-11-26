import { Server } from '../adapter/server/server';
import { Load } from '../common/env/env';

Load();
const server = new Server();
server.Run();
