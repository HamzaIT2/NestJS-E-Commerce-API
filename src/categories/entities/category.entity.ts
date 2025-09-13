import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
   OneToMany,
  CreateDateColumn,
} from 'typeorm';
import {Product} from 'src/product/entities/product.entity'
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;



  
    @OneToMany(()=>Product,(product)=>product.category)
    product:Product[]
}
