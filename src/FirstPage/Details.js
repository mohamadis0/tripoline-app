import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Details = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text onPress ={()=> navigation.navigate('assis')}
      >Go to Assistant App {"\n" }{"\n"}</Text>
      <Text onPress ={()=> navigation.navigate('User')}
      >Go User App</Text>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  