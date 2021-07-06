import User from './entities/User';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {applicationScheme} from './schema';

const adapter = new SQLiteAdapter({
  dbName: 'connect',
  schema: applicationScheme,
});

export default new Database({
  adapter: adapter,
  modelClasses: [User],
  actionsEnabled: true,
});
