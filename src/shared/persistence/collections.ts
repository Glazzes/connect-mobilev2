import database from './db';
import {Collection} from '@nozbe/watermelondb';
import User from './entities/User';
import Friend from './entities/Friend';

export const userCollection: Collection<User> = database.get('users');
export const friendCollection: Collection<Friend> = database.get('friends');
