import * as http from 'http';
import debug from 'debug';
import app, { routes } from './setup/app';
import { PORT, HOST } from './config/env';
import { CommonRoutesConfig } from './common/common.routes.config';
import logging from './setup/logging';
import startups from './setup/startup.setup';

//@ts-expect-error
const host: string = HOST;
const port = PORT;

const server: http.Server = http.createServer(app);
const debugLog: debug.IDebugger = debug('server');

logging();
startups();

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  debugLog(`Server running at ${host}:${port}!`);
});
