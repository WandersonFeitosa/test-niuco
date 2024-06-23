import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserOutput } from './dto/user-output.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<UserOutput[]> {
    return this.userService.getUser();
  }
}
