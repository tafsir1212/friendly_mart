import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// =========================
// ENUMS
// =========================
export enum ManagerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// =========================
// ENTITY
// =========================
@Entity('managers')
export class Manager {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: ManagerStatus,
    default: ManagerStatus.ACTIVE,
  })
  status!: ManagerStatus;

  @Column({ default: false })
  isBlocked!: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  profile_image!: string | null;

  @Column({ default: 'manager' })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
