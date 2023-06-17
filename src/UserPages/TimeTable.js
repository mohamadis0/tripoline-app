import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Table from './Table';


const TimeTable = (props) => {

  const [selectedTripId, setSelectedTripId] = useState(null);
  const [isLineDetails, setIsLineDetails] = useState(false)

  const handlePress = (item) => {
    setSelectedTripId(item._id)
    setIsLineDetails(true)
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
        return 'green';
    }
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.viewLine}>
        <Text style={{margin:10}}>{item.tripName}</Text>
        <View style={{
            backgroundColor: getColorByStatus(item.tripStatus),
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

  const handleTableButtonPress = () => {
    setSelectedTripId(null);
    setIsLineDetails(false);
  };

  return (
    <View>
      {
        isLineDetails ? <Table tripId={selectedTripId} onButtonPress={handleTableButtonPress} /> : <FlatList
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
    borderWidth:2,
    margin:5,
    flexDirection:'row',

  },
});