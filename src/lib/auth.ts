import { parseCookies } from "nookies";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  userId?: string;
  email?: string;
  exp?: number;
  iat?: number;
  firstName?: string;
  lastName?: string;
}

export const userFromToken = (): CustomJwtPayload | unknown => {
  const cookies = parseCookies();
  const token = cookies.token;

  if (token) {
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      if (decodedToken) {
        return decodedToken;
      }
    } catch (error) {
      return error;
    }
  }
};
