import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import FriendTextMessage from '../../chat-messages/text-message/FriendTextMessage';
import DefaultStackAppbar from './appbars/DefaultStackAppbar';
import FriendRow from '../../chat-views/FriendRow';
import {ChatStackParamList} from '../types/ChatStackParamList';

const Stack = createSharedElementStackNavigator<ChatStackParamList>();

const ApplicationStackNavigator: React.FC = _ => {
  return (
    <Stack.Navigator
      headerMode={'screen'}
      screenOptions={{
        header: ({navigation}: {navigation: any}) => (
          <DefaultStackAppbar navigation={navigation} />
        ),
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name={'Home'} component={FriendRow} />
      <Stack.Screen name={'FriendChat'} component={FriendTextMessage} />
    </Stack.Navigator>
  );
};

export default ApplicationStackNavigator;
