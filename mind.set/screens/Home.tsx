import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import { StackScreenProps } from '@react-navigation/stack';

const auth = getAuth();

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Button title="Add A Feel Good" style={styles.button} onPress={() => navigation.navigate('Add Feel Good')} />
      <Button title="Get A Mood Booster" style={styles.button} onPress={() => navigation.navigate('Mood Booster')} />
      <Text>Welcome {user?.email}!</Text>
      <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  }
});

export default HomeScreen;