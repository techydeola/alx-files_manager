const express = require('express');
const indexRoute = require('./routes/index');

const PORT = process.env.PORT || 5000;

const app = express();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());

app.use('', indexRoute);
