import BaseDAO from '../../shared/dao/base.dao';
import { User } from '../models/user.model';

class UserMemoryDAO extends BaseDAO<User> {

  usersList: User[] = [];

  findAll(): User[] {
    return this.usersList;
  }

  findById(id: string): User | undefined {
    return this.usersList.find(user => user._id === id);
  }

  create(entity: User): User {
    entity._id = (Date.now() + (Math.round(Math.random()) * 100)).toString();
    this.usersList.push(entity);

    return entity;
  }

  update(id: string, entity: User): User {
    const index = this.usersList.findIndex(user => user._id === id);
    const user = this.usersList[index];
    const savedId = user?._id;
    const updatedUser = {
      ...user,
      ...entity,
      ...{ _id: savedId }
    };
    this.usersList.splice(index, 1, updatedUser);

    return updatedUser;
  }

  delete(id: string): void {
    const index = this.usersList.findIndex(user => user._id === id);
    this.usersList.splice(index, 1);
  }

}

export default new UserMemoryDAO();