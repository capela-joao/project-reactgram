export interface ApiSuccessRegister {
  id: string;
  token: string;
}

export interface ApiError {
  errors: string[];
}

export interface ApiSuccessLogin {
  _id: string;
  message: string;
}
