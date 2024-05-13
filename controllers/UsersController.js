const sha1 = require('sha1');
const dbClient = require('../utils/db');

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

module.exports = {
  postNew,
};
