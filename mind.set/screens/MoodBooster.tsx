import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Configuration, OpenAIApi } from "openai";


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

    const configuration = new Configuration({
      organization: "org-q4l5gB23k9kfkGF2bWlaghVo",
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion("text-davinci-002", {
      prompt: `I'm not feeling that great. Try to cheer me up using this memory: ${ourArray[Math.floor(Math.random() * ourArray.length)]}`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });


    console.log(response);
    setText(ourArray[Math.floor(Math.random() * ourArray.length)]);
  }


  // function getRandomFeelGood() {
  //   // return ourArray[Math.floor(Math.random() * (ourArray.length - 1))]
  //   return ourArray[0].content;
  // }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
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