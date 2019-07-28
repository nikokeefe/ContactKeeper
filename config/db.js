const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURIv3');

const connectDB = async () => {
  try {
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      });

    console.log('MongoDB Connected...');
  } catch (error) {
    console.log('MongoDB NOT Connected...');
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
