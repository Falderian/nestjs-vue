import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.SERVER_PORT || 2000;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.listen(PORT, () => console.log(`Server is working on the ${PORT} port`));
}
bootstrap();
