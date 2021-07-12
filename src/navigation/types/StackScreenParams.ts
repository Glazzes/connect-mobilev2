import {User} from '../../shared/types/User';

export type StackScreenParams = {
  Home: undefined;

  // Chatroom and friend screens
  Chatroom: {friend: User};
  FriendProfile: {friend: User};
  FullScreenImageMessage: {id: string};

  // Qr authentication routes
  Scanner: undefined;
  SuccessfulScan: {browserId: string};
  SuccessfulLogin: undefined;
  BrowserNotFound: undefined;
};
