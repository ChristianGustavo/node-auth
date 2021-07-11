import BaseRepository from '../../shared/repository/base.repository';
import { User } from '../models/user.model';

export class UserService {

  constructor(
    protected dao: BaseRepository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.dao.findAll();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.dao.findById(id);
  }

  async create(user: User): Promise<User> {
    return this.dao.create(user);
  }

  async update(id: string, user: User): Promise<User> {
    return this.dao.update(id, user);
  }

  async delete(id: string): Promise<void> {
    this.dao.delete(id);
  }

}
