import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoriesService,
  ) { }

  // 1- create()
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, stock } = createProductDto;


    const category = await this.categoryService.findAll()

    // تحقق إذا المنتج موجود مسبقًا بنفس الاسم
    const existingProduct = await this.productRepository.findOne({
      where: { name },
    });
    if (existingProduct) {
      throw new ConflictException('Product already exists');
    }

    const product = this.productRepository.create({
      name,
      price,
      stock,
    });

    return this.productRepository.save(product);
  }

  // 2- findAll()
  async findAll(offset: number = 0, limit: number = 10): Promise<object> {
    const [data, count] = await this.productRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { id: 'DESC' },
    });
    return {
      data,
      count,
    };
  }

  // 3- findOne()
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // 4- update()
  async update(
    id: number,
    updateData: Partial<CreateProductDto>,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, updateData);

    return this.productRepository.save(product);
  }

  // 5- remove()
  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { message: 'Product deleted successfully' };
  }
}
