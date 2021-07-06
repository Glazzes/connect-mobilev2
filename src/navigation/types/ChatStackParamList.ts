import {User} from '../../shared/types/User';

export type ChatStackParamList = {
  Home: undefined;
  FriendChat: {friend: User};
  FriendProfile: {friend: User};
};
