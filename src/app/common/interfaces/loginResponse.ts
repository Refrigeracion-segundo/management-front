export interface ILoginResponse {
  user: string;
  token: string;
  expiresIn?: any;
  expiresInMinutes: number;
}
