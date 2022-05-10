// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { Observable } from 'rxjs';
// import { ROLES_KEY } from './roles.decorator';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private jwtService: JwtService, private reflector: Reflector) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     try {
//       const requiredRole = this.reflector.getAllAndOverride<string[], string>(
//         ROLES_KEY,
//         [context.getHandler(), context.getClass()],
//       );

//       if (!requiredRole) return true;

//       const req = context.switchToHttp().getRequest();

//       const authHeader = req.headers.authorization;
//       const bearer = authHeader.split(' ')[0];
//       const token = authHeader.split(' ')[1];

//       if (bearer !== 'Bearer' || !token) {
//         throw new UnauthorizedException('Пользователь не авторизован');
//       }

//       const user = this.jwtService.verify(token);

//       req.user = user;

//       if (requiredRole !== user.role) {
//         throw new ForbiddenException('Нет доступа');
//       }

//       return true;
//     } catch (e) {
//       throw new ForbiddenException('Нет доступа');
//     }
//   }
// }
