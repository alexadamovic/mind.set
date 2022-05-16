import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { browserPopupRedirectResolver, getAuth, signOut } from 'firebase/auth';
import { StackScreenProps } from '@react-navigation/stack';

const auth = getAuth();

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>

      <Image source={require("../assets/logo.png")} />

      <Button title="Add A Mind.Set" buttonStyle={styles.button} onPress={() => navigation.navigate('choose mind.set')} />
      <Button title="Get A Mood Booster" buttonStyle={styles.button} onPress={() => navigation.navigate('Mood Booster')} />
      <Button title="Sign Out" buttonStyle={styles.button} onPress={() => signOut(auth)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1f5ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#9a86cf',
  }
});

export default HomeScreen;