import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { CheckBox } from '@rneui/themed';

const AddFeelGoodScreen = () => {
  const { user } = useAuthentication();

  const [value, setValue] = React.useState({
    type: '',
    content: '',
  });

  async function SendToFirebase() {
    await addDoc(collection(db, "Feel Goods"), {
      type: value.type,
      content: value.content,
      uid: user?.uid
    });
  }

  // const Create = () => {
  // const feelGood = doc(db, "MyCollection", "Something New")
  // const docData = {
  //   "type": "memory",
  //   "content": value.content
  // }
  // addDoc(feelGood, docData)
  //   .then(() => {
  //     alert("Feel Good Added!")
  //   })
  //   .catch((error) => {
  //     alert(error.message)
  //   })


  return (
    <View style={styles.container}>
      <Input
        placeholder='What makes you feel good??'
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
      <Button title="Add New Feel Good" onPress={SendToFirebase}></Button>
    </View>
  );
};

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

export default AddFeelGoodScreen;