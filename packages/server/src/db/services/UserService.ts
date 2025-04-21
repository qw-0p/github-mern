import * as userDal from '../dal/user';
import { v4 as uuidv4 } from 'uuid';
import { Token } from '../models';
import { generateAccessToken } from '../../utils/generate-access-token';

export const getByEmail = async (email: string) => {
  return userDal.getByEmail(email);
};

export const create = async (email: string, password: string) => {
  const user = await userDal.create(email, password);

  const tokens = await generateAccessToken(<string>user._id)

  return {
    user,
    tokens
  };
};


