import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { gstyles } from '../styles';

export default function Announcements(){
  const [items, setItems] = useState([{id:'1', title:'Limpeza da caixa d’água', date:'Hoje'},{id:'2', title:'Manutenção dos elevadores', date:'Amanhã'}]);
  const [title, setTitle] = useState('');
  function addItem(){ if(!title.trim()) return; setItems([{id:Date.now().toString(), title, date:'Novo'}, ...items]); setTitle(''); }
  return (
    <View style={gstyles.container}>
      <Text style={gstyles.h1}>Comunicados</Text>
      <View style={gstyles.card}>
        <TextInput style={gstyles.input} placeholder="Novo comunicado..." value={title} onChangeText={setTitle} />
        <TouchableOpacity style={[gstyles.btn, gstyles.btnPrimary]} onPress={addItem}><Text style={gstyles.btnTextPrimary}>Publicar</Text></TouchableOpacity>
      </View>
      <FlatList data={items} keyExtractor={i=>i.id} renderItem={({item})=> (
        <View style={gstyles.card}><Text style={gstyles.h2}>{item.title}</Text><Text style={gstyles.p}>{item.date}</Text></View>
      )}/>
    </View>
  );
}
