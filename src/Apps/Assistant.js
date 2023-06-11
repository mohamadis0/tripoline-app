import { View, Text, StyleSheet, Image, } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Service from '../AssistantPages/Service';
import Updates from '../AssistantPages/Updates';
import Settings from '../AssistantPages/Settings';

const Tab = createBottomTabNavigator();

function TabNavigator() {

  return (
    <Tab.Navigator screenOptions={{tabBarIcon: () => null, tabBarLabelStyle: styles.tabBarLabel}}>
      <Tab.Screen name="Service"  component={Service} options={{ headerShown: false}} />
      <Tab.Screen name="Updates" component={Updates} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}


const Assistant = () => {


  return (
    <NavigationContainer independent={true}>
      <TabNavigator />
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
    paddingBottom:13,
  },
});



