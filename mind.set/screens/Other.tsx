import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';

const Other: React.FC<StackScreenProps<any>> = ({ navigation }) => {

  const { user } = useAuthentication();

  const [value, setValue] = React.useState({
    content: '',
  });

  async function SendToFirebase() {
    await addDoc(collection(db, "Feel Goods"), {
      type: 'Other',
      content: value.content,
      uid: user?.uid,
      timestamp: Timestamp.fromDate(new Date)
    });
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Give yourself a feel good moment!'
        multiline
        numberOfLines={5}
        containerStyle={styles.control}
        value={value.content}
        onChangeText={(text) => setValue({ ...value, content: text })}
        leftIcon={<Icon
          name='smile-o'
          size={16} />}
        autoCompleteType={undefined}
      />
      <Button title="Add New Other" onPress={SendToFirebase}></Button>
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
  },
  control: {
    marginTop: 10
  },
});

export default Other;