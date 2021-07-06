import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users';

  // @ts-ignore
  @field('username') username: string;

  // @ts-ignore
  @field('nickname') nickname: string;

  // @ts-ignore
  @field('profilePicture') profilePicture: string;

  // @ts-ignore
  @field('is_authenticated') isAuthenticated: boolean;
}
