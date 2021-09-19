/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import useAuthenticationStore from './src/shared/store/AuthenticationStore';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import ApplicationDrawerNavigator from './src/navigation/drawer/DrawerNavigator';
import OnBoardStackNavigator from './src/onboarding/navigation/OnBoardStackNavigator';
import {database, userCollection} from './src/shared/persistence';
import BootSplash from 'react-native-bootsplash';

LogBox.ignoreLogs(['Setting a timer', /^Constants\.\w+/]);

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      icon: string;
    }
    interface Theme {}
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#B8B9BE',
    icon: '#B8B9BE',
  },
};

const App: React.FC = () => {
  const authenticationState = useAuthenticationStore();

  useEffect(() => {
    (async () => {
      const userId = await database.adapter.getLocal('user-id');
      if (userId === null) {
        BootSplash.hide({fade: true})
          .then(_ => console.log('success'))
          .catch(e => console.log(e));
        return;
      }

      try {
        const authenticatedUser = await userCollection.find(userId);
        authenticationState.setAuthenticatedUser(authenticatedUser);
        authenticationState.authenticate();
      } catch (e) {
        console.log('No user was found');
      } finally {
        BootSplash.hide({fade: true})
          .then(_ => console.log('success'))
          .catch(e => console.log(e));
      }
    })();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'rgba(0,0,0, 0.2)'}
        showHideTransition={'slide'}
      />
      <NavigationContainer>
        {authenticationState.isAuthenticated ? (
          <ApplicationDrawerNavigator />
        ) : (
          <OnBoardStackNavigator />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
