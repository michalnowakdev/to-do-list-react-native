import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ApiService } from '../../services/Api.service';

export const ListScreen = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const fetchedTasks = await ApiService.GetTasks();
    setTasks(fetchedTasks);
  };

  const onCreateTask = async () => {
    const isAddedSuccess = await ApiService.CreateTask(newTask);
    if (isAddedSuccess) {
      setNewTask('');
      fetchData();
    }
  };

  const onHandleCheck = async (id) => {
    const allTasks = [...tasks];
    const item = allTasks.find((item) => item.id === id);
    item.completed = !item.completed;
    setTasks([...allTasks]);
    const response = await ApiService.UpdateTask(item);
    if (!response) {
      fetchData();
    }
  };

  const onRemoveFinishedTasks = async () => {
    const response = await ApiService.BulkDelete();
    if (response) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const flatListItemRenderer = ({ item }) => {
    const handleCheckItem = () => {
      onHandleCheck(item.id);
    };
    return (
      <CheckBox
        key={item.id}
        checked={item.completed}
        checkedColor="#0F0"
        checkedTitle={item.description}
        containerStyle={{ width: '95%' }}
        onPress={handleCheckItem}
        size={30}
        textStyle={{}}
        title={item.description}
        titleProps={{}}
        uncheckedColor="#F00"
      />
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.addNew}>
        <Input
          placeholder="Add new task"
          rightIcon={
            <Icon name="check" size={20} onPress={onCreateTask} color="green" />
          }
          onChangeText={setNewTask}
          value={newTask}
        />
      </View>
      <View style={styles.list}>
        <FlatList
          data={tasks}
          renderItem={flatListItemRenderer}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.removeChecked}>
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
