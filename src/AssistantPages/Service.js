import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { Picker as SelectPicker } from '@react-native-picker/picker';


const Service = () => {
  const [data, setData] = useState([]);

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

  



  return (
    <View >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text >Welcome assistant</Text></View>
      <SelectPicker>
        {data.map(item => (
          <SelectPicker.Item key={item._id} label={item.tripName} value={item.tripName} />
        ))}
      </SelectPicker>
      <SelectPicker>
        <SelectPicker.Item label="Bus" value="Bus" />
        <SelectPicker.Item label="Bus1" value="Bus1" />
        <SelectPicker.Item label="Bus2" value="Bus2" />
      </SelectPicker>
      <SelectPicker>
        <SelectPicker.Item label="Driver" value="Driver" />
        <SelectPicker.Item label="Driver1" value="Driver1" />
        <SelectPicker.Item label="Driver2" value="Driver2" />
      </SelectPicker>
      <SelectPicker>
        <SelectPicker.Item label="Line" value="Line" />
        <SelectPicker.Item label="Line1" value="Line1" />
        <SelectPicker.Item label="Line2" value="Line2" />
      </SelectPicker>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ margin: 20, }}>
          <Button title={"Start Service"} />
        </View>
        <View style={{ margin: 20, }}>
          <Button title={"Stop service"} />
        </View>
      </View>

    </View>
  )
}

export default Service