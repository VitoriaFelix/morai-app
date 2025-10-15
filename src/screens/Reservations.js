import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { gstyles } from '../styles';

export default function Reservations(){
  const [items, setItems] = useState([{id:'1', area:'Salão de Festas', when:'Sáb 14:00', status:'Confirmado'},{id:'2', area:'Churrasqueira', when:'Dom 12:00', status:'Pendente'}]);
  const [area, setArea] = useState(''); const [when, setWhen] = useState('');
  function addItem(){ if(!area.trim()||!when.trim()) return; setItems([{id:Date.now().toString(), area, when, status:'Pendente'}, ...items]); setArea(''); setWhen(''); }
  return (
    <View style={gstyles.container}>
      <Text style={gstyles.h1}>Reservas</Text>
      <View style={gstyles.card}>
        <TextInput style={gstyles.input} placeholder="Área (ex: Salão de Festas)" value={area} onChangeText={setArea} />
        <TextInput style={gstyles.input} placeholder="Quando (ex: 20/10 19:00)" value={when} onChangeText={setWhen} />
        <TouchableOpacity style={[gstyles.btn, gstyles.btnPrimary]} onPress={addItem}><Text style={gstyles.btnTextPrimary}>Solicitar</Text></TouchableOpacity>
      </View>
      <FlatList data={items} keyExtractor={i=>i.id} renderItem={({item})=> (
        <View style={gstyles.card}><Text style={gstyles.h2}>{item.area}</Text><Text style={gstyles.p}>{item.when} — {item.status}</Text></View>
      )}/>
    </View>
  );
}
