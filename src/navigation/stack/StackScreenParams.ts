import {User} from '../../shared/types/User';

export type StackScreenParams = {
  Home: undefined;
  Chatroom: {friend: User};
  FriendProfile: {friend: User};
  FullScreenImageMessage: {id: string};
  Devices: undefined;

  // qr screens
  QrWarning: undefined;
  QrScanner: undefined;
  SuccessfulQrScan: {browserId: string};
  SuccessfulLogin: undefined;
  BrowserNotFound: undefined;
};
