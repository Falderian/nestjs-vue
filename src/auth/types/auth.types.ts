interface IAuthorizedUser {
  userId: number;
  access_token: string;
}

type GoogleUser = {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
};

interface IGoogleAuthorizedUser {
  message: string;
  user: GoogleUser;
}

export { IAuthorizedUser, GoogleUser, IGoogleAuthorizedUser };
