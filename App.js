
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Assistant from './src/Apps/Assistant';
import User from './src/Apps/User';
import Details from './src/FirstPage/Details';
import Table from './src/UserPages/Table';
import rootReducer from './src/reducers/rootReducer'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

const loggerMiddleware = createLogger();
const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)
const composedEnhancers = compose(middlewareEnhancer)
const Stack = createStackNavigator();




const store = createStore(rootReducer, undefined, composedEnhancers)

function StackNavigator() {
  const [isLineDetails, setIsLineDetails] = useState(false)
  const NavStyle = {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#115F76",
    },
    headerLeft: () => null,
    headerTitle: () => (
      <Image
        source={require('./assets/menu-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    ),
  
    // headerRight: ({ handleRightButtonPress }) => (
  
    //   <TouchableOpacity onPress={handleRightButtonPress}>
    //     <Text>logout</Text>
    //   </TouchableOpacity>
    // ),
  };
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen name="details" component={Details} options={NavStyle} />
        <Stack.Screen name="assis" component={Assistant} options={NavStyle} />
        <Stack.Screen name="User" component={User} options={NavStyle} />
      </Stack.Navigator>
    </Provider>
  )
}


export default function App() {



  return (

    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
  )
}



const styles = StyleSheet.create({
  logo: {

    width: 150,
    height: 150,

  },

});



