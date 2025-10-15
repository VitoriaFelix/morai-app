import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Dashboard from '../screens/Dashboard';
import Announcements from '../screens/Announcements';
import Reservations from '../screens/Reservations';
import Finance from '../screens/Finance';

const Stack = createNativeStackNavigator();

export default function RootNavigator(){
  const [initialRoute, setInitialRoute] = useState('Login');
  useEffect(()=>{ (async ()=>{
    const token = await AsyncStorage.getItem('token');
    setInitialRoute(token ? 'Dashboard' : 'Login');
  })(); }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }} initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Announcements" component={Announcements} />
        <Stack.Screen name="Reservations" component={Reservations} />
        <Stack.Screen name="Finance" component={Finance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
