import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import MoodBoosterScreen from '../screens/MoodBooster';
import AddFeelGoodScreen from '../screens/AddFeelGood';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mood Booster" component={MoodBoosterScreen} />
        <Stack.Screen name="Add Feel Good" component={AddFeelGoodScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}