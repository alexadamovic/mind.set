import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackScreenProps } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import MoodBoosterScreen from '../screens/MoodBooster';
import ChooseMindSet from '../screens/ChooseMindSet';
import Memory from '../screens/Memory';
import Achievement from '../screens/Achievement';
import Compliment from '../screens/Compliment';
import Encouragement from '../screens/Encouragement';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mood Booster" component={MoodBoosterScreen} />
        <Stack.Screen name="choose mind.set" component={ChooseMindSet} />
        <Stack.Screen name="Memory" component={Memory} />
        <Stack.Screen name="Achievement" component={Achievement} />
        <Stack.Screen name="Compliment" component={Compliment} />
        <Stack.Screen name="Encouragement" component={Encouragement} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}