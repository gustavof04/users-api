import { HttpStatus } from '@nestjs/common';

type statusCodeType = Record<string, HttpStatus>;

const statusCode: statusCodeType = {
  OK: HttpStatus.OK,
  OPERATIONAL_ERROR: HttpStatus.BAD_REQUEST,
  NOT_FOUND: HttpStatus.NOT_FOUND,
  INTERNAL_ERROR: HttpStatus.INTERNAL_SERVER_ERROR,
  CREATED: HttpStatus.CREATED,
};

export const HttpHelper = {
  StatusCode(status: string): HttpStatus {
    return statusCode[status];
  },
};
