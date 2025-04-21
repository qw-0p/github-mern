import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import * as tokenService from '../db/services/TokenService';

const JWT_SECRET = process.env.JWT_SECRET || "secret"

export const generateAccessToken = async (userId: string): Promise<{
  accessToken: string,
  refreshToken: string
}> =>  {
  const accessToken = generateJwt(<string>userId)
  const refreshToken = uuidv4()

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  await tokenService.create(
    userId,
    refreshToken,
    expiresAt
  )

  return {
    accessToken,
    refreshToken,
  }
}

export const generateJwt = (id: string): string =>  {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "15min" })
}
