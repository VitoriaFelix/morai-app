import React,{useEffect,useState} from 'react';
import { View,Text,FlatList,TouchableOpacity,Linking } from 'react-native';
import { useSession } from '../auth/useSession'; import { api } from '../api';
export default function Finance(){ const { me } = useSession(); const unitId = me?.memberships?.find(m=>m.type==='TITULAR')?.unitId; const [items,setItems]=useState([]);
  useEffect(()=>{ if(unitId) api.get(`/units/${unitId}/boletos`).then(r=>setItems(r.data)); },[unitId]);
  return (<View style={{padding:16}}><Text style={{fontSize:22,fontWeight:'700'}}>Financeiro</Text>
    <FlatList style={{marginTop:10}} data={items} keyExtractor={(i)=>String(i.id)} renderItem={({item})=>(
      <View style={{borderWidth:1,borderColor:'#eee',borderRadius:12,padding:12,marginBottom:8}}>
        <Text style={{fontWeight:'700'}}>{item.month}</Text>
        <Text style={{color:'#666'}}>R$ {(item.valueCents/100).toFixed(2)} — {item.status}</Text>
        {!!item.url && <TouchableOpacity onPress={()=>Linking.openURL(item.url)}><Text style={{color:'#3FA9F5'}}>Abrir boleto</Text></TouchableOpacity>}
      </View>)}/></View>); }
