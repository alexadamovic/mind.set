import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useAuthentication } from '../utils/hooks/useAuthentication';


const MoodBoosterScreen = () => {

  const { user } = useAuthentication();
  const feelGoods = collection(db, "Feel Goods");
  const [text, setText] = React.useState("Let's take a trip down memory lane")

  async function fetch() {
    const q = query(feelGoods, where("type", "==", "Memory"), where("uid", "==", user?.uid));
    let ourArray: string[] = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ourArray.push(doc.data().content);
    });
    // callOpenAi(ourArray[Math.floor(Math.random() * ourArray.length)]);
    setText(ourArray[Math.floor(Math.random() * ourArray.length)]);
  }

  async function callOpenAi() {
    const response = await fetch("../api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ thing: text })
    });
    const data = await response.json();



    // function getRandomFeelGood() {
    //   // return ourArray[Math.floor(Math.random() * (ourArray.length - 1))]
    //   return ourArray[0].content;
    // }

    return (
      <View style={styles.container}>
        <Text>{text}</Text>
        <Button title="Fetch" onPress={fetch}></Button>
        <Button title="OPENAI" onPress={callOpenAi}></Button>
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