import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Friend extends Model {
  static table = 'friends';

  // @ts-ignore
  @field('username') username: string;

  // @ts-ignore
  @field('nickname') nickname: string;

  // @ts-ignore
  @field('profile_picture') profilePicture: string;

  // @ts-ignore
  @field('connection_status') connectionStatus: string;
}
