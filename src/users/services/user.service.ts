import BaseRepository from '../../shared/repository/base.repository';
import { User } from '../models/user.model';

export class UserService {

  constructor(
    protected dao: BaseRepository<User>
  ) {}

  findAll(): User[] {
    return this.dao.findAll();
  }

  findById(id: string): User | undefined {
    return this.dao.findById(id);
  }

  create(user: User): User {
    return this.dao.create(user);
  }

  update(id: string, user: User): User {
    return this.dao.update(id, user);
  }

  delete(id: string): void {
    this.dao.delete(id);
  }

}
