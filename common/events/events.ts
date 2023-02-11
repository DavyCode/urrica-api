/**
 *  Use Pub/Sub layer to handle background event/processes
 * npm i event-dispatch
 * Allows to dispatch events across the application.
 */

import EventEmitter from 'events';
import debug from 'debug';

const log: debug.IDebugger = debug('app:event-background-process');

class ServerEventEmitter extends EventEmitter {}

const Pubsub = new ServerEventEmitter();

Pubsub.on('event', (info) => {
  log('an event occurred!', info);
});

Pubsub.on('error', (err) => {
  log('Log unknown error to logger/file', { err });
  log('Pubsub - whoops! there was an error');
});

export default Pubsub;
