import { AuthDto, RefreshTokenDto } from '../../dto/auth.dto';
import { generateAccessToken, generateJwt } from '../../../utils/generate-access-token';
import { v4 as uuidv4 } from "uuid"
import * as userService from '../../../db/services/UserService';
import * as tokenService from '../../../db/services/TokenService';


export const create = async (payload: AuthDto) => {
  const { password, email } = payload
  const existingUser = await userService.getByEmail(email)

  if (existingUser) {
    throw new Error('User already exists with this email')
  }

  return userService.create(email, password);
}

export const login = async (payload: AuthDto) => {
  const { password, email } = payload

  const user = await userService.getByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    throw new Error("Invalid credentials")
  }

  const tokens = await generateAccessToken(<string>user._id)

  return {
    user: {
      id: user._id,
      email: user.email,
    },
    ...tokens
  }
}

export const refreshToken = async (payload: RefreshTokenDto) => {
  const { refreshToken } = payload

  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  const tokenDoc = await tokenService.getByRefreshToken(refreshToken)
  if (!tokenDoc) {
    throw new Error("Invalid refresh token");
  }

  if (tokenDoc.expiresAt < new Date()) {
    await tokenService.deleteById(<string>tokenDoc._id)
    throw new Error("Refresh token expired");
  }

  const accessToken = generateJwt(tokenDoc.userId.toString())
  const newRefreshToken = uuidv4()

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  await tokenService.update(<string>tokenDoc._id, newRefreshToken, expiresAt)

  return {
    accessToken,
    newRefreshToken
  }
}

