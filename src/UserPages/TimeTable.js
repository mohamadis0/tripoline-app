import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import Table from './Table';
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react';




const TimeTable = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Table');
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({ item }) => {
    const colors = ['green', 'yellow', 'black'];
    return (
      <View style={styles.viewLine}>
        <Text style={{margin:10}}>{item.name}</Text>
        <View style={{
            backgroundColor: colors[0],
            borderRadius: 50,
            width: 20,
            height: 20,
            margin: 10,
          }} >

        </View>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>TimeTable</Text>
        </TouchableOpacity>
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />



    </View>
  )
}

export default TimeTable
const styles = StyleSheet.create({
  viewLine:{
    borderWidth:2,
    margin:5,
    flexDirection:'row',

  },
});