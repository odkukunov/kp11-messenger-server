import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');

@Injectable()
export class JwtService {
  public sign(obj: any) {
    return jwt.sign(obj, 'rubtid');
  }
}
