import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  
  ManyToOne
} from 'typeorm';
import {Category} from 'src/categories/entities/category.entity'

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
  price:number;


  @Column('int')
  stock:number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;



 





  @ManyToOne(()=>Category,(category)=>category.product)
  category:Category[]
}
