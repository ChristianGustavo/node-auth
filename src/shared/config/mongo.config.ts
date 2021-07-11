import { MongoClient } from 'mongodb';

class MongoConfig {

  private readonly CONNECTION_STRING = process.env.MONGO_CONNECTION;

  getConnection(): MongoClient {
    if (!this.CONNECTION_STRING) {
      throw new Error('Mongo connection string can not be empty.');
    }

    return new MongoClient(this.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

}

export default new MongoConfig();