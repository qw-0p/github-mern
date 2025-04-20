import jwt, { Secret,  } from 'jsonwebtoken';

export const generateToken = (payload: Object): string => {
  return jwt.sign(payload, process.env.SECRET_KEY as Secret, {
    expiresIn: '24h'
  });
};
