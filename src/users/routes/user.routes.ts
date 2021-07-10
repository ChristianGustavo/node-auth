import { Application, Request, Response } from 'express';

import BaseRoutes from './../../shared/base.routes';

export default class UserRoutes extends BaseRoutes {
  constructor(
    protected app: Application,
  ) {
    super(app);
  }

  /** @Override */
  registerRoutes(): Application {
    this.app.route('/users')
      .get([
        (req: Request, res: Response) => {
          res.status(200).json([
            {
              _id: 'a1b2c3d4f5g6h7i8j9k0',
              email: 'chris@mail.com',
              firstName: 'Christian',
            },
          ]);
        },
      ]);

    return this.app;
  }
}
