import {IsEmail, IsString, IsEnum,IsOptional,MinLength} from 'class-validator'

import { UserRole } from 'src/users/entities/user.entity'

export class RegisterDto {
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(2)
    name:string;

    @IsString()
    @MinLength(10)
    password:string;


    @IsEnum(UserRole)
    @IsOptional()

    role?:UserRole = UserRole.CUSTOMER;


}