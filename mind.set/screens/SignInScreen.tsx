import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      if (error instanceof Error) {
        setValue({
          ...value,
          error: error.message,
        })
      } else {
        setValue({
          ...value,
          error: "Unexpected Error",
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/signin.png")} />

      {!!value.error && <View style={styles.error}><Text style={styles.text}>{value.error}</Text></View>}

      <Input style={styles.text}
        placeholder='Email'
        containerStyle={styles.control}
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        leftIcon={<Icon
          name='envelope'
          size={16} />}
        autoCompleteType={undefined}

      />

      <Input style={styles.text}
        placeholder='Password'
        containerStyle={styles.control}
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry={true}
        leftIcon={<Icon
          name='key'
          size={16} />}
        autoCompleteType={undefined}

      />
      <View style={styles.controls}>
        <Button title="Sign in" containerStyle={styles.buttonContainer} titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={signIn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#e1f5ec',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10
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
    fontFamily: 'Righteous_400Regular'
  },
  buttonContainer: {
    marginTop: 15,
    borderRadius: 30,
  },

  text: {
    fontFamily: 'Righteous_400Regular'
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    borderRightWidth: 2,
    borderBottomWidth: 5,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#696969',
    backgroundColor: '#f5a190',
    borderRadius: 30
  }
});

export default SignInScreen;