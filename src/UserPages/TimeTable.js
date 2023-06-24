import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Table from './Table';
import { useNavigation } from '@react-navigation/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventSource, { EventSourceListener } from "react-native-sse";
import axios from 'axios';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();



const TimeTable = (props) => {
  const navigation = useNavigation()
//   const eventSource = new EventSource('http://localhost:3000/api/updates');
//  console.log(eventSource)

//   eventSource.addEventListener('message', (event) => {
//     console.log("New message event:", event.data);
//   });
  
//   eventSource.addEventListener('open', (event) => {
//     console.log("Opened event:");
//   });
  
  
  // const es = new EventSource('http://10.0.2.2:3000/api/updates');
  // const getUpdates = async()=>{
  //   console.log('pass')
  //   console.log(es)
  //   // const res = await axios.get('http://127.0.0.1:3000/api/updates');
  // //   console.log(res.data);
  // }

  // // console.log(es)
  // es.addEventListener("open", (event) => {
  //   console.log("Open SSE connection.");
    
  // });
  
  // es.addEventListener("message", (event) => {
  //   console.log("New message event:", event.data);
  // });
  
  // es.addEventListener("error", (event) => {
  //   if (event.type === "error") {
  //     console.error("Connection error:", event.message);
  //   } else if (event.type === "exception") {
  //     console.error("Error:", event.message, event.error);
  //   }
  // });
  
  // es.addEventListener("close", (event) => {
  //   console.log("Close SSE connection.");
  // });

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