import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CadetsService } from '../cadets/cadets.service';
import { BocalsService } from '../bocals/bocals.service';
import { MentorsService } from '../mentors/mentors.service';
import { ROLES } from './enum/roles.enum';
import { JwtInfoAndJoin } from './interface/jwt-user.interface';
import { UserInfo42OriginDto } from './dto/oauth-42user-info-orgin.dto';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { ForbiddenException } from '@nestjs/common';
import { Bocals } from 'src/domain/typeorm/entity/bocal.entity';

describe('AuthService - createAndUpdateProfile', () => {
  let authService: AuthService;
  let cadetsService: CadetsService;
  let bocalsService: BocalsService;
  let mentorsService: MentorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: CadetsService,
          useValue: {
            isCadet: jest.fn(),
            createUser: jest.fn(),
            updateLogin: jest.fn(),
            findCadetByIntraId: jest.fn(),
            validateInfo: jest.fn(),
          },
        },
        {
          provide: BocalsService,
          useValue: {
            isBocal: jest.fn(),
            createUser: jest.fn(),
            updateLogin: jest.fn(),
            findByIntra: jest.fn(),
          },
        },
        {
          provide: MentorsService,
          useValue: {
            isMentor: jest.fn(),
            createUser: jest.fn(),
            findByIntra: jest.fn(),
            validateInfo: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    cadetsService = module.get<CadetsService>(CadetsService);
    bocalsService = module.get<BocalsService>(BocalsService);
    mentorsService = module.get<MentorsService>(MentorsService);
  });

  it('should create and return a mentor profile', async () => {
    // Arrange
    const userInfo: UserInfo42OriginDto = {
      email: 'mentor@42.fr',
      login: 'm-mentor',
      image: { link: 'http://image.com', versions: null },
      cursus_users: [],
      staff: false,
    };

    const mockMentor: Mentors = {
      id: '412',
      intraId: 'fake_mentor',
    } as Mentors;

    jest.spyOn(mentorsService, 'isMentor').mockResolvedValue(true);
    jest.spyOn(mentorsService, 'findByIntra').mockResolvedValue(mockMentor);
    jest.spyOn(mentorsService, 'validateInfo').mockReturnValue(true);

    // Act
    const result: JwtInfoAndJoin = await authService.createAndUpdateProfile(
      userInfo,
    );

    // Assert
    expect(result.jwtinfo).toEqual({
      id: '412',
      intraId: 'fake_mentor',
      role: ROLES.MENTOR,
    });
    expect(result.isJoined).toBe(true);
  });

  it('should throw ForbiddenException for non-42cursus cadet', async () => {
    // Arrange
    const userInfo: UserInfo42OriginDto = {
      email: 'cadet@42.fr',
      login: 'cadet',
      image: { link: 'http://image.com' },
      cursus_users: [],
      staff: false,
    };

    // Act & Assert
    await expect(authService.createAndUpdateProfile(userInfo)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should create and return a new Bocal profile if not exists', async () => {
    // Arrange
    const userInfo: UserInfo42OriginDto = {
      email: 'bocal@42.fr',
      login: 'bocalUser',
      image: { link: 'http://image.com' },
      cursus_users: [],
      staff: true,
    };

    jest.spyOn(bocalsService, 'isBocal').mockResolvedValue(false); // Bocalが存在しない
    jest.spyOn(bocalsService, 'createUser').mockResolvedValue({
      id: 'bocal-id',
      intraId: 'bocalUser',
      role: ROLES.BOCAL,
    });

    // Act
    const result: JwtInfoAndJoin = await authService.createAndUpdateProfile(
      userInfo,
    );

    // Assert
    expect(bocalsService.isBocal).toHaveBeenCalledWith('bocalUser');
    expect(bocalsService.createUser).toHaveBeenCalledWith('bocalUser');
    expect(result.jwtinfo).toEqual({
      id: 'bocal-id',
      intraId: 'bocalUser',
      role: ROLES.BOCAL,
    });
    expect(result.isJoined).toBe(true);
  });

  it('should update and return existing Bocal profile', async () => {
    // Arrange
    const userInfo: UserInfo42OriginDto = {
      email: 'existing-bocal@42.fr',
      login: 'existingBocal',
      image: { link: 'http://image.com' },
      cursus_users: [],
      staff: true,
    };

    jest.spyOn(bocalsService, 'isBocal').mockResolvedValue(true); // Bocalが存在する
    jest.spyOn(bocalsService, 'findByIntra').mockResolvedValue({
      id: 'existing-bocal-id',
      intraId: 'existingBocal',
    } as Bocals);
    jest.spyOn(bocalsService, 'updateLogin').mockResolvedValue({
      id: 'existing-bocal-id',
      intraId: 'existingBocal',
      role: ROLES.BOCAL,
    });

    // Act
    const result: JwtInfoAndJoin = await authService.createAndUpdateProfile(
      userInfo,
    );

    // Assert
    expect(bocalsService.isBocal).toHaveBeenCalledWith('existingBocal');
    expect(bocalsService.findByIntra).toHaveBeenCalledWith('existingBocal');
    expect(bocalsService.updateLogin).toHaveBeenCalledWith(
      {
        id: 'existing-bocal-id',
        intraId: 'existingBocal',
      },
      'existingBocal',
    );
    expect(result.jwtinfo).toEqual({
      id: 'existing-bocal-id',
      intraId: 'existingBocal',
      role: ROLES.BOCAL,
    });
    expect(result.isJoined).toBe(true);
  });

  it('should throw ForbiddenException if user is not staff', async () => {
    // Arrange
    const userInfo: UserInfo42OriginDto = {
      email: 'nonstaff@42.fr',
      login: 'nonstaffUser',
      image: { link: 'http://image.com' },
      cursus_users: [],
      staff: false,
    };

    // Act & Assert
    await expect(authService.createAndUpdateProfile(userInfo)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should create and return a cadet profile', async () => {
    // Arrange
    const userInfo: UserInfo42OriginDto = {
      email: 'cadet@42.fr',
      login: 'cadet',
      image: { link: 'http://image.com' },
      cursus_users: [
        { grade: 'Learner', blackholed_at: null, end_at: null },
        { grade: 'Learner', blackholed_at: null, end_at: null },
      ],
      staff: false,
    };

    jest.spyOn(cadetsService, 'isCadet').mockResolvedValue(false);
    jest.spyOn(cadetsService, 'createUser').mockResolvedValue({
      id: 'cadet-id',
      intraId: 'cadet',
      role: ROLES.CADET,
    });

    // Act
    const result: JwtInfoAndJoin = await authService.createAndUpdateProfile(
      userInfo,
    );

    // Assert
    expect(result.jwtinfo).toEqual({
      id: 'cadet-id',
      intraId: 'cadet',
      role: ROLES.CADET,
    });
    expect(result.isJoined).toBe(false);
  });
});
