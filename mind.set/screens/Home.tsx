import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import { StackScreenProps } from '@react-navigation/stack';

const auth = getAuth();

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} />

      <Button title="Add A Mind.Set" containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={() => navigation.navigate('Choose Mind.Set')} />
      <Button title="Get A Mood Booster" containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={() => navigation.navigate('Mood Booster')} />
      <Button title="Sign Out" containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={() => signOut(auth)} />
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
    backgroundColor: '#ffffb4',
    borderRadius: 30,
    borderRightWidth: 2,
    borderBottomWidth: 5,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#696969',
    padding: 10
  },
  buttonText: {
    color: '#696969',
    fontFamily: 'Righteous_400Regular'
  },
  buttonContainer: {
    marginTop: 15,
    borderRadius: 30,
  },
});

export default HomeScreen;