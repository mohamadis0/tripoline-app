import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Service from '../AssistantPages/Service';
import Settings from '../AssistantPages/Settings';
import Updates from '../AssistantPages/Updates';


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

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function DrawerNavigator() {
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