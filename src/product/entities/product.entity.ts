import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,

  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity'
import { ProductImages } from 'src/product_images/entities/product_images.entities';
export enum ProductRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;


  @Column('int')
  price: number;


  @Column('int')
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;



  @Column({ name: 'category_id', nullable: true })
  categoryId: number | null;



  @OneToMany(() => ProductImages, (ProductImage) => ProductImage.product)
  ProductImages: ProductImages[];


  @ManyToOne(() => Category, (category) => category.product, { eager: true, onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category | null;
  productImages: any;


}
