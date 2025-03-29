import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './auth.guard';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema,
  }]),
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule { }
