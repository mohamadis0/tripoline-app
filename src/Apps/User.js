import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet,TouchableOpacity,Text,Image } from 'react-native'
import Account from '../UserPages/Account'
import Feedback from '../UserPages/Feedback'
import TimeTable from '../UserPages/TimeTable'
import LoginScreen from '../FirstPage/LoginScreen';
import { useDispatch } from 'react-redux'
import Table from '../UserPages/Table';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator()



function DrawerNavigator() {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handleLogout=()=>{
    navigation.navigate('LoginScreen')
    dispatch({ type: "LOGOUT" })
  }
  const NavStyle = {
    tabBarStyle: {
      height: '7%',
      paddingHorizontal: 5,
      paddingTop: 0,
      backgroundColor: '#E4EDEF',
      position: 'absolute',
      borderTopWidth: 0,
  },
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#115F76",
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={handleLogout}
        style={{ backgroundColor: "#fde052", margin: "18%", marginBottom: "22%", height: "60%", width: "65%", borderRadius: 15, justifyContent: "center", alignItems: 'center' }}>
        <Text style={{ color: "#115F76", fontWeight: "bold" }}>Logout</Text>
      </TouchableOpacity>

    ),
    headerTitle: () => (
      <Image
        source={require('../../assets/menu-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    ),
  };


  return (
    <BottomTab.Navigator screenOptions={NavStyle} tabBarOptions={{
      labelStyle: { fontSize: 15, color:"#115F76" },
      
       activeBackgroundColor: '#BCD2D8',
      }} >
      <BottomTab.Screen name="Timetable" component={TimeTable}  options={{ tabBarLabel: 'Table',
          tabBarIcon: () => (
            <AntDesign name="table" size={26} color={"#115F76"} />
          ),
          
          }} />
      <BottomTab.Screen name="Account" component={Account} options={{ tabBarLabel: 'Account',
          tabBarIcon: () => (
            <MaterialIcons name="account-box" size={26} color={"#115F76"} />
          ),
          
          }} /> 
      <BottomTab.Screen name="Feedback" component={Feedback} options={{ tabBarLabel: 'Feedback',
          tabBarIcon: () => (
            <MaterialIcons name="feedback" size={26} color={"#115F76"} />
          ),
          
          }} />  
    </BottomTab.Navigator>
  );
}

const User = () => {
  
  const NavStyle = {
    
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#115F76",
    },
   
    headerTitle: () => (
      <Image
        source={require('../../assets/menu-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    ),
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      <Stack.Navigator >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
          
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
        name="Table"
        component={Table}
        options={NavStyle}
      />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default User

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 13,
  },
  logo: {
    width: 150,
    height: 50,
  }
});
