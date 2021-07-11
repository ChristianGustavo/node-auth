import BaseRepository from '../../shared/repository/base.repository';
import { User } from '../models/user.model';

class UserMemoryRepository extends BaseRepository<User> {

  usersList: User[] = [];

  findAll(): Promise<User[]> {
    return Promise.resolve(this.usersList);
  }

  findById(id: string): Promise<User | undefined> {
    return Promise.resolve(this.usersList.find(user => user._id === id));
  }

  create(entity: User): Promise<User> {
    entity._id = (Date.now() + (Math.round(Math.random()) * 100)).toString();
    this.usersList.push(entity);

    return Promise.resolve(entity);
  }

  update(id: string, entity: User): Promise<User> {
    const index = this.usersList.findIndex(user => user._id === id);
    const user = this.usersList[index];
    const savedId = user?._id;
    const updatedUser = {
      ...user,
      ...entity,
      ...{ _id: savedId }
    };
    this.usersList.splice(index, 1, updatedUser);

    return Promise.resolve(updatedUser);
  }

  delete(id: string): Promise<void> {
    const index = this.usersList.findIndex(user => user._id === id);
    this.usersList.splice(index, 1);
    return Promise.resolve();
  }

}

export default new UserMemoryRepository();