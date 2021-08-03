import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');

    const config = new DocumentBuilder()
      .setTitle('NEST API Documentation')
      .setDescription('Nest Auth Template')
      .setVersion('1.0.0')
      .addTag('Based on passport, sure :)')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`api/v1/docs`, app, document);

    const PORT = process.env.PORT || 5000;
    await app.listen(PORT);
  } catch (error) {
    console.log('Global express error: ', error);
  }
}
bootstrap();
