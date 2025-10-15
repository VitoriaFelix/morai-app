import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api';
import { gstyles } from '../styles';

export default function Dashboard({ navigation }) {
  const [me, setMe] = useState(null);
  useEffect(()=>{ api.get('/me').then(r=>setMe(r.data)).catch(()=>{}); }, []);

  async function logout(){ await AsyncStorage.removeItem('token'); navigation.replace('Login'); }

  const Card = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[gstyles.card, {backgroundColor:'#fff'}]}>
      <Text style={gstyles.h2}>{title}</Text>
      <Text style={gstyles.p}>Acessar</Text>
    </TouchableOpacity>
  );

  return (
    <View style={gstyles.container}>
      <Text style={gstyles.h1}>Olá, {me?.name || 'usuário'} 👋</Text>
      <Text style={gstyles.p}>Escolha um módulo para começar</Text>
      <Card title="Comunicados" onPress={()=>navigation.navigate('Announcements')} />
      <Card title="Reservas" onPress={()=>navigation.navigate('Reservations')} />
      <Card title="Financeiro" onPress={()=>navigation.navigate('Finance')} />
      <TouchableOpacity style={[gstyles.btn, {borderWidth:1, borderColor:'#e5e5e5'}]} onPress={logout}><Text>Sair</Text></TouchableOpacity>
    </View>
  );
}
