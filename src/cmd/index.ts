import { ApiRouter } from '../adapter/router/router';
import { Server } from '../adapter/server/server';
import { Env } from '../common/env/env';
import { ApiRoutes } from '../common/util/constants/routes';

Env.Load();
const server = new Server();
server.app.use(ApiRoutes.API, ApiRouter.GetRouter());
console.log(Env.PORT);
server.Start();
