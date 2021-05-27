import db from './Db';

export const createConnectDatabase = () => {
  const createDbStatement = `
  drop table users;
  create table users if not exists (
    id varchar(50) primary key,
    username varchar(100),
    nickname varchar(100),
    profilePicture varchar(100)
    hasActiveSession boolean
  );
`;

  db.exec([{sql: createDbStatement, args: []}], false, () => {
    console.log('Connect db has been created successfully');
  });
};
