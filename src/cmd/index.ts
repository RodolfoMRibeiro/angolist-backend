import { ApiRouter } from '../adapter/router/router';
import { Server } from '../adapter/server/server';
import { Env } from '../common/env/env';

Env.Load();
const server = new Server();
server.app.use('/api', ApiRouter.getRouter());
server.start();
