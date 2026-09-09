const mongoose = require("mongoose");
const logger = require('./logger');

mongoose.connection.on('disconnected', () => logger.warn({ event: 'database.disconnected' }, 'MongoDB disconnected'));
mongoose.connection.on('reconnected', () => logger.info({ event: 'database.reconnected' }, 'MongoDB reconnected'));
mongoose.connection.on('error', err => logger.error({ err, event: 'database.error' }, 'MongoDB connection error'));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info({ event: 'database.connected' }, 'MongoDB connected');
  } catch (error) {
    logger.fatal({ err: error, event: 'database.connection_failed' }, 'Unable to connect to MongoDB');
    process.exit(1);
  }
};

module.exports = connectDB;
