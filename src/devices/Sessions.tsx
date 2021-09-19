import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Device from './Device';
import {SessionType} from './types/SessionType';

const Sessions = () => {
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [currentSession, setCurrentSession] = useState<SessionType>({} as SessionType);

  useEffect(() => {

  });

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.title}>This device</Text>  
        <Device session={currentSession} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <Text style={styles.title}>Your other devices</Text>
        {
          sessions.map(session => {
            return <Device session={session} key={`session-${session.id}`} />
          })
        }
      </ScrollView>  
    </View>
  );
}

export default Sessions

const styles = StyleSheet.create({
  root: {
    flex: 1  
  },
  title: {
    color: 'white',  
  }  
})