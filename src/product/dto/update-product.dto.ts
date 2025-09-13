import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from '../dto/create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
// وراثة من CreateUserDto لأن جميع الحقول اختيارية في التحديث وما يحتاج نكرر الكود ونخليه كله اختياري
