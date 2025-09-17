import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductImages } from "./entities/product_images.entities";
import { ProductImagesController } from "./product_images.controller";
import { ProductImagesService } from "./product_images.service";
import { ProductModule } from "../product/product.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProductImages]), ProductModule],
    controllers: [ProductImagesController],
    providers: [ProductImagesService],
    exports: [ProductImagesService]
})

export class ProductImageModule {};