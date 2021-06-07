import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ApiService } from '../../services/Api.service';
import { Loader } from '../../components/Loader';
import { AddTaskHeader } from './components/AddTaskHeader';
import { ButtonSection } from './components/ButtonSection';

export const ListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const fetchedTasks = await ApiService.GetTasks();
    setTasks(fetchedTasks);
    setLoading(false);
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
      <AddTaskHeader
        onCreateTask={onCreateTask}
        setNewTask={setNewTask}
        newTask={newTask}
      />
      <View style={styles.list}>
        {loading ? (
          <Loader />
        ) : (
          <FlatList
            data={tasks}
            renderItem={flatListItemRenderer}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <ButtonSection
        onRemoveFinishedTasks={onRemoveFinishedTasks}
        tasks={tasks}
      />
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
});
