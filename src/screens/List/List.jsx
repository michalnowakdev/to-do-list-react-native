import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ApiService } from '../../services/Api.service';

export const ListScreen = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState(0);

  const fetchData = async () => {
    const fetchedTasks = await ApiService.GetTasks();
    setTasks(fetchedTasks);
  };

  const onAddNewTask = () => {
    if (!newTask) return null;
    setTasks([onCreateTask(newTask), ...tasks]);
    setNewTask('');
  };

  const onCreateTask = (description) => {
    const id = new Date().getUTCMilliseconds();
    const task = {
      id,
      description,
      completed: false,
    };
    return task;
  };

  const onHandleCheck = (id) => {
    const allTasks = [...tasks];
    const item = allTasks.find((item) => item.id === id);
    item.completed = !item.completed;
    setTasks([...allTasks]);
  };

  const onUpdateFinishedTasks = () => {
    const numberOfFinishedTasks = tasks.filter((i) => i.completed).length;
    setFinishedTasks(numberOfFinishedTasks);
  };

  const onRemoveFinishedTasks = () => {
    const uncompletedTasks = tasks.filter((t) => !t.completed);
    setTasks(uncompletedTasks);
  };

  useEffect(() => {
    onUpdateFinishedTasks();
  }, [tasks]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.addNew}>
        <Input
          placeholder="Add new task"
          rightIcon={
            <Icon name="check" size={20} onPress={onAddNewTask} color="green" />
          }
          onChangeText={setNewTask}
          value={newTask}
        />
      </View>
      <View style={styles.list}>
        {tasks.map(({ description, id, completed }) => {
          const handleCheckItem = () => {
            onHandleCheck(id);
          };
          return (
            <CheckBox
              key={id}
              checked={completed}
              checkedColor="#0F0"
              checkedTitle={description}
              containerStyle={{ width: '95%' }}
              onPress={handleCheckItem}
              size={30}
              textStyle={{}}
              title={description}
              titleProps={{}}
              uncheckedColor="#F00"
            />
          );
        })}
      </View>
      <View style={styles.removeChecked}>
        <Button
          buttonStyle={{ minWidth: '80%' }}
          containerStyle={{ margin: 20 }}
          icon={<Icon name="trash" size={15} color="#0FF" />}
          loadingProps={{ animating: true }}
          onPress={onRemoveFinishedTasks}
          title="Remove finished items"
          titleProps={{}}
          titleStyle={{ marginHorizontal: 20 }}
          disabled={finishedTasks === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  addNew: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 7,
    backgroundColor: 'white',
    width: '100%',
  },
  task: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  text: {
    color: 'white',
    marginBottom: 20,
    fontSize: 30,
  },
  removeChecked: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
