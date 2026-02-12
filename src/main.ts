import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const origins = process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:3000'];

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  setupSwagger(app);

  const port = process.env.PORT ?? 3001;
  const host = '0.0.0.0';
  await app.listen(port, host);

  logger.log(`Server running on http://${host}:${port}`);
}

void bootstrap();
