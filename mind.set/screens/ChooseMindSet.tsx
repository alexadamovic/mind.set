import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';

const ChooseMindSet: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/pickmindset.png")} />

      <Button title="Memory" containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={() => navigation.navigate('Memory')} />
      <Button title="Compliment" containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={() => navigation.navigate('Compliment')} />
      <Button title="Achievement" containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={() => navigation.navigate('Achievement')} />
      <Button title="Encouragement" containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={() => navigation.navigate('Encouragement')} />
      <Button title="Other" containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={() => navigation.navigate('Other')} />
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

export default ChooseMindSet;