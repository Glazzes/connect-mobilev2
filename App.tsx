import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import useStore from './src/shared/store/Store';
import UserRepository from './src/repositories/UserRepository';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import ApplicationDrawerNavigator from './src/navigation/drawer/DrawerNavigator';
import OnBoardingStackNavigator from './src/onboarding/OnBoardingStackNavigator';

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
  const isAuthenticated: boolean = useStore(state => state.isAuthenticated);

  useEffect(() => {
    UserRepository.insertNewUSer({
      id: 'some random other random',
      username: 'Glaze',
      nickname: 'Glaze',
      profilePicture: 'some profile pic',
    }).then(user => console.log(user.nickname))
        .catch(error => console.log(error))
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        networkActivityIndicatorVisible
        backgroundColor={'rgba(0,0,0,0.3)'}
      />
      <NavigationContainer>
        {isAuthenticated ? (
          <ApplicationDrawerNavigator />
        ) : (
          <OnBoardingStackNavigator />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
