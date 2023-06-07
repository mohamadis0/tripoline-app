import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Picker as SelectPicker } from '@react-native-picker/picker';

// GetFakeData = () => { fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(json => { console.log(json); this.setState({ userValues: json }) }) }
// componentDidMount(); { this.GetFakeData() };

const Service = () => {
  // state = {
  //   userValues: [],
  //   selectedValue: ''
  // }


  return (
    <View >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text >Welcome assistant</Text></View>
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