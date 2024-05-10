const { MongoClient } = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '27017';
const database = process.env.DB_DATABASE || 'files_manager';

const uri = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    
    // connect to the database
    this.client.connect()
      .then(() => {
        this.db = this.client.db(`${database}`);
      })
      .catch((err) => console.error(err));
  };

  // checks if the mongodb connection is alive
  isAlive() {
    return this.client.isConnected();
  }

  // count number of document is the users collection
  async nbUsers() {
    const userCollection = this.db.collection('users');
    const count = await userCollection.countDocuments();

    return count;
  };

  // count number of document is the files collection
  async nbFiles() {
    const filesCollection = this.db.collection('files');
    const count = await filesCollection.countDocuments();

    return count;
  };
};

const dbClient = new DBClient();

module.exports = dbClient;
