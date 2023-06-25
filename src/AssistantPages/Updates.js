import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import  Svg, { Defs, Line, Marker, Path } from 'react-native-svg';

const Updates = () => {



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
  }
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const route = useRoute();
  const { trip, bus, driver, tripID } = route.params;

  useEffect(() => {
    fetchData();
  }, [route.params]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/stations/trip/${tripID}`);
      const jsonData = await response.json();
      setData(jsonData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const changeStatus = (item) => {
    if (item.stationStatus === "passed") {
      item.stationStatus = "waiting"
    } else if (item.stationStatus === "waiting") {
      item.stationStatus = "arrived"
      item.stationTime = " -- min"
      console.log(item)
    } else {
      item.stationStatus = "passed"
    }
    const updatedData = data.map(e => {
      if (item.id === e.id) {
        return item;
      }
      return e;
    })

    setUpdatedData(updatedData);

    axios.put(`http://10.0.2.2:3000/api/stations/${updatedData[0]._id}`, { ...updatedData[0] })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error.response);
      });

  }



  const renderItem = ({ item }) => {


    return (

      <View style={styles.viewLine}>
        <FontAwesome name="hand-stop-o" size={40} color="#115F76" />
        <Text style={styles.text}>{item.stationName}</Text>
        <TouchableOpacity onPress={() => changeStatus(item)}>
          <View style={{
            backgroundColor:
              getColorByStatus(item.stationStatus),
            borderWidth: 2,
            borderRadius: 50,
            width: 35,
            height: 35,
            margin: "5%",
          }} >
          </View>
        </TouchableOpacity>
      </View>


    );
  };

  return (

    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: "#35474C", margin: '3%' }}>{trip}</Text>
        <AntDesign name="arrowdown" size={30} color="black" />
        
      </View>
  
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

    </View>
  );
};

export default Updates;
const styles = StyleSheet.create({
  viewLine: {

    margin: '5%',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",

  },
  text: {
    margin: 10,
    fontSize: 25,
    color: "#115F76"
  },
  arrowContainer: {
    alignItems: 'center',
  },
  arrowLine: {
    backgroundColor: '#000',
    width: 2,
    flex: 1,
  },

});
