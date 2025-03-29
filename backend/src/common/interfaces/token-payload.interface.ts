export interface TokenPayload {
    id: string,
    iat: number,
    exp: number,
    jti: string,
    application:string,
    isOtpVerified: boolean,
}