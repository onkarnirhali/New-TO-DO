import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import type { Request } from "express";
import { UsersService } from "../../users/users.service.js";

type RequestWithUser = Request & { user?: { clerkId?: string } };

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const clerkId = request.user?.clerkId;
    const user = clerkId
      ? await this.usersService.findByClerkId(clerkId)
      : null;

    if (!user?.isActive || !user.isAdmin) {
      throw new ForbiddenException();
    }

    return true;
  }
}
