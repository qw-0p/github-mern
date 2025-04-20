import * as mongoose from 'mongoose';

export const createDatabase = async () => {
  await mongoose
    .connect('mongodb+srv://admin:admin@cluster0.2xzlgn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log(error));
};
