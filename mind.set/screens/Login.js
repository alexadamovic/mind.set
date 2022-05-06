import { StyleSheet, Text, View, Image } from 'react-native';

export default function Login(){
  return (
    <View style={styles.container}>
      <Image source= {require("../assets/logo.png")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40
  }

});