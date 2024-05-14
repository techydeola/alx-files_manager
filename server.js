import express from 'express';
import indexRoute from './routes/index';

const PORT = process.env.PORT || 5000;

const app = express();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());

// all request handler
app.use('', indexRoute);
