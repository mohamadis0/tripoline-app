import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Table from './Table';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const TimeTable = (props) => {
  const navigation = useNavigation()

 

  const handlePress = (item) => {
  
    navigation.navigate('Table', { tripId: item._id });
  }

  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://tripoline-backend-m1it.vercel.app/api/trips");
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
      case 'upcoming':
          return 'orange'
      case 'completed':
          return 'black'
      default:
        return 'orange';
    }
  }
  const renderItem = ({ item }) => {
   
    return (
      <TouchableOpacity onPress={
        () => handlePress(item)
      }
        >
      <View style={styles.viewLine}>
      <MaterialCommunityIcons name="road-variant" size={30} color="#34555F"  style={{margin:'3%'}}/>
        <Text style={{margin:10, fontSize:25,color:"#34555F"}}>{item.tripName}</Text>
        <View style={{
            backgroundColor: getColorByStatus(item.tripStatus),
            borderRadius: 50,
            borderColor:"#1F3339",
            width: "9%",
            height: "63%",
            margin: "4%",
            borderWidth:2,
          }} >

        </View>
      </View>
      </TouchableOpacity>

    );
  };

 

  return (
    <View>
       <View style={{alignItems: "center"  }}>
        <Text style={styles.title} >Trips</Text></View>
      {
    
         <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      }

    </View>
  )
}

export default TimeTable
const styles = StyleSheet.create({
  viewLine:{
    borderColor:"#115F76",
    borderRadius:20,
    borderWidth:1,
    margin:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'

  },
  title: {
    margin: '4%',
    color: "#35474C",
    fontSize: 40,
    fontWeight: 'bold',
  },
});