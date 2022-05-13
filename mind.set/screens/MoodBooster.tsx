import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore"

const feelGoods = collection(db, "Feel Goods")
const q = query(feelGoods, where("type", "==", "Memory"));
let ourArray: DocumentData[] = [];

async function WTH() {
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ourArray.push(doc.data());
  });
};

WTH();
console.log(ourArray);

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