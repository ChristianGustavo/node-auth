import { User } from '../models/user.model';
import userMemoryDAO from './user.memory.repository';

describe('UserMemoryDAO', () => {

  let generatedId: string;
  const user: User = {
    email: 'chris@email.com',
    firstName: 'Christian',
    lastName: 'Gomes',
    permissionFlag: 1
  };

  it('should return a list of users' , () => {
    const users = userMemoryDAO.findAll();

    expect(Array.isArray(users)).toBeTruthy();
  });

  it('should create an user and return it', () => {
    const oldLength = userMemoryDAO.findAll().length;
    const createdUser = userMemoryDAO.create(user);
    const newLength = userMemoryDAO.findAll().length;

    generatedId = createdUser._id || '';

    expect(createdUser.email).toEqual(user.email);
    expect(createdUser._id).toBeTruthy();
    expect(newLength).toEqual(oldLength + 1);
  });

  it('should update an user and return it', () => {
    const updateToThisUser = { firstName: 'Gustavo', lastName: 'Ribeiro', permissionFlag: 1, email: 'test@mail.com' };

    const oldLength = userMemoryDAO.findAll().length;
    const updatedUser = userMemoryDAO.update(generatedId, updateToThisUser);
    const newLength = userMemoryDAO.findAll().length;

    expect(updatedUser.firstName).toEqual(updateToThisUser.firstName);
    expect(updatedUser.lastName).toEqual(updateToThisUser.lastName);
    expect(updatedUser.permissionFlag).toEqual(updateToThisUser.permissionFlag);
    expect(updatedUser.email).toEqual(updateToThisUser.email);
    expect(updatedUser._id).toBe(generatedId);
    expect(newLength).toEqual(oldLength);
  });

  it('should retrieve an user by id', () => {
    const user = userMemoryDAO.findById(generatedId);

    expect(user).toBeDefined();
  });

  it('should delete an user by id', () => {
    const oldLength = userMemoryDAO.findAll().length;
    userMemoryDAO.delete(generatedId);
    const newLength = userMemoryDAO.findAll().length;

    expect(user).toBeDefined();
    expect(newLength).toBe(oldLength - 1);
  });
});