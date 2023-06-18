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


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();



function DrawerNavigator() {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handleLogout=()=>{
    navigation.navigate('LoginScreen')
    dispatch({ type: "LOGOUT" })
  }
  const NavStyle = {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#115F76",
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={handleLogout}
        style={{ backgroundColor: "#fde052", margin: 20, marginBottom: 30, height: 45, width: 70, borderRadius: 15, justifyContent: "center", alignItems: 'center' }}>
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
    <BottomTab.Navigator screenOptions={{ tabBarLabelStyle: styles.tabBarLabel }}>
      <BottomTab.Screen name="TimeTable" component={TimeTable} options={NavStyle}  />
      <BottomTab.Screen name="Account" component={Account} options={NavStyle} />
      <BottomTab.Screen name="Feedback" component={Feedback} options={NavStyle} />
    </BottomTab.Navigator>
  );
}

const User = () => {
  
  const dispatch = useDispatch()
  const handleLogout=()=>{
    navigation.navigate('LoginScreen')
    dispatch({ type: "LOGOUT" })
  }
  const NavStyle = {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#115F76",
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={handleLogout}
        style={{ backgroundColor: "#fde052", margin: 20, marginBottom: 30, height: 45, width: 70, borderRadius: 15, justifyContent: "center", alignItems: 'center' }}>
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
    <NavigationContainer>
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
