import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
import { ClerkService } from "../clerk.service.js";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator.js";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private readonly clerkService: ClerkService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Allow routes decorated with @Public() through without a token.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request & { user: unknown }>();
    const token = this.extractBearerToken(request);

    if (!token) {
      throw new UnauthorizedException("No authorization token provided");
    }

    request.user = await this.clerkService.verifyToken(token);
    return true;
  }

  private extractBearerToken(request: Request): string | null {
    const auth = request.headers.authorization;
    if (!auth?.startsWith("Bearer ")) return null;
    return auth.slice(7);
  }
}
