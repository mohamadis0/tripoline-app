import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';


const Service = ({ navigation }) => {

  const [selectedTrip, setSelectedTrip] = useState('');
  const [selectedBus, setSelectedBus] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedTripKey, setSelectedTripKey] = useState('');

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData1();
  }, []);
  useEffect(() => {
    fetchData2();
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
  const fetchData1 = async () => {
    try {
      const response = await fetch("https://tripoline-backend-m1it.vercel.app/api/buses");
      const jsonData = await response.json();
      setData1(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await fetch("https://tripoline-backend-m1it.vercel.app/api/drivers");
      const jsonData = await response.json();
      setData2(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleStartService = (item) => {
    const tripItem = data.map(e => {
      if (selectedTripKey === e.id) {
        return item;
      }
      return e;
    })

      tripItem[0].tripStatus= "ongoing"
      console.log({...tripItem})
      axios.put(`https://tripoline-backend-m1it.vercel.app/api/trips/${selectedTripKey}`, {...tripItem[0]})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error.response);
      });

    navigation.navigate('Updates', {
      tripID: selectedTripKey,
      trip: selectedTrip,
      bus: selectedBus,
      driver: selectedDriver,
    });
  };
  const handleStopService = (item) => {
    const tripItem = data.map(e => {
      if (selectedTripKey === e.id) {
        return item;
      }
      return e;
    })

      tripItem[0].tripStatus= "completed"
      console.log({...tripItem})
      axios.put(`https://tripoline-backend-m1it.vercel.app/api/trips/${selectedTripKey}`, {...tripItem[0]})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error.response);
      });
    };

  return (
    <View >
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.title} >Welcome assistant</Text></View>
      <View style={styles.picker}>
        <View style={{ position: 'absolute', left: 0 }} >
          <MaterialCommunityIcons name="road" size={50} color="#115F76" />
        </View>
        <SelectPicker style={{ marginLeft: "13%" }}
          selectedValue={selectedTrip}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedTrip(itemValue);
            setSelectedTripKey(data[itemIndex]._id);
          }}
        >
          {data.map(item => (
            <SelectPicker.Item key={item._id} label={item.tripName} value={item.tripName} style={styles.pickertext} />
          ))}
        </SelectPicker>
      </View>
      <View style={styles.picker1}>
        <View style={{ position: 'absolute', left: 0 }} >
          <Ionicons name="bus" size={50} color="#115F76" />
        </View>
        <View  >
          <SelectPicker style={{ marginLeft: "13%" }}
            selectedValue={selectedBus}
            onValueChange={(itemValue) => setSelectedBus(itemValue)}
          >
            {data1.map(item => (
              <SelectPicker.Item key={item._id} label={item.Busname} value={item.Busname} style={styles.pickertext} />
            ))}
          </SelectPicker>
        </View>
      </View>
      <View style={styles.picker2}>
      <View style={{ position: 'absolute', left: 0 }} >
      <Ionicons name="person" size={50} color="#115F76" />
        </View>
        <SelectPicker style={{ marginLeft: "13%" }}
          selectedValue={selectedDriver}
          onValueChange={(itemValue) => setSelectedDriver(itemValue)}
        >
          {data2.map(item => (
            <SelectPicker.Item key={item._id} label={item.DriverName} value={item.DriverName} style={styles.pickertext} />
          ))}
        </SelectPicker>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", }}>
        <View >
          <TouchableOpacity onPress={handleStartService} style={styles.topacity} >
            <Text style={styles.opacitytext}>Start Service</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.topacity} onPress={handleStopService}>
            <Text style={styles.opacitytext}>Stop Service</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Service
const styles = StyleSheet.create({
  title: {
    margin: '4%',
    color: "#35474C",
    fontSize: 40,
    fontWeight: 'bold',
  },
  pickertext: {
    color: "#115F76",
    fontSize: 25,

  },
  picker: {
    justifyContent: "center",
    borderWidth: 3,
    height: '15%',
    borderColor: "#115F76",
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    margin: '4%',
    marginBottom: 0,


  },
  picker1: {
    justifyContent: 'center',
    borderWidth: 3,
    height: '15%',
    borderColor: "#115F76",
    marginLeft: '4%',
    marginRight: '4%',
    marginBottom: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  picker2: {
    justifyContent: "center",
    borderWidth: 3,
    height: '15%',
    borderColor: "#115F76",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius:30,
    marginLeft: '4%',
    marginRight: '4%',
    marginBottom: '4%',

  },
  topacity: {
    backgroundColor: "#fde052",
    padding: '2%',
    marginTop: "12%",
    marginLeft: '19%',
    margin: '8%',
    height: "25%",
    width: "65%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: 'center'
  },
  opacitytext: {
    color: "#115F76",
    fontWeight: "bold",
    fontSize: 15,
  }

})