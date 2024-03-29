import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNEventSource from 'react-native-event-source';

LogBox.ignoreAllLogs();



const TimeTable = (props) => {
  const navigation = useNavigation()
  useEffect(() => {
    const eventSource = new RNEventSource('http://10.0.2.2:3000/api/updates', {
      headers:{
        Accept: 'text/event-stream',
      },
        withCredentials: false,
      
    });
    console.log(eventSource)
    eventSource.addEventListener('message', (event) => {
      const eventData = JSON.parse(event.data);
      // const updatedData = data.map(e => {
      //   if (e._id === eventData._id) {
      //     return eventData
      //   }
      //   return e;
      // })

      // setData(updatedData)
      fetchData(); 
      console.log('Received event:', eventData);
    });
    eventSource.addEventListener('open', (event) => {
      console.log('sse opened');
    });

    eventSource.addEventListener('error', (error) => {
      console.error('EventSource error:', error);
    });

    return () => {
      eventSource.close(); 
    };
  }, []);


  const [data, setData] = useState([]);

  //   useEffect(() => {
  //   console.log("...")
  //   fetchData();
  // }, [data]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log("Refresh");
    setTimeout(() => {
      setIsRefreshing(false);
    }, 100);
  };

  const handlePress = (item) => {
  
    navigation.navigate('Table', { tripId: item._id });
  }
  
  
  useEffect(() => {
    fetchData();
  
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/api/trips");
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
    function getTime(date) {
      var currentDateTime = new Date(date);
      var options = { hour: 'numeric', minute: 'numeric', hour12: true };
      var currentTime = currentDateTime.toLocaleTimeString([], options);
      return currentTime;
    }
   
    return (
      <View>
      <View style={{ padding:5, alignItems:'center'}}>
        <Text style={{ fontSize:17,color:"#34555F"}}>{getTime(item.departureTime)}</Text>
      </View>
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
      </View>
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
          refreshing={isRefreshing}
          onRefresh={() => {
            handleRefresh();
            fetchData();
          }} 
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