import { AuthDto } from '../../dto/auth.dto';
import { generateToken } from '../../../utils/generate-token';
import bcrypt from 'bcrypt';
import { User, Token } from '../../../db/models';


export const create = async (payload: AuthDto) => {
  const { password, email } = payload
  const user = await User.findOne({email})

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    throw new Error('Invalid credentials')
  }


}


export const loginUser = (req, res) => {
  res.send('user logged in')
}
