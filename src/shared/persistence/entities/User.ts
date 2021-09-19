import {Model, Q} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

/*
User and Friend entities are almost identical, the idea of keeping users and friends separate is
becuase of security reasons, users table keeps track only of the logged users while friends table
keeps track of the user's friends, these ones are not meant to used as authenticated users by
any mean.
*/

// @ts-ignore
export default class User extends Model {
  static table = 'users';
  static associations = {
    user_friends: {type: 'has_many', foreignKey: 'user_id'},
  };

  // @ts-ignore
  @field('username') username: string;

  // @ts-ignore
  @field('nickname') nickname: string;

  // @ts-ignore
  @field('profile_picture') profilePicture: string;

  friends = this.collections
    .get('friends')
    .query(Q.on('user_friends', 'user_id', this.id));
}
