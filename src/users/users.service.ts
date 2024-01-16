import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  users = [];
  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number) {
    const user = this.users.find((user) => user.userId === id);
  
    return user;
  }
}
