import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

/// Encrypting password
export const hashPwd = async (pwd: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pwd, salt);
};

/// Decrypt the password
export const comparePwd = async (bodyPwd: string, dbPwd: string) => {
  return await bcrypt.compare(bodyPwd, dbPwd);
};

//Generate token
export const generateToken = (id: string, role: Role) => {
  const secret = process.env.JWT_TOKEN_SECRET || 'tontino-jwt-secret';
  return jwt.sign({ userId: id, role }, secret, {
    expiresIn: '5 days',
  });
};

/// Verifying jwt token
export function verifyToken(token: string): jwt.JwtPayload {
  const verify = jwt.verify(
    token,
    process.env.JWT_TOKEN_SECRET || 'tontino-jwt-secret',
  );
  return verify as jwt.JwtPayload;
}
