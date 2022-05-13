import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from "firebase/firestore"

const feelGoods = collection(db, "Feel Goods")
const q = query(feelGoods, where("type", "==", "Memory"));

console.log(feelGoods);

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data();)
// });

const MoodBoosterScreen = () => {
  return (
    <View style={styles.container}>
      <Text>You're doing AWESOME!</Text>
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