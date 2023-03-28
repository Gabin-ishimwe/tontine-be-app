import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { isAlphanumeric, isEmail } from 'class-validator';
import { comparePwd, generateToken } from 'src/helpers/security';
import { AppResponse } from 'src/utils/_http_response';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { AuthUser } from './users.decorator';
import { IsAdmin } from './users.guard';
import { UsersService } from './users.service';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<AppResponse> {
    //Checking if the email already exists
    const isExist = await this.usersService.findByEmail(createUserDto.email);

    if (isExist) {
      throw new BadRequestException('Email already exists');
    }

    //Creating a new user
    const data = await this.usersService.create(createUserDto);

    return {
      message: 'User created successfully',
      data,
    };
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginUserDto: LoginUserDto,
  ): Promise<AppResponse> {
    //Checking user email exists
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
    //Verify user password
    if (!(await comparePwd(loginUserDto.password, user.password))) {
      throw new BadRequestException('Invalid credentials, wrong password');
    }
    //Check if this account is verified
    if (!user.verified) {
      throw new ForbiddenException(
        'User not verified, please verify account to continue',
      );
    }
    //Generating auth token
    const token = generateToken(user.id, user.role);
    //Responding user and token
    return {
      message: 'User logged in successfully',
      data: {
        user,
        token,
      },
    };
  }

  @Post('verify')
  async verify(
    @Body(new ValidationPipe()) verifyUserDto: VerifyUserDto,
  ): Promise<AppResponse> {
    const user = await this.usersService.verifyOTP(verifyUserDto);
    return {
      message: 'User account verified successfully',
      data: user,
    };
  }

  @Post('resend')
  async resend(@Query('email') email: string): Promise<AppResponse> {
    if (!email || !isEmail(email)) {
      throw new BadRequestException(
        !email ? 'Email is required' : 'Invalid email',
      );
    }
    const user = await this.usersService.resendOTP(email);
    return {
      message: 'Email resent successfully',
      data: user || email,
    };
  }

  @Get()
  @UseGuards(IsAdmin)
  async findAll(): Promise<AppResponse> {
    const users = await this.usersService.findAll();
    return {
      message: 'Users retrieved successfully',
      count: users.length,
      data: users,
    };
  }

  @Get('profile')
  async findProfiles(@Query('q') username: string): Promise<AppResponse> {
    if (!username && !isAlphanumeric(username)) {
      throw new BadRequestException(
        !username ? 'search query required' : 'invalid username',
      );
    }
    const profiles = await this.usersService.getProfiles(username);
    return {
      message: 'Users retrieved successfully',
      count: profiles.length,
      data: profiles,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @AuthUser() userId: string,
  ): Promise<AppResponse> {
    if (userId !== id) {
      throw new UnauthorizedException(
        'Invalid user id, you can view only your own info',
      );
    }
    return {
      message: 'User retrieved successfully',
      data: await this.usersService.findOne(id),
    };
  }

  @Patch('profile')
  // @UseGuards(new UpdateProfileGuard())
  async update(
    @Body() updateProfileDto: UpdateProfileDto,
    @AuthUser() userId: string,
  ): Promise<AppResponse> {
    const data = await this.usersService.updateProfile(
      userId,
      updateProfileDto,
    );
    return { message: 'Profile updated successfully', data };
  }

  // ----------------------------------------------------------------

  @Post('profile')
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @AuthUser() userId: string,
  ): Promise<AppResponse> {
    const profile = await this.usersService.createProfile(
      createProfileDto,
      userId,
    );
    return {
      message: 'User profile created successfully',
      data: profile,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id')
    id: string,
    @AuthUser() userId: string,
  ): Promise<AppResponse> {
    if (userId !== id) {
      throw new UnauthorizedException(
        'Invalid user id, you can`t delete other user`s account',
      );
    }
    const data = await this.usersService.delete(id);
    return { message: 'User deleted successfully', data };
  }
}
