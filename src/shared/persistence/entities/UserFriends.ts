import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

// @ts-ignore
export default class UserFriends extends Model {
  static table = 'user_friends';
  
  static associations = {
    users: {type: 'belongs_to', key: 'user_id'},
    friends: {type: 'belongs_to', key: 'friend_id'},
  };

  // @ts-ignore
  @field('user_id') userId: string;

  // @ts-ignore
  @field('friend_id') friendId: string;
}
