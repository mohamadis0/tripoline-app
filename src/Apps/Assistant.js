import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Service from '../AssistantPages/Service';
import Settings from '../AssistantPages/Settings';
import Updates from '../AssistantPages/Updates';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from '../FirstPage/LoginScreen';
import { useDispatch } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();


function DrawerNavigator() {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const handleLogout=()=>{
    navigation.navigate('LoginScreen')
    dispatch({ type: "LOGOUT"})
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
        
        style={{ backgroundColor: "#fde052",  margin: "18%", marginBottom: "22%", height: "60%", width: "65%", borderRadius: 15, justifyContent: "center", alignItems: 'center' }}>
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
      }}>
      <BottomTab.Screen name="Service" component={Service} options={{ tabBarLabel: 'Service',
          tabBarIcon: () => (
            <MaterialIcons name="miscellaneous-services" size={26} color={"#115F76"} />
          ),
          
          }} />
      <BottomTab.Screen name="Updates" component={Updates} options={{ tabBarLabel: 'Update',
          tabBarIcon: () => (
            <MaterialIcons name="system-update-alt" size={26} color={"#115F76"} />
          ),
          
          }}  />
      <BottomTab.Screen name="Settings" component={Settings} options={{ tabBarLabel: 'Settings',
          tabBarIcon: () => (
            <MaterialIcons name="settings-applications" size={26} color={"#115F76"} />
          ),
          
          }}  />
    </BottomTab.Navigator>
  );
}

const Assistant = () => {

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Assistant

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
    height: 150,
  }
});