import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import Constants from 'expo-constants';

const MoodBoosterScreen = () => {

  const { user } = useAuthentication();
  const feelGoods = collection(db, "Feel Goods");
  const [textAi, setTextAi] = React.useState("");
  const [text1, setText1] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [text3, setText3] = React.useState("");
  const [title1, setTitle1] = React.useState("");
  const [title2, setTitle2] = React.useState("");
  const [title3, setTitle3] = React.useState("");
  const [randomView, setRandomView] = React.useState(false);
  const [aiView, setAiView] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  async function fetch() {
    const q = query(feelGoods, where("uid", "==", user?.uid));
    let ourArray: DocumentData[] = [];
    let randomDoc1: DocumentData = {};
    let randomDoc2: DocumentData = {};
    let randomDoc3: DocumentData = {};

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ourArray.push(doc.data());
    });
    randomDoc1 = ourArray[Math.floor(Math.random() * ourArray.length)];
    randomDoc2 = ourArray[Math.floor(Math.random() * ourArray.length)];
    randomDoc3 = ourArray[Math.floor(Math.random() * ourArray.length)];
    setRandomView(true);
    setAiView(false);
    setText1(randomDoc1.content);
    setTitle1(randomDoc1.type);
    setText2(randomDoc2.content);
    setTitle2(randomDoc2.type);
    setText3(randomDoc3.content);
    setTitle3(randomDoc3.type);
  }

  async function callOpenAi() {
    if (randomView) {
      setRandomView(false);
      setLoading(true);
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: Constants.manifest?.extra?.openAiApiKey,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: `Give me a short pep talk using one or more of the following statements: ${text1} - ${text2} - ${text3}`,
        temperature: 0.8,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      });
      setLoading(false);
      setAiView(true);
      setTextAi(response.data.choices[0].text);
    } else {
      setAiView(true);
      setTextAi("Please fetch random first!");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/feelgood.png")} />

      <Button containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} title="Fetch Random" onPress={fetch}></Button>
      <Button containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} title="Call OPENAI" onPress={callOpenAi}></Button>

      {randomView ?
        <View>
          <Card containerStyle={styles.card}>
            <Card.Title><Text style={styles.buttonText}>{title1}</Text></Card.Title>
            <Card.Divider />
            <Text style={styles.buttonText}>{text1}</Text>
          </Card>
          <Card containerStyle={styles.card}>
            <Card.Title><Text style={styles.buttonText}>{title2}</Text></Card.Title>
            <Card.Divider />
            <Text style={styles.buttonText}>{text2}</Text>
          </Card>
          <Card containerStyle={styles.card}>
            <Card.Title><Text style={styles.buttonText}>{title3}</Text></Card.Title>
            <Card.Divider />
            <Text style={styles.buttonText}>{text3}</Text>
          </Card>
        </View>
        : null}

      {aiView ?
        <View>
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.buttonText}>OPENAI</Card.Title>
            <Card.Divider />
            <Text>{textAi}</Text>
          </Card>
        </View>
        : null}

      {loading ?
        <View>
          <Image source={require("../assets/loading.png")} />
        </View>
        : null}

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