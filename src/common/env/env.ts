import * as dotenv from 'dotenv';

export const Load = (): void => {
  dotenv.config({ path: __dirname + '/.env' });
};
