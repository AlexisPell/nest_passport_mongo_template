declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: number;
    MONGODB_URI?: string;
    SESSION_SECRET?: string;
    SESSION_NAME?: string;
  }
}
