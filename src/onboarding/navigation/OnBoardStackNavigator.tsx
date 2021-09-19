import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import FriendRow from '../../chat/FriendRow';
// import FriendRow from '../../chat/FriendRow';
import LoginPage from '../ui/LoginPage';
import OnBoard from '../ui/OnBoard';
import {OnBoardStackScreenParams} from './OnBoardStackScreenParams';

const Stack = createStackNavigator<OnBoardStackScreenParams>();

const OnBoardStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      headerMode={'screen'}
      initialRouteName={'Test'}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: '#202329',
        },
      }}>
      <Stack.Screen name={'Test'} component={FriendRow} />
      <Stack.Screen name={'onBoard'} component={OnBoard} />
      <Stack.Screen name={'Login'} component={LoginPage} />
    </Stack.Navigator>
  );
};

export default OnBoardStackNavigator;
