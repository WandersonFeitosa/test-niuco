import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserProxy } from '../../../infrastructure/proxies/users-proxy/user.proxy';
import { userOutputMock } from './mocks/user.mock';
import { UserOutput } from '../dto/user-output.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUser: jest.fn().mockResolvedValue(userOutputMock),
          },
        },
        {
          provide: UserProxy,
          useValue: {
            getUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should return an array of users', async () => {
      const result = await controller.getUser();
      expect(result).toBeInstanceOf(Array);
      expect(service.getUser).toHaveBeenCalledTimes(1);

      result.forEach((user: UserOutput) => {
        expect(user.id).toEqual(expect.any(String));
        expect(user.name).toEqual(expect.any(String));
        expect(user.email).toEqual(expect.any(String));
        expect(user.last_activity).toEqual(expect.any(String));
        expect(user.status).toEqual(expect.any(Boolean));
        expect(user.premium).toEqual(expect.any(Boolean));
      });
    });
  });
});
