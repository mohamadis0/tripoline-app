import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Text, View } from 'react-native';


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