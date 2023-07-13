import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string) {
  const SALT = 10;
  return bcrypt.hash(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hash) {
  return bcrypt.compare(rawPassword, hash);
}
