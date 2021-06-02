import axios from 'axios';
import {PORT, ME} from '@env';
import {User} from '../types/User';
import UserRepository from '../repositories/User.repository';

const HOST = 'http://192.168.42.210';

class UserService {
  getAuthenticatedUser(
    successCallback: (user: User) => void,
    errorCallback: () => void,
  ): void {
    const authenticatedUserUrl = `${HOST}:${PORT}${ME}`;

    axios
      .get(authenticatedUserUrl, {withCredentials: true})
      .then(({data}: {data: User}) => {
        successCallback(data);
        if (!UserRepository.existsById(data.id)) {
          UserRepository.insertCurrentAuthenticatedUser(data);
        } else {
          UserRepository.updateAuthenticatedUser(data);
        }
      })
      .catch(_ => errorCallback());
  }
}

export default new UserService();
