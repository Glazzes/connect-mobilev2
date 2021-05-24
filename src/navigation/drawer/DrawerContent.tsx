import React from 'react';
import {Caption, Drawer, Subheading, useTheme} from 'react-native-paper';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

interface DrawerContentProps {
  navigation: DrawerNavigationHelpers;
}

const DrawerContent: React.FC<DrawerContentProps> = ({navigation}) => {
  const theme = useTheme();

  return (
    <DrawerContentScrollView style={styles.drawerView}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View>
            <FastImage
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqmT07roVH-yMO7TLziGd9-c5qiUga4iXuxg&usqp=CAU',
                cache: FastImage.cacheControl.immutable,
              }}
              style={styles.avatar}
            />
          </View>
          <Subheading style={styles.title}>Fox Mc cloud</Subheading>
          <Caption style={styles.caption}>@Fox mccloud</Caption>
        </View>
        <Drawer.Section>
          <Drawer.Item
            icon={() => (
              <Icon name={'chat-bubble'} color={theme.colors.icon} size={20} />
            )}
            label={'Messages'}
            onPress={() => {
              navigation.navigate('Home', {screen: 'OnBoarding'});
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
