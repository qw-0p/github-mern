import * as mongoose from 'mongoose';

export const createDatabase = async () => {
  await mongoose
    .connect('mongodb://localhost:27017/testdb')
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log(error));
};
