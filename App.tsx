import React from 'react';
import ApplicationDrawerNavigator from './src/navigation/drawer/DrawerNavigator';
import {StatusBar} from 'react-native'
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

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
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle={'dark-content'} translucent={true} networkActivityIndicatorVisible
        backgroundColor={'rgba(0,0,0,0.4)'}
      />
      <ApplicationDrawerNavigator />
    </PaperProvider>
  );
};

export default App;
