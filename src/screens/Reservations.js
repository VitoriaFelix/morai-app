import React,{useEffect,useState} from 'react';
import { View,Text,TextInput,TouchableOpacity,FlatList } from 'react-native';
import { useSession } from '../auth/useSession'; import { api } from '../api';
export default function Reservations(){ const { me } = useSession(); const condoId = me?.memberships?.[0]?.condoId || me?.syndicOf?.[0];
  const [items,setItems]=useState([]); const [area,setArea]=useState('Salão de Festas'); const [when,setWhen]=useState('2025-10-20 19:00');
  const load=()=> api.get(`/condos/${condoId}/reservations`).then(r=>setItems(r.data)).catch(()=>{});
  useEffect(()=>{ if(condoId) load(); },[condoId]);
  const request=async()=>{ try{ await api.post(`/condos/${condoId}/reservations`,{area, startsAt: when, endsAt: when}); setArea(''); setWhen(''); load(); }catch{} };
  return (<View style={{padding:16}}>
    <Text style={{fontSize:22,fontWeight:'700'}}>Reservas</Text>
    <View style={{borderWidth:1,borderColor:'#eee',borderRadius:12,padding:12,marginTop:10}}>
      <TextInput placeholder="Área" value={area} onChangeText={setArea} style={{borderWidth:1,borderRadius:10,padding:10,marginBottom:8}}/>
      <TextInput placeholder="Quando" value={when} onChangeText={setWhen} style={{borderWidth:1,borderRadius:10,padding:10,marginBottom:8}}/>
      <TouchableOpacity onPress={request} style={{backgroundColor:'#3FA9F5',padding:12,borderRadius:12,alignItems:'center'}}><Text style={{color:'#fff',fontWeight:'700'}}>Solicitar</Text></TouchableOpacity>
    </View>
    <FlatList style={{marginTop:10}} data={items} keyExtractor={(i)=>String(i.id)} renderItem={({item})=>(
      <View style={{borderWidth:1,borderColor:'#eee',borderRadius:12,padding:12,marginBottom:8}}><Text style={{fontWeight:'700'}}>{item.area}</Text><Text style={{color:'#666'}}>{item.status}</Text></View>
    )}/>
  </View>); }
