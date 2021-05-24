import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import UserTextMessage from '../../chat-messages/text-message/UserTextMessage';
import FriendTextMessage from '../../chat-messages/text-message/FriendTextMessage';
import DefaultStackAppbar from './appbars/DefaultStackAppbar';
import FriendRow from '../../chat-views/FriendRow';
import OnBoardingPage from '../../onboarding/main-page/OnBoardingPage';

type StackNavigatorRoutes = {
  Home: undefined;
  Chat: undefined;
  OnBoarding: undefined;
};

const Stack = createSharedElementStackNavigator<StackNavigatorRoutes>();

const ApplicationStackNavigator: React.FC = _ => {
  return (
    <Stack.Navigator
      headerMode={'screen'}
      screenOptions={{
        header: ({scene, previous, navigation}) => (
          <DefaultStackAppbar
            previous={previous}
            scene={scene}
            navigation={navigation}
          />
        ),
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name={'Home'} component={FriendRow} />
      <Stack.Screen name={'Chat'} component={FriendTextMessage} />
      <Stack.Screen
        name={'OnBoarding'}
        component={OnBoardingPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ApplicationStackNavigator;
