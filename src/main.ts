import './runtime-paths';
import { createApp } from './app.factory';

async function bootstrap() {
  const app = await createApp();
  const port = Number(process.env.PORT || 3001);

  await app.listen(port);
}
bootstrap();
