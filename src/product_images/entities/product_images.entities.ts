import { Column,Entity,PrimaryGeneratedColumn,UpdateDateColumn,CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "src/product/entities/product.entity";


@Entity('productImages')
export class ProductImages{
    @PrimaryGeneratedColumn()
    id: number; 
    
    @Column({name: 'product_id'})
    productId: number;

    @Column({name: 'image_url', type: 'text'})
    imageUrl: string;

    @Column({name: 'is_primary', type: 'boolean', default: false})
    isPrimary: boolean;

    @Column({name: 'alt_text', type: 'varchar', length: 255, nullable: true})
    altText: string; 

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: string; 

    @ManyToOne(() => Product,  product => product.productImages)
    @JoinColumn({name: 'product_id'})
    product: Product;


}