import React, {useEffect} from 'react';
import ApplicationDrawerNavigator from './src/navigation/drawer/DrawerNavigator';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

import {createConnectDatabase} from './src/repositories/Connect.repository';
import useStore from './src/store/Store';
import OnBoardingStackNavigator from './src/onboarding/OnBoardingStackNavigator';
import {NavigationContainer} from "@react-navigation/native";

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
  const isAuthenticated = useStore(state => state.isAuthenticated);

  useEffect(() => {
    createConnectDatabase();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        networkActivityIndicatorVisible
        backgroundColor={'rgba(0,0,0,0.4)'}
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
