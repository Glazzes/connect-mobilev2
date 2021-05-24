import React from 'react';
import {View} from 'react-native';
import {Autolink} from 'react-native-autolink';
import {Caption} from 'react-native-paper';

const styles = {
  container: {
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageSentHour: {fontSize: 12, lineHeight: 12},
  bubble: {
    marginTop: 10,
    backgroundColor: '#00AAC3',
    padding: 10,
    maxWidth: '75%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  text: {color: 'white'},
  link: {},
};

const UserTextMessage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Caption style={styles.messageSentHour}>10:00</Caption>
      </View>
      <View style={styles.bubble}>
        <Autolink
          text={
            'Hi there again React native <3 Hi there again React native <3 Hi there again React native <3'
          }
          linkStyle={styles.link}
          style={styles.text}
        />
      </View>
    </View>
  );
};

export default UserTextMessage;
