import { View, Text, Button, StyleSheet, FlatList, Dimensions, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, } from 'react';
import { useRoute } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import Svg, { Polygon, Rect, Path, SvgUri } from 'react-native-svg';



const Table = () => {

  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => { 
    console.log("...")
    // fetchData();
  }, [data]);

  const handleRefresh = () => {
    setIsRefreshing(true);
  
    console.log("Refresh");
    setTimeout(() => {
      setIsRefreshing(false);
    }, 100);
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://tripoline-backend-m1it.vercel.app/api/stations/trip/${tripId}`);
      const jsonData = await response.json();
      setData(jsonData);
      // setIsRefreshing(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const renderItem = ({ item }) => {
    var time = item.stationTime
    const minutes = parseInt(time, 10);
    if (!isNaN(minutes)) {
      time = `${minutes} min`;
    }


    const backgroundColor = getColorByStatus(item.stationStatus);
    return (
      <View stlyle={{ flexDirection: 'row' }}>
        <View style={styles.viewLine}>
          <FontAwesome name="hand-stop-o" size={30} color="#34555F" style={{ margin: '3%' }} />
          <Text style={{ margin: '3%', fontSize: 25, color: "#34555F" }}>{item.stationName}</Text>
          <View style={{
            backgroundColor: backgroundColor,
            borderRadius: 50,
            borderColor: "#1F3339",
            width: "9%",
            height: "63%",
            margin: "3%",
            borderWidth: 2,
          }} >
          </View>
          <Text style={{ margin: '3%', fontSize: 25, color: "#34555F" }}>{time}</Text>
        </View>
      </View>
    );
  };




  return (
    <View style={{ flex: 1, }} >
      <View style={{ alignItems: "center", }}>
        <Text style={styles.title} >Stations</Text>
        <View>

        </View>
        <AntDesign name="arrowdown" size={30} color="black" />
      </View>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ alignItems: 'center', width: 10, height: "80%", margin: '2%' }}>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshing={isRefreshing}
          onRefresh={() => {
            handleRefresh();
            fetchData();
          }}
        />
      </View>
    </View>
  )
}

export default Table
const styles = StyleSheet.create({
  viewLine: {
    borderColor: "#115F76",
    // borderRadius: 20,
    borderBottomWidth: 2,
    margin: "3%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  title: {
    margin: '3%',
    color: "#35474C",
    fontSize: 40,
    fontWeight: 'bold',
  },

});