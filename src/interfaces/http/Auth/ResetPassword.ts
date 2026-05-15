export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
  email: string;
  token: string;
}
