import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';

const Memory: React.FC<StackScreenProps<any>> = ({ navigation }) => {

  const { user } = useAuthentication();

  const [value, setValue] = React.useState({
    content: '',
  });

  async function SendToFirebase() {
    await addDoc(collection(db, "Feel Goods"), {
      type: 'Memory',
      content: value.content,
      uid: user?.uid,
      timestamp: Timestamp.fromDate(new Date)
    });
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Input style={styles.textInput}
        placeholder="What would you like to remember??"
        multiline
        numberOfLines={3}
        containerStyle={styles.control}
        value={value.content}
        onChangeText={(text) => setValue({ ...value, content: text })}
        autoCompleteType={undefined}
      />
      <Button title="Add New Memory" containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={SendToFirebase}></Button>
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
  control: {
    marginTop: 10
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
  textInput: {
    color: '#696969',
    fontFamily: 'Righteous_400Regular',
    textAlign: 'center',
    backgroundColor: '#ffffb4',
    borderRightWidth: 2,
    borderBottomWidth: 5,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#696969',
    padding: 10
  }
});

export default Memory;