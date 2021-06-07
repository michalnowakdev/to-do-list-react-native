import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Welcome in To Do List App!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('List')}>
        <Text>Start app</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
  },
  text: {
    color: 'white',
    marginBottom: 20,
    fontSize: 25,
  },
  button: {
    height: 50,
    width: '50%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 100,
  },
});
