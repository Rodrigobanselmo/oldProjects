import { compare } from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

class BCryptProvider implements IHashProvider {
  async compare(password: string, hash_password: string): Promise<boolean> {
    return compare(password, hash_password);
  }
}

export { BCryptProvider };
