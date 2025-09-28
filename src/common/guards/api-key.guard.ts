import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const apiKey = req.header("x-api-key");
    if (!apiKey) throw new UnauthorizedException("API key missing");
    if (apiKey !== process.env.API_KEY)
      throw new UnauthorizedException("Invalid API key");
    return true;
  }
}
