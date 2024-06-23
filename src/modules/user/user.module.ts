import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProxy } from 'src/infrastructure/proxies/users-proxy/user.proxy';

@Module({
  controllers: [UserController],
  providers: [UserService, UserProxy],
})
export class UserModule {}
