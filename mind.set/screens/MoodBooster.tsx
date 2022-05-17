import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Card, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import Constants from 'expo-constants';

const MoodBoosterScreen = () => {

  const { user } = useAuthentication();
  const feelGoods = collection(db, "Feel Goods");
  const [text, setText] = React.useState("What will you pull up today???")
  const [title, setTitle] = React.useState("Type of Feel Good")
  let ourArray: DocumentData[] = [];

  const getOurArray = async () => {
    const q = query(feelGoods, where("uid", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ourArray.push(doc.data());
    });
  }

  getOurArray;

  function fetch() {
    // const q = query(feelGoods, where("uid", "==", user?.uid));
    // let ourArray: DocumentData[] = [];
    let randomDoc: DocumentData = {};

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   ourArray.push(doc.data());
    // });
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
      prompt: `Give me a pep talk using the following statements about myself: I graduated from Epicodus`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
    });
    setText(response.data.choices[0].text);
    setTitle("OPENAI");
  };


  return (
    <View style={styles.container}>
      <Image source={require("../assets/feelgood.png")} />

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.buttonText}>{title}</Card.Title>
        <Card.Divider />
        <Text>{text}</Text>
      </Card>

      <Button containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} title="Fetch Random" onPress={fetch}></Button>
      <Button containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} title="OPENAI" onPress={callOpenAi}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1f5ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#ffffb4',
    borderRadius: 30,
    borderRightWidth: 2,
    borderBottomWidth: 5,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#696969',
    padding: 10
  },
  card: {
    backgroundColor: '#ffffb4',
    borderRightWidth: 2,
    borderBottomWidth: 5,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#696969',
    padding: 10
  },
  buttonText: {
    color: '#696969',
    fontFamily: 'Righteous_400Regular'
  },
  buttonContainer: {
    marginTop: 15,
    borderRadius: 30,
  },
});

export default MoodBoosterScreen;