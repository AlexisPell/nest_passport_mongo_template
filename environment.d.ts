declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    HOST?: string;
    REDIS_PORT?: string;
    MONGODB_URI?: string;
    SESSION_SECRET?: string;
    SESSION_NAME?: string;
  }
}
