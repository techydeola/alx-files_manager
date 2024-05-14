import sha1 from 'sha1';
import { ObjectID } from 'mongodb';
// import Queue from 'bull';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

// adding new user controller
async function postNew(req, res) {
  const collection = dbClient.db.collection('users');
  const { email } = req.body;
  const { password } = req.body;

  // check if email exist
  if (!email) {
    res.status(400).json({ error: 'Missing email' });
    return;
  }
  if (!password) {
    res.status(400).json({ error: 'Missing password' });
    return;
  }

  // check if email already exist in the database
  const documents = await collection.find({ email }).toArray();
  if (documents.length !== 0) {
    res.status(400).json({ error: 'Already exist' });
    return;
  }

  // hash the password and create new user
  const hashPw = sha1(password);
  await collection.insertOne({ email, password: hashPw });
  const projection = { projection: { _id: 1, email: 1 } };
  const data = await collection.findOne({ email }, projection);
  res.status(201).send(data);
}

async function getMe(req, res) {
  const token = req.header('X-Token');
  const key = `auth_${token}`;
  const userId = await redisClient.get(key);
  if (userId) {
    const users = dbClient.db.collection('users');
    const idObject = new ObjectID(userId);
    users.findOne({ _id: idObject }, (err, user) => {
      if (user) {
        res.status(200).json({ id: userId, email: user.email });
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    });
  } else {
    console.log('Hupatikani!');
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  postNew,
  getMe,
};
