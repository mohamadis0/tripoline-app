import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import Account from '../UserPages/Account'
import Feedback from '../UserPages/Feedback'
import TimeTable from '../UserPages/TimeTable'

const Tab = createBottomTabNavigator();

function TabNavigator() {

  return (
    <Tab.Navigator screenOptions={{ tabBarLabelStyle: styles.tabBarLabel }}>
      <Tab.Screen name="Table" component={TimeTable} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="Feedback" component={Feedback} />
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
    paddingBottom: 13,
  },
});
