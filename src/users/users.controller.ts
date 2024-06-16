import { HttpHelper } from 'shared/helpers/httpResponseHelper';
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Res,
  Body,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
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
  public async GetAll(@Res() response: Response) {
    const users = await this.usersService.findAllUsers();
    return response.status(HttpHelper.StatusCode(users.status)).json(users);
  }

  @Get(':id')
  @ApiOkResponse({ type: Users })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  public async GetById(@Res() response: Response, @Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    return response.status(HttpHelper.StatusCode(user.status)).json(user);
  }

  @Post('/new')
  @ApiCreatedResponse({ type: Users })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async Create(
    @Res() response: Response,
    @Body() userDTO: CreateUserDTO,
  ) {
    const userCreated = await this.usersService.createUser(userDTO);
    return response
      .status(HttpHelper.StatusCode(userCreated.status))
      .json(userCreated);
  }

  @Put(':id')
  @ApiOkResponse({ type: Users })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async Update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() userDTO: UpdateUserDTO,
  ) {
    const userUpdated = await this.usersService.updateUser(id, userDTO);
    return response
      .status(HttpHelper.StatusCode(userUpdated.status))
      .json(userUpdated);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Users })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async Remove(@Res() response: Response, @Param('id') id: string) {
    const userDeleted = await this.usersService.deleteUser(id);
    return response
      .status(HttpHelper.StatusCode(userDeleted.status))
      .json(userDeleted);
  }
}
