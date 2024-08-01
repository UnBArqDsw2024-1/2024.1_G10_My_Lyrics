export interface ICommand<TRequest, TResponse> {
  execute(params: TRequest): Promise<TResponse>;
}
