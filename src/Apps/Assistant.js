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
      <BottomTab.Screen name="Service" component={Service} options={NavStyle} />
      <BottomTab.Screen name="Updates" component={Updates} options={NavStyle} />
      <BottomTab.Screen name="Settings" component={Settings} options={NavStyle} />
    </BottomTab.Navigator>
  );
}

const Assistant = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ tabBarLabelStyle: styles.tabBarLabel }}>
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