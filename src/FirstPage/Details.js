import { View, Text, StyleSheet, TextInput, Button, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const image = ('../../assets/bg-image.jpeg');


const Details = () => {


  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'assistant' && password === 'password') {
      navigation.navigate('assis');
    } else {
      if (username === 'user' && password === 'password') {
        navigation.navigate('User');
      } else {
        alert('Invalid credentials');
      }
    }
  }


  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <ImageBackground source={require(image)} style={styles.image}>
        <View style={styles.title}>
          <Text style={styles.text1}>Enter username and {'\n'}         password </Text>
        </View>
        <TextInput style={styles.textinput}
          placeholder="    Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput style={styles.textinput}
          placeholder="    Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.topacity} onPress={handleLogin}>
          <Text style={styles.text} >Login</Text>

        </TouchableOpacity>
      </ImageBackground>
    </View>
  )

}

export default Details

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textinput: {
    borderColor: "#115F76",
    borderRadius: 10,
    borderWidth: 2,
    height: 50,
    margin: 10,
    backgroundColor: 'white'
  },
  topacity: {
    alignItems: 'center',
    margin: 70,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#115F76",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#115F76",
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text1: {
    color: "white",
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    alignItems: 'center',
    backgroundColor: "#115F76",
    borderRadius: 10,
    margin: 10,
    padding: 15,
  }


});
