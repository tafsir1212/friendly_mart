import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Manager, ManagerStatus } from './manager.entity';
import { Complaint, ComplaintStatus } from './complaint.entity';
import { ActivityLog } from './activity-log.entity';
import { ManagerNotification } from './manager-notification.entity';
import { Order } from 'src/customer/order.entity';
import { customerEntity } from 'src/customer/customer.entity';
import { SellerEntity } from 'src/seller/entities/seller.entity';

import {
  CreateManagerDto,
  ManagerLoginDto,
  ManagerChangePasswordDto,
  UpdateManagerProfileDto,
  UpdateComplaintStatusDto,
  CreateComplaintDto,
} from './manager.dto';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,

    @InjectRepository(Complaint)
    private complaintRepository: Repository<Complaint>,


    @InjectRepository(ActivityLog)
    private activityLogRepository: Repository<ActivityLog>,

    @InjectRepository(ManagerNotification)
    private notificationRepository: Repository<ManagerNotification>,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(customerEntity)
    private customerRepository: Repository<customerEntity>,

    @InjectRepository(SellerEntity)
    private sellerRepository: Repository<SellerEntity>,

    private readonly jwtService: JwtService,
  ) {}

  // =====================================
  // HELPER: LOG ACTIVITY
  // =====================================
  private async logActivity(
    managerId: number,
    managerName: string,
    actionType: string,
    targetEntity: string,
    details?: string,
  ) {
    const log = this.activityLogRepository.create({
      managerId,
      managerName,
      actionType,
      targetEntity,
      details,
    });
    await this.activityLogRepository.save(log);
  }

  // =====================================
  // REGISTER MANAGER
  // =====================================
  async createManager(
    dto: CreateManagerDto,
    profileImageFilename?: string,
  ): Promise<Manager> {
    try {
      const existing = await this.managerRepository.findOne({
        where: [{ email: dto.email }, { phone: dto.phone }],
      });

      if (existing) {
        if (existing.email === dto.email) {
          throw new BadRequestException('Email already exists');
        }
        if (existing.phone === dto.phone) {
          throw new BadRequestException('Phone already exists');
        }
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const manager = this.managerRepository.create({
        ...dto,
        password: hashedPassword,
        status: dto.status || ManagerStatus.ACTIVE,
        profile_image: profileImageFilename || null,
      });

      return await this.managerRepository.save(manager);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to create manager');
    }
  }

  // =====================================
  // LOGIN
  // =====================================
  async login(dto: ManagerLoginDto): Promise<object> {
    const manager = await this.managerRepository.findOne({
      where: { email: dto.email },
    });

    if (!manager) {
      throw new BadRequestException('Invalid email or password');
    }

    if (manager.isBlocked) {
      throw new UnauthorizedException('Your account has been blocked');
    }

    const isMatch = await bcrypt.compare(dto.password, manager.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      email: manager.email,
      sub: manager.id,
      role: 'manager',
    };

    const token = this.jwtService.sign(payload);
    const { password, ...result } = manager;

    return {
      message: 'Login successful',
      manager: result,
      access_token: token,
    };
  }

  // =====================================
  // GET PROFILE
  // =====================================
  async getProfile(id: number): Promise<Manager> {
    const manager = await this.managerRepository.findOne({ where: { id } });
    if (!manager)
      throw new NotFoundException(`Manager not found with id: ${id}`);
    return manager;
  }

  // =====================================
  // UPDATE PROFILE
  // =====================================
  async updateProfile(
    id: number,
    dto: UpdateManagerProfileDto,
    profileImageFilename?: string,
  ): Promise<Manager> {
    const manager = await this.managerRepository.findOne({ where: { id } });
    if (!manager)
      throw new NotFoundException(`Manager not found with id: ${id}`);

    if (profileImageFilename) {
      manager.profile_image = profileImageFilename;
    }

    Object.assign(manager, dto);
    return await this.managerRepository.save(manager);
  }

  // =====================================
  // CHANGE PASSWORD
  // =====================================
  async changePassword(
    id: number,
    dto: ManagerChangePasswordDto,
  ): Promise<object> {
    const manager = await this.managerRepository.findOne({ where: { id } });
    if (!manager) throw new NotFoundException(`Manager not found`);

    const isMatch = await bcrypt.compare(dto.currentPassword, manager.password);
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('New passwords do not match');
    }

    manager.password = await bcrypt.hash(dto.newPassword, 10);
    await this.managerRepository.save(manager);

    return { message: 'Password changed successfully' };
  }

  // =====================================
  // CUSTOMER MANAGEMENT
  // =====================================
  async getAllCustomers(): Promise<Array<Record<string, any>>> {
    const customers = await this.customerRepository.find();
    return customers.map((customer) => {
      const { password, ...customerData } = customer;
      return {
        ...customerData,
        status: customer.isBlocked ? 'blocked' : 'activated',
      };
    });
  }

  async getCustomerById(id: number): Promise<Record<string, any>> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (!customer) throw new NotFoundException(`Customer not found`);

    const { password, ...customerData } = customer;
    return {
      ...customerData,
      status: customer.isBlocked ? 'blocked' : 'activated',
    };
  }

  async blockCustomer(
    customerId: number,
    managerId: number,
    managerName: string,
  ): Promise<object> {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    customer.isBlocked = true;
    await this.customerRepository.save(customer);

    await this.logActivity(
      managerId,
      managerName,
      'BLOCK_CUSTOMER',
      `Customer #${customerId} - ${customer.name}`,
      `Customer blocked by manager`,
    );

    return { message: `Customer ${customer.name} has been blocked` };
  }

  async activateCustomer(
    customerId: number,
    managerId: number,
    managerName: string,
  ): Promise<object> {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    customer.isBlocked = false;
    await this.customerRepository.save(customer);

    await this.logActivity(
      managerId,
      managerName,
      'ACTIVATE_CUSTOMER',
      `Customer #${customerId} - ${customer.name}`,
      `Customer activated by manager`,
    );

    return { message: `Customer ${customer.name} has been activated` };
  }

  // =====================================
  // SELLER MANAGEMENT
  // =====================================
  async getAllSellers(): Promise<Array<Record<string, any>>> {
    const sellers = await this.sellerRepository.find({
      relations: ['shop', 'products'],
    });
    return sellers.map((seller) => {
      const { password, ...sellerData } = seller;
      return {
        ...sellerData,
        status: seller.isBlocked ? 'blocked' : 'activated',
      };
    });
  }

  async getSellerById(id: number): Promise<Record<string, any>> {
    const seller = await this.sellerRepository.findOne({
      where: { id },
      relations: ['shop', 'products', 'orderItems'],
    });
    if (!seller) throw new NotFoundException(`Seller not found`);

    const { password, ...sellerData } = seller;
    return {
      ...sellerData,
      status: seller.isBlocked ? 'blocked' : 'activated',
    };
  }

  async blockSeller(
    sellerId: number,
    managerId: number,
    managerName: string,
  ): Promise<object> {
    const seller = await this.sellerRepository.findOne({
      where: { id: sellerId },
    });
    if (!seller) throw new NotFoundException('Seller not found');

    seller.isBlocked = true;
    await this.sellerRepository.save(seller);

    await this.logActivity(
      managerId,
      managerName,
      'BLOCK_SELLER',
      `Seller #${sellerId} - ${seller.name}`,
      `Seller blocked by manager`,
    );

    return { message: `Seller ${seller.name} has been blocked` };
  }

  async activateSeller(
    sellerId: number,
    managerId: number,
    managerName: string,
  ): Promise<object> {
    const seller = await this.sellerRepository.findOne({
      where: { id: sellerId },
    });
    if (!seller) throw new NotFoundException('Seller not found');

    seller.isBlocked = false;
    await this.sellerRepository.save(seller);

    await this.logActivity(
      managerId,
      managerName,
      'ACTIVATE_SELLER',
      `Seller #${sellerId} - ${seller.name}`,
      `Seller activated by manager`,
    );

    return { message: `Seller ${seller.name} has been activated` };
  }

  // =====================================
  // COMPLAINT MANAGEMENT
  // =====================================
  async getAllComplaints(): Promise<Complaint[]> {
    return await this.complaintRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getComplaintById(id: number): Promise<Complaint> {
    const complaint = await this.complaintRepository.findOne({ where: { id } });
    if (!complaint) throw new NotFoundException('Complaint not found');
    return complaint;
  }

  async getComplaintsByCustomer(customerId: number): Promise<Complaint[]> {
    return await this.complaintRepository.find({
      where: { customerId },
      order: { createdAt: 'DESC' },
    });
  }

  async createComplaint(dto: CreateComplaintDto): Promise<Complaint> {
    const complaint = this.complaintRepository.create({
      ...dto,
      status: ComplaintStatus.OPEN,
    });
    return await this.complaintRepository.save(complaint);
  }

  async updateComplaintStatus(
    id: number,
    dto: UpdateComplaintStatusDto,
    managerId: number,
    managerName: string,
  ): Promise<Complaint> {
    const complaint = await this.complaintRepository.findOne({ where: { id } });
    if (!complaint) throw new NotFoundException('Complaint not found');

    complaint.status = dto.status;
    const updated = await this.complaintRepository.save(complaint);

    await this.logActivity(
      managerId,
      managerName,
      'UPDATE_COMPLAINT_STATUS',
      `Complaint #${id}`,
      `Status changed to ${dto.status}`,
    );

    return updated;
  }


  // =====================================
  // ORDER MANAGEMENT
  // =====================================
  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: [
        'customer',
        'orderItems',
        'orderItems.product',
        'orderItems.seller',
        'rider',
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: [
        'customer',
        'orderItems',
        'orderItems.product',
        'orderItems.seller',
        'rider',
      ],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateOrderStatus(
    orderId: number,
    status: string,
    managerId: number,
    managerName: string,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException('Order not found');

    const validStatuses = [
      'pending',
      'accepted',
      'partial',
      'rider_assigned',
      'out_for_delivery',
      'delivered',
      'cancelled',
    ];

    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid order status');
    }

    order.status = status;
    const updated = await this.orderRepository.save(order);

    await this.logActivity(
      managerId,
      managerName,
      'UPDATE_ORDER_STATUS',
      `Order #${orderId}`,
      `Status changed to ${status}`,
    );

    return updated;
  }

  // =====================================
  // NOTIFICATIONS
  // =====================================
  async getNotifications(managerId: number): Promise<ManagerNotification[]> {
    return await this.notificationRepository.find({
      where: { managerId },
      order: { createdAt: 'DESC' },
    });
  }

  async markNotificationsRead(managerId: number): Promise<object> {
    await this.notificationRepository
      .createQueryBuilder()
      .update(ManagerNotification)
      .set({ isRead: true })
      .where('managerId = :managerId', { managerId })
      .execute();

    return { message: 'All notifications marked as read' };
  }

  // =====================================
  // ACTIVITY LOGS
  // =====================================
  async getActivityLogs(managerId: number): Promise<ActivityLog[]> {
    return await this.activityLogRepository.find({
      where: { managerId },
      order: { createdAt: 'DESC' },
    });
  }

  // =====================================
  // DASHBOARD ANALYTICS
  // =====================================
  async getDashboardStats(managerId: number): Promise<object> {
    const [
      totalCustomers,
      totalSellers,
      totalOrders,
      totalComplaints,
    ] = await Promise.all([
      this.customerRepository.count(),
      this.sellerRepository.count(),
      this.orderRepository.count(),
      this.complaintRepository.count(),
    ]);

    const recentOrders = await this.orderRepository.find({
      relations: ['customer', 'orderItems'],
      order: { createdAt: 'DESC' },
      take: 5,
    });

    const recentComplaints = await this.complaintRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });

    const openComplaints = await this.complaintRepository.count({
      where: { status: ComplaintStatus.OPEN },
    });

    const deliveredOrders = await this.orderRepository.count({
      where: { status: 'delivered' },
    });

    const recentLogs = await this.activityLogRepository.find({
      where: { managerId },
      order: { createdAt: 'DESC' },
      take: 10,
    });

    return {
      totalCustomers,
      totalSellers,
      totalOrders,
      totalComplaints,
      openComplaints,
      deliveredOrders,
      recentOrders,
      recentComplaints,
      recentActivityLogs: recentLogs,
    };
  }
}
