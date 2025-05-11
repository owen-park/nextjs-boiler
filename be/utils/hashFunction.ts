import crypto from 'crypto';

export const createSalt = () => {
  return crypto.randomBytes(32).toString('base64');
};

export const createHash = (password: string, salt: string) => {
  return crypto.createHash('sha512').update(password + salt).digest('hex');
};
