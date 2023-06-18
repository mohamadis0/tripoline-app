import { View, Text, StyleSheet, TextInput, Button, ImageBackground, TouchableOpacity, Alert,Image} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import {LinearGradient} from 'expo-linear-gradient';
import { useDispatch } from 'react-redux'

const LoginScreen = () => {

  const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  
  try {
    
    const response = await axios.post('https://tripoline-backend-m1it.vercel.app/api/users/login', {
      "email": username,
    "password": password
  });
  const profileId = response.data.data.user.profileId;
  const response1 = await axios.get(`https://tripoline-backend-m1it.vercel.app/api/profiles/${profileId}`);
   dispatch({ type: "LOGIN_SUCCESS", payload: response1.data })
  } catch (error) {
   Alert.alert('Error', 'An error occurred while logging in');
  
};
  }

  
  return (
    <View style={styles.container}>
      <LinearGradient
          colors={["#115F76", '#407E91','#588F9F' ]}
          style={styles.gradient}
        >
        <View style={styles.logo} >
          <Image source={require('../../assets/menu-logo.png')} style={styles.image}/>
        </View>
        <View style={styles.title}>
          <Text style={styles.text1}>WELCOME</Text>
        </View>
        <TextInput style={styles.textinput}
          placeholder="Email"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput style={styles.textinput}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.topacity} onPress={handleLogin}>
          <Text style={styles.text} >Login</Text>

        </TouchableOpacity>
      </LinearGradient>
    </View>
  )

}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:"#115F76",

  },
  gradient:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:"center",
  },
  logo: {
    alignItems: 'center',
    marginBottom: "5%",
    height: '30%',
    aspectRatio: 1, 
  },
  image: {
    width: '150%',
    height: '100%',
    resizeMode: 'contain',
  },
  textinput: {
    textAlign: 'center',
    fontSize:20,
    width:"60%",
    borderRadius: 25,
    height: "7%",
    margin: "4%",
    backgroundColor: 'white'
  },
  topacity: {
    width:"40%",
    backgroundColor:"#fde052",
    borderRadius:30,
    height:"6%",
    alignItems:"center",
    justifyContent:"center",
    marginTop:"4%",
    marginBottom:"10%",
   
  },
  text: {
    color: "#115F76",
    fontSize:20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium'
  },
  text1: {
    color: "white",
    fontSize: 30,
    fontFamily: 'Roboto',
    marginBottom:"5%",
  },
  title: {
    alignItems: 'center',
    borderRadius: 10,
  }


});
