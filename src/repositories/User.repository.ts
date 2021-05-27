import db from './Db';
import {User} from '../types/User';

class UserRepository {
  existsById(id: String): boolean {
    const sqlStatement = `
        select case when count(id) > 0 then true else false end
        from users where id = ?
        `;

    let exists = false;

    db.transaction(transaction => {
      transaction.executeSql(sqlStatement, [id], (tx, resultSet) => {
        exists = resultSet.rows.item(0);
      });
    });

    return exists;
  }

  insertCurrentAuthenticatedUser(user: User): void {
    const sqlStatement = `
    insert into users (id, username, nickname, profilePicture, hasActiveSession) values(?, ?, ?, ?, true);
    `;

    db.transaction(transaction => {
      transaction.executeSql(sqlStatement, [
        user.id,
        user.username,
        user.nickname,
        user.profilePicture,
      ]);
    });
  }

  updateAuthenticatedUser(user: User): void {
    const sqlStatement = `
    update users set username = ?, nickname = ?, profilePicture = ?
    where id = ?;
    `;

    db.transaction(transaction => {
      transaction.executeSql(
        sqlStatement,
        [user.username, user.username, user.profilePicture, user.id],
        (tx, resultSet) => {
          console.log(resultSet.rows.item(0));
        },
      );
    });
  }

  invalidateAllUserSessions() {
    const sqlStatement = `
      update users set hasActiveSession = false;
      `;

    db.transaction(transaction => {
      transaction.executeSql(sqlStatement, []);
    });
  }

  hasActiveSession(id: String): boolean {
    const sqlStatement = `
    select case when count(id) > 0 then true else false end
    from users where id = ? and hasActiveSession = true;
    `;

    let isSessionActive = false;

    db.transaction(transaction => {
      transaction.executeSql(sqlStatement, [id], (tx, resultSet) => {
        isSessionActive = resultSet.rows.item(0);
      });
    });

    return isSessionActive;
  }
}

export default new UserRepository();
