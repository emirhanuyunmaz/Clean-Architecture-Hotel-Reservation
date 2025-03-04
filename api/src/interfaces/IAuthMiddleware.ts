type tokenType = {
  id: String;
  admin: Boolean;
};

export interface IAuthMiddleware {
  authControl({ token }: { token: String }): tokenType;
}
