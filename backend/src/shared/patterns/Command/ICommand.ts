export interface ICommand<RequestType, ResponseType> {
  execute(request: RequestType, response: ResponseType): Promise<ResponseType>;
}
