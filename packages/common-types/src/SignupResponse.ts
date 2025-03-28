export interface SignupResponse {
  success: boolean;
  message?: string;
  errors?: string | { name?: string[]; email?: string[]; password?: string[] };
  status?: number;
}
