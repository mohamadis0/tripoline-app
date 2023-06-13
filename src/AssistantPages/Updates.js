import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const colors = ['green', 'yellow', 'black'];
const colors1 = ['green', 'yellow', 'black'];

const Updates = () => {
  const [colorIndices, setColorIndices] = useState([0, 0, 0, 0, 0]);
  const [colorIndices1, setColorIndices1] = useState([0, 0, 0, 0, 0]);

  const handleClick = (index) => {
    setColorIndices((prevState) => {
      const newState = [...prevState];
      newState[index] = (newState[index] + 1) % colors.length;
      return newState;
    });
  };
  const handleClick1 = (index) => {
    setColorIndices1((prevState) => {
      const newState = [...prevState];
      newState[index] = (newState[index] + 1) % colors1.length;
      return newState;
    });
  };

  const renderItems = () => {
    return colorIndices.map((index, i) => (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
        <TouchableOpacity
          onPress={() => handleClick(i)}
          style={{
            backgroundColor: colors[index],
            borderRadius: 50,
            width: 25,
            height: 25,
          }}
        />
      </View>
      <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
      <Text>ساحة النور</Text>
      </View>
      <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
        <TouchableOpacity
          onPress={() => handleClick1(i)}
          style={{
            backgroundColor: colors1[index],
            borderRadius: 50,
            width: 25,
            height: 25,
          }}
        />
      </View>
      </View>
    ));
  };

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text>Abaa----Koura Lane{'\n'}</Text>
      </View>
      {renderItems()}
    </View>
  );
};

export default Updates;


