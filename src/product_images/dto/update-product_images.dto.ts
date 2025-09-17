import { PartialType } from "@nestjs/mapped-types";
import { CreateProductImagesDto } from "./create-product_images.dto"; 

export class UpdateProductImageDto extends PartialType(CreateProductImagesDto){}