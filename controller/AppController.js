const dbClient = require('../utils/db.js');
const redisClient = require('../utils/redis.js');

// status route controller
const app_status = (req, res) => {
  if (redisClient.isAlive() && dbClient.isAlive()) {
    res.status(200).send({ "redis": true, "db": true });
  };
};

async function app_stats(req, res) {
  const count_user = await dbClient.nbUsers();
  const count_files = await dbClient.nbFiles();

  res.status(200).send({ "users": count_user, "files": count_files });
};

module.exports = {
  app_status,
  app_stats
};
