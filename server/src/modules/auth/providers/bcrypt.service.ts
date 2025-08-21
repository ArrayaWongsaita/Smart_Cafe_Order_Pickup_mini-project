import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = 12;
  }

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  compare(string: string, hashString: string): Promise<boolean> {
    return bcrypt.compare(string, hashString);
  }
}
