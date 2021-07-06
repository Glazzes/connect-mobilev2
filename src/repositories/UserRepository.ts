import {User} from '../shared/types';

import {database, userCollection, UserEntity} from '../shared/database';

class UserRepository {
  async insertNewUSer(authenticatedUser: User): Promise<UserEntity> {
    return database.action<UserEntity>(
      async () =>
        await userCollection.create(user => {
          user._raw.id = authenticatedUser.id;
          user.username = authenticatedUser.username;
          user.nickname = authenticatedUser.nickname;
          user.profilePicture = authenticatedUser.profilePicture;
          user.isAuthenticated = true;
        }),
    );
  }

  async existsById(id: string): Promise<UserEntity> {
    return await database.action<UserEntity>(
      async () => await userCollection.find(id),
    );
  }
}

export default new UserRepository();
