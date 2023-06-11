
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Assistant from './src/Apps/Assistant';
import User from './src/Apps/User';
import Details from './src/FirstPage/Details';
import Table from './src/UserPages/Table';


const Stack =createStackNavigator();
const NavStyle ={headerTitleAlign: "center",
headerStyle: {
  backgroundColor: "#115F76",
},
headerTitle: () => (
  <Image
    source={require('./assets/menu-logo.png')}
    style={styles.logo}
    resizeMode="contain"
  />
),};

function StackNavigator(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="details" component={Details} options={NavStyle}/>
      <Stack.Screen name="assis" component={Assistant} options={NavStyle}/>
      <Stack.Screen name="User" component={User} options={NavStyle}/>
    </Stack.Navigator>
  )
}


export default function App(){
 
  
  
  return(
    
    <NavigationContainer independent={true}>
      <StackNavigator/>
    </NavigationContainer>
  )
}



const styles = StyleSheet.create({
  logo: {

    width: 150,
    height: 150,

  },

});



