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
    const q = query(feelGoods, where("uid", "==", user?.uid));
    let ourArray: DocumentData[] = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ourArray.push(doc.data());
    });
    setText(ourArray[Math.floor(Math.random() * ourArray.length)].content);
  }

  async function callOpenAi() {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: Constants.manifest?.extra?.openAiApiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion("text-davinci-002", {
      prompt: "I need to feel better today. Tell me about the following memory: I graduated from Epicodus",
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
    });
    console.log(response.data.choices[0].text);
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