import { Song, SongContent } from "../songs";

interface ResponseErrorType {
  name: string;
  message: string;
  cause: number;
}

export class ResponseError implements ResponseErrorType {
  name: string;
  message: string;
  cause: number;

  constructor(name: string, message: string, cause: number) {
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

export type SongResponse<T extends Song[] | SongContent> =
  | { data: T }
  | ResponseErrorType;
