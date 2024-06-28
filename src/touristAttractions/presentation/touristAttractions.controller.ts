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
import { CreateAttractionDTO } from '../domain/dtos/CreateAttractionDTO';
import { UpdateAttractionDTO } from '../domain/dtos/UpdateAttractionDTO';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ICreateAttraction } from '../domain/useCases/ICreateAttraction';
import { IFindAttractionById } from '../domain/useCases/IFindAttractionById';
import { IFindAllAttractions } from '../domain/useCases/IFindAllAttractions';
import { IUpdateAttraction } from '../domain/useCases/IUpdateAttraction';
import { IDeleteAttraction } from '../domain/useCases/IDeleteAttraction';
import { Attractions } from '../domain/entities/attractions.entity';

@ApiTags('touristAttractions')
@Controller('touristAttractions')
export class TouristAttractionsController {
  constructor(
    private readonly _createAttraction: ICreateAttraction,
    private readonly _findAttractionById: IFindAttractionById,
    private readonly _findAllAttractions: IFindAllAttractions,
    private readonly _updateAttraction: IUpdateAttraction,
    private readonly _deleteAttraction: IDeleteAttraction,
  ) {}

  @Get()
  @ApiOkResponse({ type: Attractions, isArray: true })
  @ApiInternalServerErrorResponse()
  public async GetAll(@Res() response: Response) {
    const attractions = await this._findAllAttractions.Execute();
    return response
      .status(HttpHelper.StatusCode(attractions.status))
      .json(attractions);
  }

  @Get(':id')
  @ApiOkResponse({ type: Attractions })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  public async GetById(@Res() response: Response, @Param('id') id: number) {
    const attraction = await this._findAttractionById.Execute(id);
    return response
      .status(HttpHelper.StatusCode(attraction.status))
      .json(attraction);
  }

  @Post('/new')
  @ApiCreatedResponse({ type: Attractions })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async Create(
    @Res() response: Response,
    @Body() input: CreateAttractionDTO,
  ) {
    const attractionCreated = await this._createAttraction.Execute(input);
    return response
      .status(HttpHelper.StatusCode(attractionCreated.status))
      .json(attractionCreated);
  }

  @Put(':id')
  @ApiOkResponse({ type: Attractions })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async Update(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() input: UpdateAttractionDTO,
  ) {
    const attractionUpdated = await this._updateAttraction.Execute(id, input);
    return response
      .status(HttpHelper.StatusCode(attractionUpdated.status))
      .json(attractionUpdated);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Attractions })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async Remove(@Res() response: Response, @Param('id') id: number) {
    const attractionDeleted = await this._deleteAttraction.Execute(id);
    return response
      .status(HttpHelper.StatusCode(attractionDeleted.status))
      .json(attractionDeleted);
  }
}
