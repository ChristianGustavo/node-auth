import express, { Application } from 'express';

import BaseRoutes from './shared/routes/base.routes';
import UserRoutes from './users/routes/user.routes';

class App {

  private readonly port = process.env.PORT || 3000;

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
    return this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

const app = express();

app.use(express.json());

export default new App(app, [ new UserRoutes(app) ]).startServerListening();

