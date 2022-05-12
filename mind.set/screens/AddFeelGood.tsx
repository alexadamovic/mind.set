import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddFeelGoodScreen = () => {

  const [value, setValue] = React.useState({
    type: '',
    content: '',
  });

  async function Create() {
    await addDoc(collection(db, "Feel Goods"), {
      type: 'WHATEVER',
      content: value.content
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
      <Button title="Add New Feel Good" onPress={Create}></Button>
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