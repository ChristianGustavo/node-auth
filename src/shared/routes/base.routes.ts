import { Application } from 'express';

export default abstract class BaseRoutes {

  constructor(protected app: Application) { }

  abstract registerRoutes(): Application
}
