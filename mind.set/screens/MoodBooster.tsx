import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  buttonText: {
    color: '#696969',
  },
  buttonContainer: {
    marginTop: 15,
    borderRadius: 30,
  },
});

export default MoodBoosterScreen;

/* CSS */
// .button-74 {
//   background-color: #fbeee0;
//   border: 2px solid #422800;
//   border-radius: 30px;
//   box-shadow: #422800 4px 4px 0 0;
//   color: #422800;
//   cursor: pointer;
//   display: inline-block;
//   font-weight: 600;
//   font-size: 18px;
//   padding: 0 18px;
//   line-height: 50px;
//   text-align: center;
//   text-decoration: none;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
// }

// .button-74:hover {
//   background-color: #fff;
// }

// .button-74:active {
//   box-shadow: #422800 2px 2px 0 0;
//   transform: translate(2px, 2px);
// }

// @media (min-width: 768px) {
//   .button-74 {
//     min-width: 120px;
//     padding: 0 25px;
//   }
// }