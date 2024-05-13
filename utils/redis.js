import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    // initialize the redis client
    this.client = createClient();

    // event listener for erros
    this.client.on('error', (err) => {
      console.log(err);
    });
  }

  // check the redis connection
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  // get value from redis
  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const value = await redisGet(key);
    return value;
  }

  // stores data to redis
  async set(key, value, duration) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, value);
    await this.client.expire(key, duration);
  }

  // delete from the redis database
  async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);
    redisDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
