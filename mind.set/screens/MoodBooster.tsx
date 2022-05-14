import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import Constants from 'expo-constants';


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
    setText(ourArray[Math.floor(Math.random() * ourArray.length)]);
  }

  async function callOpenAi() {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: Constants.manifest?.extra?.openAiApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion("text-davinci-002", {
      prompt: "Say this is a test",
      temperature: 0,
      max_tokens: 6,
    });
    console.log(response);
  };


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