import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserProxy } from '../../../infrastructure/proxies/users-proxy/user.proxy';
import { UserOutput } from '../dto/user-output.dto';
import { userOutputMock, userProxyMock } from './mocks/user.mock';
import { UserProxyOutput } from 'src/infrastructure/proxies/users-proxy/dto/user-proxy.dto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserProxy,
          useValue: {
            getUsers: jest.fn().mockResolvedValue(userProxyMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should return an array of users', async () => {
      const result = await service.getUser();
      expect(result).toBeInstanceOf(Array);

      result.forEach((user: UserOutput) => {
        expect(user.id).toEqual(expect.any(String));
        expect(user.name).toEqual(expect.any(String));
        expect(user.email).toEqual(expect.any(String));
        expect(user.last_activity).toEqual(expect.any(String));
        expect(user.status).toEqual(expect.any(Boolean));
        expect(user.premium).toEqual(expect.any(Boolean));
      });
    });

    it('should throw an error when an error occurs', async () => {
      jest.spyOn(service, 'isUserActive').mockImplementation(() => {
        throw new Error('Error formating user');
      });

      await expect(service.getUser()).rejects.toThrow('Error formating user');
    });
  });

  describe('isUserActive', () => {
    let proxyMockUser: any = {
      id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
      name: 'John Connor',
      email: 'john.connor@niuco.com.br',
      status: 'enabled',
      role: 'admin',
      last_activity: 1649179152,
    };

    it('should return true when user is enabled', () => {
      expect(service.isUserActive(proxyMockUser)).toBe(true);
    });

    it('should return false when user is disabled', () => {
      proxyMockUser.status = 'disabled';
      expect(service.isUserActive(proxyMockUser)).toBe(false);
    });

    it('should throw an error when status is invalid', () => {
      proxyMockUser.status = 'not_found';
      expect(() => service.isUserActive(proxyMockUser)).toThrow(
        `Invalid status on user ${proxyMockUser.id}`,
      );
    });
  });

  describe('isUserPremium', () => {
    let proxyMockUser: any = {
      id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
      name: 'John Connor',
      email: 'john.connor@niuco.com.br',
      status: 'enabled',
      role: 'admin',
      last_activity: 1649179152,
    };

    it('should return true when user has a premium role', () => {
      expect(service.isUserPremium(proxyMockUser)).toBe(true);
    });

    it('should return true when user does not have a premium role', () => {
      proxyMockUser.role = 'viewer';
      expect(service.isUserPremium(proxyMockUser)).toBe(false);
    });
  });

  describe('convertDate', () => {
    it('should return a date string', () => {
      const timestamp = 1649179152;
      expect(service.convertDate(timestamp)).toEqual(
        new Date(timestamp).toISOString(),
      );
    });

    it('should throw an error when date is invalid', () => {
      const timestamp = 1231313213431231231333;
      expect(() => service.convertDate(timestamp)).toThrow(
        `Error converting date ${timestamp} - ` + 'Invalid time value',
      );
    });
  });

  describe('maskEmail', () => {
    it('should return a masked email', () => {
      const email = 'john.connor@gmail.com.br';
      expect(service.maskEmail(email)).toEqual('jo****or@gmail.com.br');
    });

    it('should return the email when domain is allowed', () => {
      const email = 'john.connor@niuco.com.br';
      expect(service.maskEmail(email)).toEqual(email);
    });

    it('should throw an error when email is invalid', () => {
      const email = 'john.connor';
      expect(() => service.maskEmail(email)).toThrow('Invalid email');
    });
  });
});
