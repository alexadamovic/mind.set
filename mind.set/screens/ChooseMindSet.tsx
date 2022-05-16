import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';

const ChooseMindSet: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>What would you like to contribute today?</Text>
      <Button title="Memory" buttonStyle={styles.button} onPress={() => navigation.navigate('Memory')} />
      <Button title="Compliment" buttonStyle={styles.button} onPress={() => navigation.navigate('Compliment')} />
      <Button title="Achievement" buttonStyle={styles.button} onPress={() => navigation.navigate('Achievement')} />
      <Button title="Encouragement" buttonStyle={styles.button} onPress={() => navigation.navigate('Encouragement')} />
      <Button title="Other" buttonStyle={styles.button} onPress={() => navigation.navigate('Other')} />
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

export default ChooseMindSet;