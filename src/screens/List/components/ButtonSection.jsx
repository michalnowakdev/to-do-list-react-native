import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ButtonSection = ({ onRemoveFinishedTasks, tasks }) => {
  return (
    <View style={styles.root}>
      <Button
        buttonStyle={{ minWidth: '80%' }}
        containerStyle={{ margin: 20 }}
        icon={<Icon name="trash" size={15} color="white" />}
        loadingProps={{ animating: true }}
        onPress={onRemoveFinishedTasks}
        title="Remove finished items"
        titleProps={{}}
        titleStyle={{ marginHorizontal: 20 }}
        disabled={tasks.filter((i) => i.completed).length === 0}
      />
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
