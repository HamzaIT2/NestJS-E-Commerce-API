import { Type } from 'class-transformer';
import {
    IsString,
    IsNumber,
    IsInt,
    IsBoolean,
    MaxLength
}from 'class-validator'

export class CreateProductImagesDto{
    @Type(() => Number)
    @IsNumber()
    productId: number;
    
    @Type(() => Boolean)
    @IsBoolean()
    isPrimary: boolean;

    @IsString()
    @MaxLength(255)
    altText: string; 
}