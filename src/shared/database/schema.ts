import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const applicationScheme = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        {name: 'username', type: 'string'},
        {name: 'nickname', type: 'string'},
        {name: 'profilePicture', type: 'string'},
        {name: 'is_authenticated', type: 'boolean'},
      ],
    }),
  ],
});
