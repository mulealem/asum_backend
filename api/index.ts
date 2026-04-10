import '../src/runtime-paths';
import express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createApp } from '../src/app.factory';

let cachedServer: ReturnType<typeof express> | undefined;

async function getServer() {
  if (cachedServer) {
    return cachedServer;
  }

  const server = express();
  const app = await createApp(new ExpressAdapter(server));

  await app.init();

  cachedServer = server;

  return cachedServer;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const server = await getServer();

  return server(req, res);
}
