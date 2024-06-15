import { HttpHelper } from 'shared/helpers/httpResponseHelper';
import { Controller, Get, Post, Param, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/users.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: Users, isArray: true })
  @ApiInternalServerErrorResponse()
  async GetAll(@Res() response: Response) {
    const users = await this.usersService.findAllUsers();
    return response.status(HttpHelper.StatusCode(users.status)).json(users);
  }

  @Get(':id')
  @ApiOkResponse({ type: Users })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async GetById(@Res() response: Response, @Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    return response.status(HttpHelper.StatusCode(user.status)).json(user);
  }

  @Post('/new')
  @ApiCreatedResponse({ type: Users })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  async Create(@Res() response: Response, @Body() userDTO: CreateUserDTO) {
    const userCreated = await this.usersService.createUser(userDTO);
    return response
      .status(HttpHelper.StatusCode(userCreated.status))
      .json(userCreated);
  }
}
