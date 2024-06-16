export interface ResultType<T = any> {
  isSuccess: boolean;
  content: T;
  message: string;
  status: ResultStatus;
}

export enum ResultStatus {
  OK = 'OK',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  OPERATIONAL_ERROR = 'OPERATIONAL_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CREATED = 'CREATED',
  UNATUTHORIZED = 'UNATUTHORIZED',
}

export const Result = {
  Ok<T = any>(content: T, message: string) {
    const result: ResultType<T> = {
      isSuccess: true,
      content,
      message,
      status: ResultStatus.OK,
    };

    return result;
  },

  Created<T = any>(content: T, message: string) {
    const result: ResultType<T> = {
      isSuccess: true,
      content,
      message,
      status: ResultStatus.CREATED,
    };

    return result;
  },

  InternalError<T = any>(content: T, message: string) {
    const result: ResultType<T> = {
      isSuccess: true,
      content,
      message,
      status: ResultStatus.INTERNAL_ERROR,
    };

    return result;
  },

  OperationalError<T = any>(content: T, message: string) {
    const result: ResultType<T> = {
      isSuccess: true,
      content,
      message,
      status: ResultStatus.OPERATIONAL_ERROR,
    };

    return result;
  },

  NotFound<T = any>(content: T, message: string) {
    const result: ResultType<T> = {
      isSuccess: true,
      content,
      message,
      status: ResultStatus.NOT_FOUND,
    };

    return result;
  },

  Unauthorized<T = any>(content: T, message: string) {
    const result: ResultType<T> = {
      isSuccess: true,
      content,
      message,
      status: ResultStatus.UNATUTHORIZED,
    };

    return result;
  },
};
