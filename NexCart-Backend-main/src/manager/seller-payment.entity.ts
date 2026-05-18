import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PaymentStatus {
  PENDING = 'pending',
  RELEASED = 'released',
  FAILED = 'failed',
}

@Entity('seller_payments')
export class SellerPayment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sellerId!: number;

  @Column()
  sellerName!: string;

  @Column()
  sellerEmail!: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  amount!: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column({ nullable: true })
  note!: string;

  @Column({ nullable: true })
  releasedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
