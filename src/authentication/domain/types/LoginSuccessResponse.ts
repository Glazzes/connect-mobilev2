import { User } from "../../../shared/types";

export type LoginSuccessReponse = {
  accessToken: string;
  authenticatedUser: User;  
}