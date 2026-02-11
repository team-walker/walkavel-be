import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService);
  const oauth2RedirectUrl = configService.get<string>(
    'SWAGGER_OAUTH2_REDIRECT_URL',
    'http://localhost:3001/docs/oauth2-redirect.html',
  );

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Walkavel API 명세서입니다.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
    swaggerOptions: {
      persistAuthorization: true,
      oauth2RedirectUrl,
    },
  });
}
