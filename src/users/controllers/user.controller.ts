import { Request, Response } from 'express';

import userMemoryDao from '../dao/user.memory.dao';
import { UserService } from './../services/user.service';

class UsersController {

  private readonly userService = new UserService(userMemoryDao);

  getAll = (
    req: Request,
    res: Response
  ): void => {
    const users = this.userService.findAll();
    res.status(200).json(users);
  }

  findById = (
    req: Request,
    res: Response
  ): void => {
    const user = this.userService.findById(req.params.id);
    res.status(200).json(user);
  }

  create = (
    req: Request,
    res: Response
  ): void => {
    const createdUser = this.userService.create(req.body);
    res.status(200).json(createdUser);
  }

  update = (
    req: Request,
    res: Response
  ): void => {
    const updatedUser = this.userService.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  }

  delete = (
    req: Request,
    res: Response
  ): void => {
    this.userService.delete(req.params.id);
    res.status(200).json();
  }

}

export default new UsersController;