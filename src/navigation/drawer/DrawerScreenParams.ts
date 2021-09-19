import {NavigatorScreenParams} from '@react-navigation/native';
import {StackScreenParams} from '../stack/StackScreenParams';

export type DrawerScreenParams = {
  Home: NavigatorScreenParams<StackScreenParams>;
};
