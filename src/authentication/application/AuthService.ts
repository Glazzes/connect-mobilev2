import axios, {AxiosResponse} from 'axios';
import {database, User, userCollection} from '../../shared/persistence';
import {User as UserType} from '../../shared/types/User';
import {QrScanEvent} from '../domain/types';
import {LoginSuccessReponse} from '../domain/types/LoginSuccessResponse';
import {UsernamePasswordLoginRequest} from '../domain/types/UsernamePasswordLoginRequest';
import {USERNAME_PASSWORD_LOGIN} from '../domain/util/UrlUtil';

class AuthService {
  public getNewQrScanEvent(
    mobileId: string,
    authenticatedUser: User,
  ): QrScanEvent {
    return {
      username: authenticatedUser.username,
      nickname: authenticatedUser.nickname,
      profilePicture: authenticatedUser.profilePicture,
      mobileId,
    };
  }

  public perfomUserNamePasswordLogin(
    request: UsernamePasswordLoginRequest,
  ): Promise<AxiosResponse<LoginSuccessReponse>> {
    return axios.post(USERNAME_PASSWORD_LOGIN, request, {
      withCredentials: true,
    });
  }

  public async setAuthenticatedUserId(authenticatedUserId: string) {
    await database.adapter.setLocal('user-id', authenticatedUserId);
  }

  public async authenticateUser(user: UserType): Promise<User> {
    try {
      const authenticatedUser = await userCollection.find(user.id);
      return await this.updateAuthenticatedUser(authenticatedUser, user);
    } catch (e) {
      return await this.saveAuthenticatedUser(user);
    }
  }

  private async updateAuthenticatedUser(
    savedUser: User,
    user: UserType,
  ): Promise<User> {
    return await database.action(async () => {
      return await savedUser.update(u => {
        u.nickname = user.nickname;
        u.profilePicture = user.profilePicture;
      });
    });
  }

  private async saveAuthenticatedUser(user: UserType): Promise<User> {
    return await database.action(async () => {
      return await userCollection.create(u => {
        u._raw.id = user.id;
        u.username = user.username;
        u.nickname = user.username;
        u.profilePicture = user.profilePicture;
      });
    });
  }
}

export default new AuthService();
