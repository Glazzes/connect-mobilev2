import User from './entities/User';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {applicationScheme} from './schema';
import Friend from './entities/Friend';
import UserFriends from './entities/UserFriends';
import { Platform } from 'react-native';

const adapter = new SQLiteAdapter({
  dbName: 'connect',
  schema: applicationScheme,
  jsi: Platform.OS === 'ios'
});

export default new Database({
  adapter: adapter,
  modelClasses: [User, Friend, UserFriends],
  actionsEnabled: true,
});
