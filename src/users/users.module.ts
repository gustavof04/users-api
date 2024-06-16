import { Module } from '@nestjs/common';
import { UsersController } from './presentation/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICreateUser } from './domain/useCases/ICreateUser';
import { CreateUser } from './application/useCases/CreateUser';
import { IFindUserById } from './domain/useCases/IFindUserById';
import { FindUserById } from './application/useCases/FindUserById';
import { IFindAllUsers } from './domain/useCases/IFindAllUsers';
import { FindAllUsers } from './application/useCases/FindAllUsers';
import { IUpdateUser } from './domain/useCases/IUpdateUser';
import { UpdateUser } from './application/useCases/UpdateUser';
import { IDeleteUser } from './domain/useCases/IDeleteUser';
import { DeleteUser } from './application/useCases/DeleteUser';
import { Users } from './domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    {
      provide: ICreateUser,
      useClass: CreateUser,
    },
    {
      provide: IFindUserById,
      useClass: FindUserById,
    },
    {
      provide: IFindAllUsers,
      useClass: FindAllUsers,
    },
    {
      provide: IUpdateUser,
      useClass: UpdateUser,
    },
    {
      provide: IDeleteUser,
      useClass: DeleteUser,
    },
  ],
})
export class UsersModule {}
