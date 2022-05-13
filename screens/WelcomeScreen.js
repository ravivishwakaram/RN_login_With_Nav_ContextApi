import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setFechedMessage] = useState('');
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  useEffect(() => {
    axios
      .get(
        'https://react-native-course-767ba-default-rtdb.firebaseio.com/Mahesh.json?auth=' +
          token,
      )
      .then(response => {
        setFechedMessage(response.data);
        //console.log(response.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
