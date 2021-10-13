import { Controller, Get } from '@nestjs/common';
import { User } from '@angular-nest/model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
