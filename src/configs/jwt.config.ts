import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

export const secret = process.env.JWT_SECRET;

export const JWTModule = JwtModule.register({
  secret,
  signOptions: { expiresIn: '1d' },
});
