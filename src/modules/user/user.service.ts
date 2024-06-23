import { HttpException, Injectable } from '@nestjs/common';
import { UserProxy } from '../../infrastructure/proxies/users-proxy/user.proxy';
import { UserOutput } from './dto/user-output.dto';
import { UserProxyOutput } from 'src/infrastructure/proxies/users-proxy/dto/user-proxy.dto';

@Injectable()
export class UserService {
  constructor(private readonly userProxy: UserProxy) {}

  async getUser(): Promise<UserOutput[]> {
    try {
      const users = await this.userProxy.getUsers();

      return users.map((user) => {
        const status = this.isUserActive(user);

        return {
          id: user.id,
          name: user.name,
          email: this.maskEmail(user.email),
          last_activity: this.convertDate(user.last_activity),
          status,
          premium: status ? this.isUserPremium(user) : false,
        };
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Error formating user', 500);
    }
  }

  isUserActive(user: UserProxyOutput): boolean {
    try {
      switch (user.status) {
        case 'enabled':
          return true;
        case 'disabled':
          return false;
        default:
          throw new Error(`Invalid status on user ${user.id}`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  isUserPremium(user: UserProxyOutput): boolean {
    if (user.role === 'admin' || user.role === 'editor') return true;
    return false;
  }

  convertDate(timestamp: number): string {
    try {
      return new Date(timestamp).toISOString();
    } catch (error) {
      throw new Error(`Error converting date ${timestamp} - ` + error.message);
    }
  }

  maskEmail(email: string): string {
    try {
      const [username, domain] = email.split('@');
      if (!domain) throw new Error('Invalid email');
      const allowDomains = process.env.ALLOWED_DOMAINS?.split(',') || [
        'niuco.com.br',
      ];

      if (allowDomains.includes(domain)) return email;

      const initialLetters = username.slice(0, 2);
      const endLetters = username.slice(-2);

      return `${initialLetters}****${endLetters}@${domain}`;
    } catch (error) {
      throw new Error(`Error masking email ${email} - ` + error.message);
    }
  }
}
