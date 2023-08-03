import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

export const JWTModule = JwtModule.register({
  secret,
  signOptions: { expiresIn: '60s' },
});
