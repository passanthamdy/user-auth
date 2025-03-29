import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;
    
    @MinLength(8)
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
        {
          message:
            'Password must contain at least 1 letter, 1 number, and 1 special character',
        },
      )
    password: string;
}
