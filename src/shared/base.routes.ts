import { Application } from 'express';

export default abstract class BaseRoutes {

  constructor(protected app: Application) {
    this.registerRoutes()
  }

  abstract registerRoutes(): Application
}
