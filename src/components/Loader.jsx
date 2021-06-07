import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const Loader = () => {
  return (
    <View style={styles.root}>
      <Text>Fetching Data ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
