import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screens/Home/Home';
import { ListScreen } from './src/screens/List/List';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'To Do List',
            headerStyle: {
              backgroundColor: 'dodgerblue',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ title: 'Tasks' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
