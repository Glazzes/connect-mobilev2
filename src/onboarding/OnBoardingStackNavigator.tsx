import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardingPage from './main-page/OnBoardingPage';
import LoginPage from './LoginPage';
import {OnBoardingStackParamList} from '../navigation/types/OnBoardingStackParamList';

const Stack = createStackNavigator<OnBoardingStackParamList>();

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
