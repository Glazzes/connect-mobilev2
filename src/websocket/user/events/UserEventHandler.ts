import {UserRepository} from '../../../repositories';
import {database, User} from '../../../shared/persistence';
import {ProfileEditEvent} from './ProfileEditEvent';

export default class UserEventHandler {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public onProfileUpdateEvent(event: ProfileEditEvent): void {}
}
