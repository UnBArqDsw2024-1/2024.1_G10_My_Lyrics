export interface IJwt {
    sign(payload: any, expiresIn: string): string;
    verify(token: string): any;
}