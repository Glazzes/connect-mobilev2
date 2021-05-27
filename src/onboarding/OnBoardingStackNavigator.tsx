import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardingPage from './main-page/OnBoardingPage';
import LoginPage from './LoginPage';

type StackRouteList = {
  MainPage: undefined;
  Login: undefined;
  NewAccount: undefined;
};

const Stack = createStackNavigator<StackRouteList>();

const OnBoardingStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={'MainPage'}
      headerMode={'screen'}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name={'MainPage'} component={OnBoardingPage} />
      <Stack.Screen name={'Login'} component={LoginPage} />
    </Stack.Navigator>
  );
};

export default OnBoardingStackNavigator;
