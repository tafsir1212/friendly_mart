import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { Manager } from './manager.entity';
import { Complaint } from './complaint.entity';
import { SellerPayment } from './seller-payment.entity';
import { ActivityLog } from './activity-log.entity';
import { ManagerNotification } from './manager-notification.entity';

import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { ManagerJwtStrategy } from './manager-jwt.strategy';

// Shared entities
import { Order } from 'src/customer/order.entity';
import { customerEntity } from 'src/customer/customer.entity';
import { SellerEntity } from 'src/seller/entities/seller.entity';
import { PusherModule } from '../pusher/pusher.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([
      Manager,
      Complaint,
      SellerPayment,
      ActivityLog,
      ManagerNotification,
      Order,
      customerEntity,
      SellerEntity,
    ]),
    PusherModule,
  ],
  controllers: [ManagerController],
  providers: [ManagerService, ManagerJwtStrategy],
  exports: [ManagerService],
})
export class ManagerModule {}
