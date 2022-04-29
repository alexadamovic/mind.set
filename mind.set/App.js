import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source= {require("./assets/logo.png")}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
