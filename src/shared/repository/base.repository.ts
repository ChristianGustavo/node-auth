export default abstract class BaseRepository<T> {

  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T | undefined>;
  abstract create(entity: T): Promise<T>;
  abstract update(id: string, entity: T): Promise<T>;
  abstract delete(id: string): Promise<void>;

}