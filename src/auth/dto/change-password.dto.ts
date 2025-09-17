import { IsString,MinLength  } from "class-validator";


export class ChangePasswordDto {


    @IsString()
    @MinLength(10)

    currentPassword:string;

    @IsString()
    @MinLength(10)

    newPassword:string;


}