import { Request, Response } from 'express';
import { User } from '../models/user.model';

class UsersController {

  getAll(
    req: Request,
    res: Response
  ): void {
    const users: User[] = [
      {
        _id: 'a1b2c3d4f5g6h7i8j9k0',
        email: 'chris@mail.com',
        firstName: 'Christian',
        lastName: 'Gomes',
        permissionFlag: 1,
      }
    ];

    res.status(200).json(users);
  }

}

export default new UsersController;