import { Token } from '../models';

export const create = async (userId: string, refreshToken: string, expiresAt: Date) => {
  await new Token({
    userId,
    refreshToken,
    expiresAt,
  }).save()
};

export const deleteOne = async (userId: string) => {
  return Token.deleteOne({ userId })
}

export const update = async (userId: string, refreshToken: string, expiresAt: Date) => {
  return Token.updateOne({ userId }, { refreshToken, expiresAt })
}


export const getByRefreshToken = async (refreshToken: string) => {
  return Token.findOne({ refreshToken })
}
