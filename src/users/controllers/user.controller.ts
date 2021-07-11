import { Request, Response } from 'express';

import userMongoRepository from '../repository/user.mongo.repository';
import { UserService } from './../services/user.service';

class UsersController {

  // private readonly userService = new UserService(userMemoryRepository); // With in memory list
  private readonly userService = new UserService(userMongoRepository); // With MongoDB

  getAll = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const users = await this.userService.findAll();
    res.status(200).json(users);
  }

  findById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const user = await this.userService.findById(req.params.id);
    res.status(200).json(user);
  }

  create = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const createdUser = await this.userService.create(req.body);
    res.status(200).json(createdUser);
  }

  update = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const updatedUser = await this.userService.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  }

  delete = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.userService.delete(req.params.id);
    res.status(200).json();
  }

}

export default new UsersController;