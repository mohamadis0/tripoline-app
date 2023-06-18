import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { Picker as SelectPicker } from '@react-native-picker/picker';

const Service = ({navigation}) => {

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
  const handleStartService = () => {
    
    navigation.navigate('Updates', {
      tripID: selectedTripKey,
      trip: selectedTrip,
      bus: selectedBus,
      driver: selectedDriver,
    });
  };

  return (
    <View >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text >Welcome assistant</Text></View>
      <SelectPicker
        selectedValue={selectedTrip}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedTrip(itemValue);
          setSelectedTripKey(data[itemIndex]._id); 
        }}
      >
        {data.map(item => (
          <SelectPicker.Item key={item._id} label={item.tripName} value={item.tripName} />
        ))}
      </SelectPicker>
      <SelectPicker
        selectedValue={selectedBus}
        onValueChange={(itemValue) => setSelectedBus(itemValue)}
      >
        {data1.map(item => (
          <SelectPicker.Item key={item._id} label={item.Busname} value={item.Busname} />
        ))}
      </SelectPicker>
      <SelectPicker
        selectedValue={selectedDriver}
        onValueChange={(itemValue) => setSelectedDriver(itemValue)}
      >
        {data2.map(item => (
          <SelectPicker.Item key={item._id} label={item.DriverName} value={item.DriverName} />
        ))}
      </SelectPicker>


      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ margin: 20, }}>
          <Button title={"Start Service"} onPress={handleStartService} />
        </View>
        <View style={{ margin: 20, }}>
          <Button title={"Stop service"} />
        </View>
      </View>

    </View>
  )
}

export default Service