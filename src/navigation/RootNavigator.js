import React,{useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './auth/AuthStack';
import Tabs from './tabs/Tabs';
const Stack=createNativeStackNavigator();
export default function RootNavigator(){ const [initial,setInitial]=useState('Auth');
useEffect(()=>{(async()=>{const t=await AsyncStorage.getItem('token'); setInitial(t?'App':'Auth');})();},[]);
return(<NavigationContainer><Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={initial}><Stack.Screen name='Auth' component={AuthStack}/><Stack.Screen name='App' component={Tabs}/></Stack.Navigator></NavigationContainer>); }
