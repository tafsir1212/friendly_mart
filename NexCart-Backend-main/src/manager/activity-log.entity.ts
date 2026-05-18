import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  managerId!: number;

  @Column()
  managerName!: string;

  @Column()
  actionType!: string;

  @Column()
  targetEntity!: string;

  @Column({ nullable: true })
  details!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
