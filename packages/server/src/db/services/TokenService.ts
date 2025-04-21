import * as tokenDal from '../dal/token';

export const create = async (userId: string, refreshToken: string, expiresAt: Date) => {
  return tokenDal.create(userId, refreshToken, expiresAt);
};

export const deleteById = async (userId: string) => {
  return tokenDal.deleteOne(userId);
}

export const getByRefreshToken = async (refreshToken: string) => {
  return tokenDal.getByRefreshToken(refreshToken);
}

export const update = async (userId: string, refreshToken: string, expiresAt: Date) => {
  return tokenDal.update(userId, refreshToken, expiresAt);
}
