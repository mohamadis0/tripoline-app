import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect, } from 'react';
import { useRoute } from '@react-navigation/core';



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
        <Text style={{ margin: 10 }}>{item.stationName}</Text>
        <View style={{
          backgroundColor: getColorByStatus(item.stationStatus),
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
      <View
        style={{ width: 100, length: 50, margin: 10 }}
      >
      </View>
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
    borderWidth: 2,
    margin: 5,
    flexDirection: 'row',

  },

});