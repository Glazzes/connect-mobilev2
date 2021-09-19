import React from 'react';
import {Caption, Drawer, Subheading, useTheme} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerScreenParams} from './DrawerScreenParams';
import {User} from '../../shared/persistence';
import withObservables from '@nozbe/with-observables';
import {Observable} from 'rxjs';

interface DrawerContentProps {
  navigation: DrawerNavigationProp<DrawerScreenParams>;
  authenticatedUser: User;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  navigation,
  authenticatedUser,
}) => {
  const theme = useTheme();

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
              <Icon name={'chat'} color={theme.colors.icon} size={20} />
            )}
            label={'Messages'}
            onPress={() => {
              navigation.navigate('Home', {screen: 'Home'});
            }}
          />
          <Drawer.Item
            icon={() => (
              <Icon
                name={'account-group'}
                color={theme.colors.icon}
                size={20}
              />
            )}
            label={'Contacts'}
            onPress={() => {
              navigation.navigate('Home', {screen: 'Home'});
            }}
          />
          <Drawer.Item
            icon={() => (
              <Icon
                name={'account-multiple-plus'}
                color={theme.colors.icon}
                size={20}
              />
            )}
            label={'Find friends'}
            onPress={() => {
              navigation.navigate('Home', {screen: 'Home'});
            }}
          />
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item
            icon={() => (
              <Icon name={'qrcode-scan'} color={theme.colors.icon} size={20} />
            )}
            label={'Login with qr code'}
            onPress={() => {
              navigation.navigate('Home', {screen: 'QrWarning'});
            }}
          />
          <Drawer.Item
            icon={() => (
              <Icon
                name={'cellphone-link'}
                color={theme.colors.icon}
                size={20}
              />
            )}
            label={'Devices'}
            onPress={() => {
              navigation.navigate('Home', {screen: 'Home'});
            }}
          />
          <Drawer.Item
            icon={() => (
              <Icon name={'cog'} color={theme.colors.icon} size={20} />
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
              navigation.navigate('Home', {screen: 'Home'});
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

type ObservableProps = {authenticatedUser: Observable<User>};

const enhance = withObservables<DrawerContentProps, ObservableProps>(
  ['authenticatedUser'],
  ({authenticatedUser}) => ({
    authenticatedUser: authenticatedUser.observe(),
  }),
);

export default enhance(DrawerContent);

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
