import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('manager_notifications')
export class ManagerNotification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  managerId!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ default: false })
  isRead!: boolean;

  @Column({ nullable: true })
  type!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
