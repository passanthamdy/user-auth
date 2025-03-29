import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema,
  },
]),
],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
