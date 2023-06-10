const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
});

const MelodyClass = require('../models/classModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection established');
  });

// Read JSON File
const classes = JSON.parse(
  fs.readFileSync(`${__dirname}/classesData.json`, 'utf8')
);

// Import Data Into DB
const importData = async () => {
  try {
    await MelodyClass.create(classes);
    console.log('Data Imported Successfully');
  } catch (err) {
    console.log('Failed to Import', err);
  }
  process.exit();
};

// Delete All Data From DB
const deleteData = async () => {
  try {
    await MelodyClass.deleteMany();
    console.log('Data Deleted Successfully');
  } catch (err) {
    console.log('Failed to Delete', err);
  }
  process.exit();
};

if (process.argv.includes('--import')) {
  importData();
} else if (process.argv.includes('--delete')) {
  deleteData();
}
console.log(process.argv);
