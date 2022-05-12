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

  async function Create() {
    await addDoc(collection(db, "Feel Goods"), {
      type: 'WHATEVER',
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


  const [check1, setCheck1] = React.useState(false);
  const [check2, setCheck2] = React.useState(false);
  const [check3, setCheck3] = React.useState(false);
  const [check4, setCheck4] = React.useState(false);
  const [check5, setCheck5] = React.useState(false);


  return (
    <View style={styles.container}>
      <Text>What kind of feel good is this??? (Select One)</Text>

      <CheckBox
        center
        title="Memory"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check1}
        onPress={() => setCheck1(!check1)}
      />

      <CheckBox
        center
        title="Compliment"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check2}
        onPress={() => setCheck2(!check2)}
      />

      <CheckBox
        center
        title="Achievement"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check3}
        onPress={() => setCheck3(!check3)}
      />

      <CheckBox
        center
        title="Encouragement"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check4}
        onPress={() => setCheck4(!check4)}
      />

      <CheckBox
        center
        title="Other"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check5}
        onPress={() => setCheck5(!check5)}
      />

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