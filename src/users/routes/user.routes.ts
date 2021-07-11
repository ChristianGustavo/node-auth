import { Application } from 'express';

import userController from '../controllers/user.controller';
import BaseRoutes from '../../shared/routes/base.routes';

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
        userController.getAll
      ])
      .post([
        userController.create
      ]);

    this.app.route('/users/:id')
      .get([
        userController.findById
      ])
      .put([
        userController.update
      ])
      .delete([
        userController.delete
      ]);
      

    return this.app;
  }
}
