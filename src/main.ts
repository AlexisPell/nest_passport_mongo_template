import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import passport from 'passport';
import cookieSession from 'cookie-session';

// NOTE: SESSION
// import redis from 'redis';
// import session from 'express-session';
// import connectRedis from 'connect-redis';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Approach with express-session and redis
    // const RedisStorage = connectRedis(session);
    // const client = redis.createClient();
    // app.use(
    //   session({
    //     name: process.env.SESSION_NAME,
    //     secret: process.env.SESSION_SECRET,
    //     resave: false,
    //     saveUninitialized: false,
    //     store: new RedisStorage({
    //       host: process.env.HOST,
    //       port: Number(process.env.REDIS_PORT),
    //       client: client,
    //     }),
    //   }),
    // );

    // NOTE: req.session.passport.user === req.user (from passport)
    app.use(
      cookieSession({
        name: process.env.SESSION_NAME,
        keys: ['primary key', 'key for other ops'],
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(cookieParser());

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
