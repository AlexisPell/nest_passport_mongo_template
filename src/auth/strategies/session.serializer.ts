import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(userJWT: any, done: Function): any {
    // console.log(
    //   '🚀 ~ file: session.serializer.ts ~ line 7 ~ SessionSerializer ~ serializeUser ~ userJWT',
    //   userJWT,
    // );
    done(null, userJWT);
  }
  deserializeUser(payloadJWT: any, done: Function): any {
    // console.log(
    //   '🚀 ~ file: session.serializer.ts ~ line 11 ~ SessionSerializer ~ deserializeUser ~ payloadJWT',
    //   payloadJWT,
    // );
    done(null, payloadJWT);
  }
}
