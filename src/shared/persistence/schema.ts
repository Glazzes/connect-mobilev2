import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const applicationScheme = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        {name: 'username', type: 'string'},
        {name: 'nickname', type: 'string'},
        {name: 'profile_picture', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'friends',
      columns: [
        {name: 'username', type: 'string'},
        {name: 'nickname', type: 'string'},
        {name: 'profile_picture', type: 'string'},
        {name: 'connection_status', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'user_friends',
      columns: [
        {name: 'user_id', type: 'string'},
        {name: 'friend_id', type: 'string'},
      ],
    }),
  ],
});
