import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ManagerStatus } from './manager.entity';
import { ComplaintStatus } from './complaint.entity';

// ==============================
// CREATE MANAGER
// ==============================
export class CreateManagerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(ManagerStatus)
  status?: ManagerStatus;

  @IsOptional()
  @IsString()
  profile_image?: string;
}

// ==============================
// MANAGER LOGIN
// ==============================
export class ManagerLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

// ==============================
// CHANGE PASSWORD
// ==============================
export class ManagerChangePasswordDto {
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;

  @IsString()
  @MinLength(6)
  confirmPassword: string;
}

// ==============================
// UPDATE PROFILE
// ==============================
export class UpdateManagerProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  profile_image?: string;
}

// ==============================
// UPDATE COMPLAINT STATUS
// ==============================
export class UpdateComplaintStatusDto {
  @IsEnum(ComplaintStatus)
  status: ComplaintStatus;
}

// ==============================
// CREATE COMPLAINT
// ==============================
export class CreateComplaintDto {
  @IsNumber()
  customerId: number;

  @IsString()
  customerName: string;

  @IsString()
  customerEmail: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;
}


// ==============================
// UPDATE ORDER STATUS
// ==============================
export class UpdateOrderStatusDto {
  @IsString()
  status: string;
}
