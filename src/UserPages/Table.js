import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect, } from 'react';
import { useRoute } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';



const Table = () => {

  const route = useRoute();
  const tripId = route.params.tripId;
 
  const getColorByStatus = (status) => {
    switch (status) {
      case 'waiting':
        return 'green'
      case 'arrived':
        return 'orange'
      case 'passed':
        return 'black'
      default:
        return 'green';
    }
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://tripoline-backend-m1it.vercel.app/api/stations/trip/${tripId}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.viewLine}>
        <FontAwesome name="hand-stop-o" size={30} color="#34555F" style={{margin:'3%'}}/>
        <Text style={{ margin: 10,fontSize:25,color:"#34555F" }}>{item.stationName}</Text>
        <View style={{
          backgroundColor: getColorByStatus(item.stationStatus),
          borderRadius: 50,
          borderColor:"#1F3339",
          width: "9%",
          height: "63%",
          margin: "4%",
          borderWidth:2,
        }} >

        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={{alignItems: "center"  }}>
        <Text style={styles.title} >Stations</Text></View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default Table
const styles = StyleSheet.create({
  viewLine: {
    borderColor:"#115F76",
    borderRadius:20,
    borderWidth:1,
    margin:"4%",
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