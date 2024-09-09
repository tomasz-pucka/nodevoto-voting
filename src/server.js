'use strict';

const api = require('./api');
const grpc = require('@grpc/grpc-js');
const logger = require('../lib/logger');
const Poll = require('./Poll');

const GRPC_PORT = process.env.GRPC_PORT !== 'undefined' ? process.env.GRPC_PORT : null;

if (GRPC_PORT) {
  const server = new grpc.Server();
  const poll = new Poll();

  api.newGrpcServer(server, poll).then(() => {
    server.bindAsync(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
		  console.error(`Could not start gRPC server on ${port}: ${error.message}`);
		  return;
      }

      console.log(`gRPC server started on port: ${port}`);
	  });
  });

} else {
  logger.error(`GRPC_PORT (currently [${GRPC_PORT}]) environment variable must me set to run the server.`);
  process.exit(1);
}
