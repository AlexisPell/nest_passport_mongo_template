import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// NOTE: SESSION
// import passport from 'passport';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import * as Redis from 'ioredis';
// import * as connectRedis from 'connect-redis';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // NOTE: SESSION
    // const RedisStore = connectRedis(session);
    // const redis = new Redis();
    // app.use(
    //   session({
    //     name: process.env.SESSION_NAME,
    //     secret: process.env.SESSION_SECRET,
    //     resave: false,
    //     saveUninitialized: false,
    //     cookie: { maxAge: 3600000, httpOnly: true }, // 1 hour
    //     store: MongoStore.create({
    //       mongoUrl: process.env.MONGODB_URI,
    //       mongoOptions: { useUnifiedTopology: true },
    //     }),
    //     store: new RedisStore({
    //       client: redis,
    //       disableTouch: true,
    //     }),
    //   }),
    // );
    // app.use(passport.initialize());
    // app.use(passport.session());

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
