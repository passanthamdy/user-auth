import { StatusCodes } from "../enums/statusCodes";

export interface IRestResponse<T> {
    Status: number;
    Data: T;
}

export interface IRestResponseError {
    statusCode: StatusCodes;
    message: string[];
}

