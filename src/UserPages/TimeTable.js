import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Table from './Table';


const TimeTable = (props) => {

  const [isLineDetails, setIsLineDetails] = useState(false)

  const handlePress = (item) => {
    console.log(item)
    setIsLineDetails(true)
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
  const getColorByStatus = (status)=>{
    switch (status) {
      case 'ongoing':
          return 'green'
      case '':
          return 'yellow'
      case '':
          return 'black'
      default:
        return 'green';
    }
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.viewLine}>
        <Text style={{margin:10}}>{item.name}</Text>
        <View style={{
            backgroundColor: getColorByStatus(item.status),
            borderRadius: 50,
            width: 20,
            height: 20,
            margin: 10,
          }} >

        </View>
      </View>
      </TouchableOpacity>

    );
  };

  return (
    <View>
      {
        isLineDetails ? <Table /> : <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      }

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