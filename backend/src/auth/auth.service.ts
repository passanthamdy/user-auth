import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUserDto } from 'src/user/dto/auth-user.dto.ts';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '../config/errors.config';
import { IAuth } from 'src/common/interfaces/auth.interface';
import { TokenPayload } from 'src/common/interfaces/token-payload.interface';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService, private configService: ConfigService) { }

    async authenticateUser(credentials: AuthUserDto) : Promise<IAuth> {
        //check if email already exist
        const user = await this.userModel.findOne({ email: credentials.email });
        if (!user) {
            throw new BadRequestException(ERROR_MESSAGES.auth.INVALID_CREDENTIALS);
        }
        //check if password is correct
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
            throw new BadRequestException(ERROR_MESSAGES.auth.INVALID_CREDENTIALS);
        }
        return this.generateToken(user._id as string);

    }

    generateToken(userId: string): IAuth {
        const jwtId = uuidv4();
        const accessToken = this.jwtService.sign({ id: userId }, { secret: this.configService.get('jwt.accessTokenSecret'), expiresIn: this.configService.get('jwt.expiresIn'), jwtid: jwtId });
        const refreshToken = this.jwtService.sign({ id: userId }, { secret: this.configService.get('jwt.refreshTokenSecret'), expiresIn: this.configService.get('jwt.refreshTokenExpiresIn'), jwtid: jwtId });
        return { accessToken, refreshToken, userId }
    }

    refreshToken(refreshToken: string) : IAuth {
        //verify the refresh token
        const payload = this.verifyJwtToken(refreshToken);
        //generate new access token
        return this.generateToken(payload.id);
    }
    verifyJwtToken(token: string, type: 'refresh' | 'access' = 'refresh'): TokenPayload {
        let payload = {} as TokenPayload;
        try {
            const secret = type === 'refresh' ? this.configService.get('jwt.refreshTokenSecret') : this.configService.get('jwt.accessTokenSecret');
            payload = this.jwtService.verify(token, { secret });
        } catch (e) {

            if (e instanceof TokenExpiredError) {
                throw new UnauthorizedException(ERROR_MESSAGES.token.EXPIRED);
            }
            if (e instanceof JsonWebTokenError) {
                throw new UnauthorizedException(ERROR_MESSAGES.token.INVALID);
            }
            if (!payload) {
                throw new UnauthorizedException(ERROR_MESSAGES.token.INVALID);
            }
        }
        return payload;
    }
}
