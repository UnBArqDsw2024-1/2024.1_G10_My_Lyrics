
export interface IAuth {
  sign(payload: string | object | Buffer, expiresIn: string): string;
  verify(token: string): string | object | Buffer;
}
