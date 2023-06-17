import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Details from '../FirstPage/Details';


const Settings = () => {

   const navigation = useNavigation();
  const handleRightButtonPress = () => {
      navigation.navigate('details')
  };

  return (
   
    <View>

       <View
      style={{width:100, length:50, margin:10}}
      >
      <Button onPress={handleRightButtonPress} title='Logout'/>

      <Text>Settings</Text>
      </View> 
     </View>

  )
}

export default Settings