import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ERROR_MESSAGES } from 'src/config/errors.config';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) { }


  async signup(signupDto: SignupDto): Promise<User> {
    const { name, email, password } = signupDto;
    //check if email already exist 
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException(ERROR_MESSAGES.user.ALREADY_EXISTS);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    return await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }


  async me(userId: string) : Promise<User | null> {
    return this.userModel.findById(userId, { password: 0 });
  }





}
