import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserProxyOutput } from './dto/user-proxy.dto';

@Injectable()
export class UserProxy {
  private userApiUrl = process.env.USER_API_URL || 'http://localhost:3000';

  async getUsers(): Promise<UserProxyOutput[]> {
    try {
      const response = await axios.get(`${this.userApiUrl}/users`);

      if (!response?.data) {
        throw new HttpException('Users not found', 404);
      }

      return response?.data;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error getting user', 500);
    }
  }
}
