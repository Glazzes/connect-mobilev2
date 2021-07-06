import database from './db';
import {Collection} from '@nozbe/watermelondb';
import User from './entities/User';

export const userCollection: Collection<User> = database.get('users');
