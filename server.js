const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('Uncaught exception 💥');
  console.log(err);

  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const PORT = process.env.PORT || 8080;

console.log(process.env.NODE_ENV);

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ Successfully connected to database');
  });

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on('unhandledRejection', err => {
  console.log(`Unhandled rejection 💥`);
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});
