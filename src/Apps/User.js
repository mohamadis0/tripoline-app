import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Account from '../UserPages/Account'
import Feedback from '../UserPages/Feedback'
import TimeTable from '../UserPages/TimeTable'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Table from '../UserPages/Table'

const Tab = createBottomTabNavigator();

function TabNavigator() {

  return (
    <Tab.Navigator screenOptions={{tabBarIcon: () => null, tabBarLabelStyle: styles.tabBarLabel}}>
      <Tab.Screen name="Lines" component={TimeTable} options={{ headerShown: false }} />
      <Tab.Screen name="Table" component={Table} options={{ headerShown: false }} />
      <Tab.Screen name="Account"  component={Account} options={{ headerShown: false}} />
      <Tab.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

const User = () => {
  return (
    <NavigationContainer independent={true}>
      <TabNavigator />
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
      fontSize: 14,
      fontWeight: 'bold',
      paddingBottom:13,
    },
  });
  