import {User} from '../../types/User';

export type ChatStackParamList = {
  Home: undefined;
  FriendChat: {friend: User};
  FriendProfile: {friend: User};
};
