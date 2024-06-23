import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserOutput } from './dto/user-output.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of users',
    isArray: true,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          last_activity: { type: 'string' },
          status: { type: 'boolean' },
          premium: { type: 'boolean' },
        },
      },
    },
  })
  async getUser(): Promise<UserOutput[]> {
    return this.userService.getUser();
  }
}
