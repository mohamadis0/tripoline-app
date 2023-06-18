import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,FlatList } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';

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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const changeStatus = (item) => {
    console.log(item)
    item.stationStatus = "waiting"
    const updatedData = data.map(e=>{
      if(item.id === e.id){
        return item;
      }
      return e;
    })
    setData(updatedData);
    fetch("update", {body:item})
  }



  const renderItem = ({ item }) => {


    return (

      <View style={styles.viewLine}>

        <Text style={{ margin: 10 }}>{item.stationName}</Text>
        <TouchableOpacity onPress={() => changeStatus(item)}>
          <View style={{
            backgroundColor:
              getColorByStatus(item.stationStatus),
            borderRadius: 50,
            width: 20,
            height: 20,
            margin: 10,
          }} >
          </View>
        </TouchableOpacity>
      </View>


    );
  };

  return (

    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{trip}</Text>
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

    margin: 5,
    flexDirection: 'row',
    justifyContent: "space-between",

  },

});
