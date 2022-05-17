import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import './config/firebase';
import RootNavigation from './navigation';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto'
import AppLoading from 'expo-app-loading';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';

export default function App() {
  let [fontsLoaded] = useFonts({
    Righteous_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}

