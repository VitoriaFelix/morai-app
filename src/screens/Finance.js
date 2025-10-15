import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { gstyles } from '../styles';

export default function Finance(){
  const [items] = useState([{id:'1', month:'Set/2025', value:'R$ 530,00', status:'Pendente'},{id:'2', month:'Ago/2025', value:'R$ 530,00', status:'Pago'}]);
  return (
    <View style={gstyles.container}>
      <Text style={gstyles.h1}>Financeiro</Text>
      <FlatList data={items} keyExtractor={i=>i.id} renderItem={({item})=> (
        <View style={gstyles.card}><Text style={gstyles.h2}>{item.month}</Text><Text style={gstyles.p}>{item.value} — {item.status}</Text></View>
      )}/>
    </View>
  );
}
