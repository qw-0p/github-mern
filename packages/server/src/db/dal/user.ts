import { User } from '../models';

export const create = async (email: string, password: string) => {
  const user = new User({ email, password });
  return user.save();
};

export const getByEmail = async (email: string) => {
  return User.findOne({ email });
};
