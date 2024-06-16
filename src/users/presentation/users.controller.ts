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
import { CreateUserDTO } from '../domain/dtos/CreateUserDTO';
import { UpdateUserDTO } from '../domain/dtos/UpdateUserDTO';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ICreateUser } from '../domain/useCases/ICreateUser';
import { IFindUserById } from '../domain/useCases/IFindUserById';
import { IFindAllUsers } from '../domain/useCases/IFindAllUsers';
import { IUpdateUser } from '../domain/useCases/IUpdateUser';
import { IDeleteUser } from '../domain/useCases/IDeleteUser';
import { Users } from '../domain/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly _createUser: ICreateUser,
    private readonly _findUserById: IFindUserById,
    private readonly _findAllUsers: IFindAllUsers,
    private readonly _updateUser: IUpdateUser,
    private readonly _deleteUser: IDeleteUser,
  ) {}

  @Get()
  @ApiOkResponse({ type: Users, isArray: true })
  @ApiInternalServerErrorResponse()
  public async GetAll(@Res() response: Response) {
    const users = await this._findAllUsers.Execute();
    return response.status(HttpHelper.StatusCode(users.status)).json(users);
  }

  @Get(':id')
  @ApiOkResponse({ type: Users })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  public async GetById(@Res() response: Response, @Param('id') id: string) {
    const user = await this._findUserById.Execute(id);
    return response.status(HttpHelper.StatusCode(user.status)).json(user);
  }

  @Post('/new')
  @ApiCreatedResponse({ type: Users })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async Create(@Res() response: Response, @Body() input: CreateUserDTO) {
    const userCreated = await this._createUser.Execute(input);
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
    @Body() input: UpdateUserDTO,
  ) {
    const userUpdated = await this._updateUser.Execute(id, input);
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
    const userDeleted = await this._deleteUser.Execute(id);
    return response
      .status(HttpHelper.StatusCode(userDeleted.status))
      .json(userDeleted);
  }
}
