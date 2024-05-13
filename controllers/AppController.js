const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

// status route controller
const getStatus = (req, res) => {
  if (redisClient.isAlive() && dbClient.isAlive()) {
    res.status(200).send({ redis: true, db: true });
  }
};

async function getStats(req, res) {
  const countUser = await dbClient.nbUsers();
  const countFiles = await dbClient.nbFiles();

  res.status(200).send({ users: countUser, files: countFiles });
}

module.exports = {
  getStatus,
  getStats,
};
