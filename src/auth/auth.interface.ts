export interface TokenData {
  token: string;
  expiresIn: number;
  authType?: string;
}

export interface DataStoredInToken {
  userId?: number;
  identityId?: number;
}
