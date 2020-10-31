import { PasswordEncryptor } from '../../../domain/password/password-encryptor';
import * as bcrypt from 'bcrypt';

export class BcryptEncryptor implements PasswordEncryptor {
  async encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validate(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
