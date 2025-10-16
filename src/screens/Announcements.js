import React,{useEffect,useState} from 'react';
import { View,Text,TextInput,TouchableOpacity,FlatList } from 'react-native';
import { useSession } from '../auth/useSession'; import { api } from '../api';
export default function Announcements(){ const { me } = useSession(); const condoId = me?.syndicOf?.[0] || me?.memberships?.[0]?.condoId;
  const [items,setItems]=useState([]); const [title,setTitle]=useState('');
  const load=()=> api.get(`/condos/${condoId}/announcements`).then(r=>setItems(r.data)).catch(()=>{});
  useEffect(()=>{ if(condoId) load(); },[condoId]);
  const publish=async()=>{ try{ await api.post(`/condos/${condoId}/announcements`,{title, body:''}); setTitle(''); load(); }catch{} };
  return (<View style={{padding:16}}>
    <Text style={{fontSize:22,fontWeight:'700'}}>Comunicados</Text>
    <View style={{borderWidth:1,borderColor:'#eee',borderRadius:12,padding:12,marginTop:10}}>
      <TextInput placeholder="Novo comunicado..." value={title} onChangeText={setTitle} style={{borderWidth:1,borderRadius:10,padding:10,marginBottom:8}}/>
      <TouchableOpacity onPress={publish} style={{backgroundColor:'#3FA9F5',padding:12,borderRadius:12,alignItems:'center'}}><Text style={{color:'#fff',fontWeight:'700'}}>Publicar</Text></TouchableOpacity>
    </View>
    <FlatList style={{marginTop:10}} data={items} keyExtractor={(i)=>String(i.id)} renderItem={({item})=>(
      <View style={{borderWidth:1,borderColor:'#eee',borderRadius:12,padding:12,marginBottom:8}}><Text style={{fontWeight:'700'}}>{item.title}</Text><Text style={{color:'#666'}}>{new Date(item.createdAt||Date.now()).toLocaleString()}</Text></View>
    )}/>
  </View>); }
