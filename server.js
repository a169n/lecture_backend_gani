const express = require('express');
const bodyParser = require('body-parser');

const connectToDatabase = require('./database');
const organizationsRouter = require('./routes/organizations');
const usersRouter = require('./routes/users');
const storesRouter = require('./routes/stores');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/organizations', organizationsRouter);
app.use('/api/v1', usersRouter);
app.use('/api/v1', storesRouter);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
