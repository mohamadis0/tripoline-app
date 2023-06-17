import React, { useState, useEffect,useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useRoute,useFocusEffect } from '@react-navigation/native';



const colors = ['green', 'yellow', 'black'];

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

  useEffect(() => {
    fetchData();
  }, [tripID]);
  const [, forceUpdate] = useState();
  const fetchData = async () => {
    try {
      const response = await fetch(`https://tripoline-backend-m1it.vercel.app/api/stations/trip/${tripID}`);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const route = useRoute();
  const { trip, bus, driver, tripID } = route.params;

  const renderItem = ({ item }) => {
    // console.log(item);

    return (

      <View style={styles.viewLine}>
        <Text style={{ margin: 10 }}>{item.stationName}</Text>
        <View style={{
          backgroundColor:
            getColorByStatus(item.stationStatus),
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
    
    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <Text>Tripid: {tripID}</Text>
      <Text>Trip: {trip}</Text>
      <Text>Bus: {bus}</Text>
      <Text>Driver: {driver}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id
        //   {
        //   console.log(item._id); 
        //   return item._id;
        // }
      }
      />
    </View>
  );
};

export default Updates;
const styles = StyleSheet.create({
  viewLine: {
    borderWidth: 2,
    margin: 5,
    flexDirection: 'row',

  },

});
