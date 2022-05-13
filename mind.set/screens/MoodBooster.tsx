import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useAuthentication } from '../utils/hooks/useAuthentication';

// const { user } = useAuthentication();
// const feelGoods = collection(db, "Feel Goods")
// const q = query(feelGoods, where("uid", "==", user?.uid), where("type", "==", "Memory"));
// let ourArray: DocumentData[] = [];

// async function WTH() {
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     ourArray.push(doc.data());
//   });
// };

// WTH();
// console.log(ourArray);

const MoodBoosterScreen = () => {

  const { user } = useAuthentication();
  const feelGoods = collection(db, "Feel Goods");

  async function fetch() {
    const q = query(feelGoods, where("type", "==", "Memory"), where("uid", "==", user?.uid));
    let ourArray: String[] = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ourArray.push(doc.data().content);
    });
    console.log(ourArray[Math.floor(Math.random() * ourArray.length)]);
  }


  // function getRandomFeelGood() {
  //   // return ourArray[Math.floor(Math.random() * (ourArray.length - 1))]
  //   return ourArray[0].content;
  // }

  return (
    <View style={styles.container}>
      <Text>You're doing AWESOME!</Text>
      <Button title="Fetch" onPress={fetch}></Button>
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
  }
});

export default MoodBoosterScreen;