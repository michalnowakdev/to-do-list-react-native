import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const AddTaskHeader = ({ onCreateTask, setNewTask, newTask }) => {
  return (
    <View style={styles.root}>
      <Input
        placeholder="Add new task"
        rightIcon={
          <Icon name="check" size={20} onPress={onCreateTask} color="green" />
        }
        onChangeText={setNewTask}
        value={newTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
