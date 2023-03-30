import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config();

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger Doc configuration
  const config = new DocumentBuilder()
    .setTitle('Tontino BE Documentation')
    .setDescription('Backend API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  /**
   * Setting up global prefix
   */
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  /**
   * Enabling api versioning
   */
  app.enableVersioning({ type: VersioningType.URI });

  //Starting server
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}🔥`);
  });
}
bootstrap();
