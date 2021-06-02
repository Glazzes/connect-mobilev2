import React, {useEffect} from 'react';
import {Caption, Drawer, Subheading, useTheme} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useStore from '../../store/Store';
import UserService from '../../services/User.service';
import {User} from '../../types/User';
import {DrawerRoutesList} from './DrawerNavigator';

interface DrawerContentProps {
  navigation: DrawerNavigationProp<DrawerRoutesList, 'Home'>;
}

const DrawerContent: React.FC<DrawerContentProps> = ({navigation}) => {
  const theme = useTheme();
  const authenticatedUser: User = useStore(state => state.user);
  const setAuthenticatedUser = useStore(state => state.setAuthenticatedUser);

  useEffect(() => {
    UserService.getAuthenticatedUser(setAuthenticatedUser, () =>
      console.log('sos'),
    );
  }, []);

  return (
    <DrawerContentScrollView style={styles.drawerView}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View>
            <FastImage
              source={{
                uri: authenticatedUser.profilePicture,
                cache: FastImage.cacheControl.immutable,
              }}
              style={styles.avatar}
            />
          </View>
          <Subheading style={styles.title}>
            {authenticatedUser.nickname}
          </Subheading>
          <Caption style={styles.caption}>
            @{authenticatedUser.username}
          </Caption>
        </View>
        <Drawer.Section>
          <Drawer.Item
            icon={() => (
              <Icon name={'chat-bubble'} color={theme.colors.icon} size={20} />
            )}
            label={'Messages'}
            onPress={() => {
              navigation.navigate('Home', {screen: 'Home'});
            }}
          />
          <Drawer.Item
            icon={() => (
              <Icon name={'person'} color={theme.colors.icon} size={20} />
            )}
            label={'Contacts'}
            onPress={() => {
              navigation.navigate('Home', {screen: 'Home'});
            }}
          />
          <Drawer.Item
            icon={() => (
              <Icon name={'group-add'} color={theme.colors.icon} size={20} />
            )}
            label={'Find friends'}
            onPress={() => {
              navigation.navigate('Chat', {screen: 'Chat'});
            }}
          />
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item
            icon={() => (
              <Icon
                name={'qr-code-scanner'}
                color={theme.colors.icon}
                size={20}
              />
            )}
            label={'Login with qr code'}
            onPress={() => {
              navigation.navigate('QrAuth', {screen: 'Scanner'});
            }}
          />
          <Drawer.Item
            icon={() => (
              <Icon name={'phonelink'} color={theme.colors.icon} size={20} />
            )}
            label={'Devices'}
            onPress={() => {
              navigation.navigate('Home', {screen: 'Home'});
            }}
          />
          <Drawer.Item
            icon={() => (
              <Icon name={'settings'} color={theme.colors.icon} size={20} />
            )}
            label={'Settings'}
            onPress={() => {
              navigation.navigate('Home', {screen: 'Home'});
            }}
          />
          <Drawer.Item
            icon={() => (
              <Icon name={'logout'} color={theme.colors.icon} size={20} />
            )}
            label={'Log out'}
            onPress={() => {
              navigation.navigate('Chat', {screen: 'Chat'});
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerView: {margin: 0, padding: 0, backgroundColor: '#202329'},
  drawerContent: {flex: 1},
  userInfoSection: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 15,
  },
  avatar: {height: 60, width: 60, resizeMode: 'contain', borderRadius: 40},
  title: {marginTop: 20, fontWeight: 'bold', color: '#fff'},
  caption: {fontSize: 14, lineHeight: 14, color: '#949AB2'},
  row: {marginTop: 20, flexDirection: 'row', alignItems: 'center'},
  section: {flexDirection: 'row', alignItems: 'center', marginRight: 15},
  paragraph: {marginRight: 3, fontWeight: 'bold'},
});
