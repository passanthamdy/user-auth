export interface IUser {
    id: string;
    email: string;
  }
  
  export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    userId: string;
  }
  