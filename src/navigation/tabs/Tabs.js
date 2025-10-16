import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../../screens/Dashboard';
import Announcements from '../../screens/Announcements';
import Reservations from '../../screens/Reservations';
import Finance from '../../screens/Finance';
import MinhaUnidade from '../../screens/MinhaUnidade';
import { Ionicons } from '@expo/vector-icons';
const Tab=createBottomTabNavigator();
export default function Tabs(){ return(
<Tab.Navigator screenOptions={({route})=>({headerShown:false,tabBarIcon:({size})=>{const map={Home:'home',Comunicados:'megaphone',Reservas:'calendar',Financeiro:'card',Unidade:'people'};return <Ionicons name={map[route.name]||'ellipse'} size={size}/>;}})}>
<Tab.Screen name='Home' component={Dashboard}/>
<Tab.Screen name='Comunicados' component={Announcements}/>
<Tab.Screen name='Reservas' component={Reservations}/>
<Tab.Screen name='Financeiro' component={Finance}/>
<Tab.Screen name='Unidade' component={MinhaUnidade}/>
</Tab.Navigator> ); }
