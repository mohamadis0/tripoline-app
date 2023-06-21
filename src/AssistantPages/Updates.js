import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

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
  const [updatedData, setUpdatedData] =useState([]);
  const route = useRoute();
  const { trip, bus, driver, tripID } = route.params;

  useEffect(() => {
    fetchData();
  }, [route.params]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://tripoline-backend-m1it.vercel.app/api/stations/trip/${tripID}`);
      const jsonData = await response.json();
      setData(jsonData);
      // console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const changeStatus = (item) => {
    // console.log(item)
    if (item.stationStatus === "passed") {
      item.stationStatus = "waiting"
    } else if (item.stationStatus === "waiting") {
      item.stationStatus = "arrived"
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
    // console.log(updatedData[0])
    // console.log({...updatedData[0]})
    // console.log(updatedData[0]._id)
  //  const update= async () => {
    axios.put(`https://tripoline-backend-m1it.vercel.app/api/stations/${updatedData[0]._id}`, {...updatedData[0]})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error.response);
    });
      // try {
      //   console.log(updatedData)
      //   const response1 = await axios.put(`https://tripoline-backend-m1it.vercel.app/api/stations/${updatedData.id}`, updatedData);
      // } catch (error) {
      //   console.error(error.response1);
      // }
    // };
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
              borderWidth:2,
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
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id
        }
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

});
