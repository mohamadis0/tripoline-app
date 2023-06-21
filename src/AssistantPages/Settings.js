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
      
      >
     

      <Text>Settings</Text>
      </View> 
     </View>

  )
}

export default Settings