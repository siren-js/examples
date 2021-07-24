declare namespace Express {
  export interface Request {
    context: RequestContext;
  }

  export interface RequestContext {
    absoluteUrl: string;
    baseUrl: string;
  }
}
