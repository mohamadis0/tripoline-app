// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { CheckBox } from 'react-native-elements';

// const colors = ['green', 'yellow', 'black'];

// const Updates = () => {
//   const [colorIndex, setColorIndex] = useState(0);
//   const [colorIndex1, setColorIndex1] = useState(0);

//   const handleClick = (index, s) => {
//     s((index + 1) % colors.length);
//   };

//   return (
//     <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
//       <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//         <Text>Abaa----Koura Lane{'\n'}</Text>
//       </View>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
//         <TouchableOpacity onPress={() => handleClick(colorIndex1, setColorIndex1)} style={{
//           backgroundColor: colors[colorIndex1], borderRadius: 50, width: 25, height: 25,
//         }}>
//         </TouchableOpacity>
//         <Text> ساحة النور </Text>
//         <TouchableOpacity onPress={() => handleClick(colorIndex, setColorIndex)} style={{
//           backgroundColor: colors[colorIndex], borderRadius: 50, width: 25, height: 25,
//         }}>
//         </TouchableOpacity>
//       </View>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
//         <TouchableOpacity onPress={() => handleClick(colorIndex1, setColorIndex1)} style={{
//           backgroundColor: colors[colorIndex1], borderRadius: 50, width: 25, height: 25,
//         }}>
//         </TouchableOpacity>
//         <Text> ساحة النور </Text>
//         <TouchableOpacity onPress={() => handleClick(colorIndex, setColorIndex)} style={{
//           backgroundColor: colors[colorIndex], borderRadius: 50, width: 25, height: 25,
//         }}>
//         </TouchableOpacity>
//       </View>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
//         <TouchableOpacity onPress={() => handleClick(colorIndex1, setColorIndex1)} style={{
//           backgroundColor: colors[colorIndex1], borderRadius: 50, width: 25, height: 25,
//         }}>
//         </TouchableOpacity>
//         <Text> ساحة النور </Text>
//         <TouchableOpacity onPress={() => handleClick(colorIndex, setColorIndex)} style={{
//           backgroundColor: colors[colorIndex], borderRadius: 50, width: 25, height: 25,
//         }}>
//         </TouchableOpacity>
//       </View>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
//         <TouchableOpacity onPress={() => handleClick(colorIndex1, setColorIndex1)} style={{
//           backgroundColor: colors[colorIndex1], borderRadius: 50, width: 25, height: 25,
//         }}>
//         </TouchableOpacity>
//         <Text> ساحة النور </Text>
//         <TouchableOpacity onPress={() => handleClick(colorIndex, setColorIndex)} style={{
//           backgroundColor: colors[colorIndex], borderRadius: 50, width: 25, height: 25,
//         }}>
//         </TouchableOpacity>
//       </View>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
//         <TouchableOpacity onPress={() => handleClick(colorIndex1, setColorIndex1)} style={{
//           backgroundColor: colors[colorIndex1], borderRadius: 50, width: 25, height: 25,
//         }}>
//         </TouchableOpacity>
//         <Text> ساحة النور </Text>
//         <TouchableOpacity onPress={() => handleClick(colorIndex, setColorIndex)} style={{
//           backgroundColor: colors[colorIndex], borderRadius: 50, width: 25, height: 25,
//         }}>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Updates;



import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const colors = ['green', 'yellow', 'black'];

const Updates = () => {
  const [colorIndices, setColorIndices] = useState([0, 0, 0, 0, 0]);

  const handleClick = (index) => {
    setColorIndices((prevState) => {
      const newState = [...prevState];
      newState[index] = (newState[index] + 1) % colors.length;
      return newState;
    });
  };

  const renderItems = () => {
    return colorIndices.map((index, i) => (
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
        <Text>  ساحة النور </Text>
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


