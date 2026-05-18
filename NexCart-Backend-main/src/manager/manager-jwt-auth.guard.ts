import { AuthGuard } from '@nestjs/passport';

export class ManagerJwtAuthGuard extends AuthGuard('manager-jwt') {}
