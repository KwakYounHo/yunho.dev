// "/" 경로 응답 결과
export interface SuccessResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

export type GetHelloResponse = SuccessResponse | ErrorResponse;
