import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import mongoConfig from '../../shared/config/mongo.config';

import BaseRepository from '../../shared/repository/base.repository';
import { User } from './../models/user.model';

interface CollectionConnection {
  client: MongoClient;
  collection: Collection;
}

class UserMongoRepository extends BaseRepository<User> {

  constructor() {
    super();
    this.initializeUsersCollection();
  }

  private async initializeUsersCollection(): Promise<void> {
    const client = mongoConfig.getConnection();
    await client.connect();
    const hasUserCollection = await client.db().listCollections({ name: 'users' }).hasNext();

    if (!hasUserCollection) {
      await this.createUsersCollection(client);
    }
  }

  async findAll(): Promise<User[]> {
    const { client, collection } = await this.getUsersCollection();

    const users = await collection.find().toArray();

    await client.close();

    return users;
  }

  async findById(id: string): Promise<User | undefined> {
    const { client, collection } = await this.getUsersCollection();

    const user = await collection.findOne({ _id: new ObjectId(id) });

    await client.close();

    return user || undefined;
  }

  async create(entity: User): Promise<User> {
    const { client, collection } = await this.getUsersCollection();

    const mongoEntity = { ...entity, _id: new ObjectId() };
    const { insertedId } = await collection.insertOne(mongoEntity);

    await client.close();

    return { ...entity, _id: insertedId.toHexString() };
  }

  async update(id: string, entity: User): Promise<User> {
    const { client, collection } = await this.getUsersCollection();

    const updatedUserResult = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...entity } },
      { returnDocument: 'after' }
    );

    const updatedUser = { ...updatedUserResult.value };

    await client.close();

    if (!updatedUser) {
      throw new Error('Can\'t find user to update.');
    }

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const { client, collection } = await this.getUsersCollection();

    await collection.deleteOne({ _id: new ObjectId(id) });

    await client.close();
  }

  private async getUsersCollection(): Promise<CollectionConnection> {
    const client = mongoConfig.getConnection();

    await client.connect();

    const collection = await client.db().collection('users');

    return { client, collection };
  }

  private createUsersCollection(client: MongoClient): Promise<Collection<User>> {
    return client.db().createCollection<User>('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [ 'firstName', 'email', 'password', 'permissionFlags' ],
          properties: {
            firstName: {
              bsonType: 'string',
              description: 'Must be a string and is required'
            },
            email: {
              bsonType: 'string',
              description: 'Must be a string and is required'
            },
            password: {
              bsonType: 'string',
              description: 'Must be a string and is required'
            },
            permissionFlags: {
              bsonType: 'int',
              description: 'Must be an integer and is required'
            },
            lastName: {
              bsonType: 'string',
              description: 'Must be a string if the field exists'
            }
          }
        }
      }
    });
  }

}

export default new UserMongoRepository();