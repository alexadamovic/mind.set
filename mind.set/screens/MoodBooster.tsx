import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Card, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import Constants from 'expo-constants';
import from '../styles/main';


const MoodBoosterScreen = () => {

  const { user } = useAuthentication();
  const feelGoods = collection(db, "Feel Goods");
  const [text, setText] = React.useState("Let's take a trip down memory lane")
  const [title, setTitle] = React.useState("Type of Feel Good")

  async function fetch() {
    const q = query(feelGoods, where("uid", "==", user?.uid));
    let ourArray: DocumentData[] = [];
    let randomDoc: DocumentData = {};

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ourArray.push(doc.data());
    });
    randomDoc = ourArray[Math.floor(Math.random() * ourArray.length)];
    setText(randomDoc.content);
    setTitle(randomDoc.type);
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

      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <Text>{text}</Text>
      </Card>

      <Button buttonStyle={styles.button} title="Fetch Random" onPress={fetch}></Button>
      <Button buttonStyle={styles.button} title="OPENAI" onPress={callOpenAi}></Button>
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
});

export default MoodBoosterScreen;
