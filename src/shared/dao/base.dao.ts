export default abstract class BaseDAO<T> {

  abstract findAll(): T[];
  abstract findById(id: string): T | undefined;
  abstract create(entity: T): T;
  abstract update(id: string, entity: T): T;
  abstract delete(id: string): void;

}