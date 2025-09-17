import { Not, Repository } from "typeorm";
import { ProductImages } from "./entities/product_images.entities";
import { CreateProductImagesDto } from "./dto/create-product_images.dto"; 
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductService } from "../product/product.service";
import { UpdateProductImageDto } from "./dto/update-product_images.dto";
@Injectable()
export class ProductImagesService{
    createProductImage(createDto: CreateProductImagesDto) {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(ProductImages)
        private readonly ProductImageRepository: Repository<ProductImages>,
        private readonly productService: ProductService,
    ) {}

    // create() 
    async create(createProductImageDto: CreateProductImagesDto, images: Express.Multer.File[]): Promise<ProductImages[]>{
        const {productId, isPrimary, altText} = createProductImageDto;

        const product = await this.productService.getOne(productId);
       
        if(isPrimary) {
            await this.ProductImageRepository.update(
                {productId}, 
                {isPrimary: false}
            )
        }

        const productImages : ProductImages[] = [];

        for(let i = 0 ; i < images.length; i++){
            const image = images[i];
            const productImage = this.ProductImageRepository.create({
                productId: productId, 
                imageUrl: `/uploads/productImages/${image.filename}`, 
                isPrimary: false && i===0,
                altText: altText || `${product} image ${i+1}`,
            });
            const savedImage =  await this.ProductImageRepository.save(productImage);
            productImages.push(savedImage);
        }
        return productImages;
    }




    // getAll()
    async getAll(page?: number, limit?: number, productId?: number, isPrimary?: boolean): Promise <ProductImages[]>{
        const currentPage = page || 1; 
        const currentLimit = limit || 10; 
        const skip = (currentPage - 1) * currentLimit;
        // if(productId){
        //     const existProductId = productId
        // }
        // if(isPrimary !== undefined){
        //     const existingIsPrimary = isPrimary;
        // }

        return this.ProductImageRepository.find({
            where: {productId: productId, isPrimary: isPrimary}, 
            take: currentLimit, 
            skip: skip, 
            relations: ['product'],
            order: {createdAt:'ASC'},
        });

    }

    // getOne()
    async getOne(id: number): Promise<ProductImages> {
        const productImage = await this.ProductImageRepository.findOne({where: {id: id}});

        if(!productImage){
            throw new NotFoundException(`product image with id ${id} not found`);
        }
        return  productImage;
    }

    // getByProductId()
    async getByProductId(productId: number): Promise <ProductImages[]> {
        const product = await this.productService.getOne(productId);
        
        return this.ProductImageRepository.find({
            where: {productId: productId}, 
            order: {createdAt: 'ASC', isPrimary: 'desc'},
        });

    }
    // update()
    async update(id: number, imageToUpdate: UpdateProductImageDto): Promise <ProductImages> {
        const {productId, isPrimary, altText }  = imageToUpdate;
        const existingImage = await this.getOne(id);

        if(!existingImage){
            throw new NotFoundException(`image with id ${id} not found`);
        }

        // if(product_id  !== undefined) {
        //     existingImage.productId = product_id;
        // }
        
        // if(image_url !== undefined){
        //     existingImage.imageUrl = image_url;
        // }

        // if(altText !== undefined) {
        //     existingImage.altText = altText;
        // }

        

        //! if want to update the isPrimary which is a unique property that exist for one image only, so you should set all isPrimary for the rest product images to false
        if(isPrimary !== undefined && isPrimary === true) {
            await this.ProductImageRepository.update(
                {productId: existingImage.productId, id: Not(id)},
                {isPrimary: false}
            );

        }   

        //* using Object.assign() method is better that the above if statements, because it shorter, more readable, and synchronized with the DTO 
        Object.assign(existingImage, imageToUpdate)


        return await this.ProductImageRepository.save(existingImage);

    }



    // remove()
    async remove(id: number){
        const imageToRemove = await this.getOne(id);
        const deletedImage = await this.ProductImageRepository.remove(imageToRemove);
        return {
            message: `the image with the id ${id} has been deleted successfully`,
            deletedImage,
        }
    }
}