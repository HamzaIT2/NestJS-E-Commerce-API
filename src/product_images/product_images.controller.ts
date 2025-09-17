import{
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    Delete,
    Query,
    UseInterceptors,
    UploadedFiles,
    ParseFilePipe,
    MaxFileSizeValidator,
    Patch,
}from '@nestjs/common'
import {CreateProductImagesDto} from './dto/create-product_images.dto'
import {ProductImagesService}from './product_images.service'
import { diskStorage } from "multer";
import { FilesInterceptor } from "@nestjs/platform-express";
import { extname } from 'path';
import { UpdateProductImageDto } from './dto/update-product_images.dto';

@Controller('product-images')
export class ProductImagesController { 
    constructor(private readonly productImageService: ProductImagesService){}




//     @Post()
//     async createProductImage(@Body() createDto: CreateProductImagesDto) {
//     return this.productImageService.createProductImage(createDto);
//   }



    @Post('upload')
    @UseInterceptors(FilesInterceptor('images', 10, {
        storage: diskStorage({
            destination: './uploads/productImages', 
            filename: (req, file, callback) => {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                callback(null, `${uniqueName}${ext}`);
            }
        }),

        fileFilter: (req, file, callback) => {
            callback(null, true);
        },
    }))

    async create(
        @Body() createProductImageDto: CreateProductImagesDto,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({maxSize: 5*1024*1024})],
                fileIsRequired: true,
            }),
        ) images: Express.Multer.File[],
    ) {
        return this.productImageService.create(createProductImageDto, images);
    }



    // findAll()

    @Get()
    async findAll(
        @Query('page') page?:number,
        @Query('offset')offset?:number ,
        @Query('limit')limit?:number ,
        @Query('productId') productId? : number,
        @Query('isPrimary') isPrimary? : boolean,

    ){
        return this.productImageService.getAll(offset,limit,productId,isPrimary);
    }

    // findOne()

    @Get(':id')
    async getOne(@Param('id') id : number){
        return this.productImageService.getOne(id);
    }


    @Get('product/:productId')
    async getByProductId(@Param('productId')productId:number){
        return this.productImageService.getByProductId(productId)
    }




    // update()
    @Patch(':id')
    async update(
        @Body() updateProductImageDto: UpdateProductImageDto,
        @Param('id') id: number) {
           return this.productImageService.update(id, updateProductImageDto)
    }

    //remove 

    @Delete(':id')
    async remove(@Param('id') id : number){
        return this.productImageService.remove(id)
    }


}