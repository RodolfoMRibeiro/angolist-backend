import { ApiRouter } from '../adapter/router/router';
import { Server } from '../adapter/server/server';
import { Env } from '../common/env/env';
import { Routes } from '../common/util/constants/constants';

Env.Load();
const server = new Server();
server.app.use(Routes.API, ApiRouter.getRouter());
console.log(Env.PORT);
server.start();
