/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ActivityManager from './contexts/ActivityManager';
import ActivitiesScreen from './screens/ActivitiesScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import MyEventsScreen from './screens/MyEventsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () =>
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Make Activity" component={CreateEventScreen} />
      <Tab.Screen name="My Events" component={MyEventsScreen} />
    </Tab.Navigator>
  </NavigationContainer>

const App = () => {

  return (
    <ActivityManager>
      <AppNavigator />
    </ActivityManager>
  );
};


export default App;
