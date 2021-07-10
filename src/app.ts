import express, { Application } from 'express';

import BaseRoutes from './shared/base.routes';
import UserRoutes from './users/routes/user.routes';

class App {
  constructor(
    private app: Application,
    private routes: BaseRoutes[]
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.routes.forEach(route => route.registerRoutes());
  }

  startServerListening() {
    return this.app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  }
}

const app = express();
export default new App(app, [ new UserRoutes(app) ]).startServerListening();

