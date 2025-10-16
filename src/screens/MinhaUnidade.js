import React,{useEffect,useState} from 'react';
import { View,Text,TextInput,TouchableOpacity,FlatList,Alert } from 'react-native';
import { useSession } from '../auth/useSession'; import { api } from '../api';
export default function MinhaUnidade(){ const { me } = useSession(); const unitId = me?.memberships?.[0]?.unitId;
  const [members,setMembers]=useState([]); const [email,setEmail]=useState(''); const [type,setType]=useState('MORADOR');
  const load=()=> api.get(`/units/${unitId}/members`).then(r=>setMembers(r.data)).catch(()=>{}); useEffect(()=>{ if(unitId) load(); },[unitId]);
  const add=async()=>{ try{ await api.post(`/units/${unitId}/members`,{ email, type }); setEmail(''); load(); }catch{ Alert.alert('Erro','Falha ao adicionar'); } };
  return (<View style={{padding:16}}>
    <Text style={{fontSize:22,fontWeight:'700'}}>Minha Unidade</Text>
    <View style={{borderWidth:1,borderColor:'#eee',borderRadius:12,padding:12,marginTop:10}}>
      <TextInput placeholder='email@exemplo.com' value={email} onChangeText={setEmail} style={{borderWidth:1,borderRadius:10,padding:10,marginBottom:8}}/>
      <View style={{flexDirection:'row',gap:8,marginBottom:8}}>
        {['MORADOR','DEPENDENTE','FUNCIONARIO'].map(opt=>(
          <TouchableOpacity key={opt} onPress={()=>setType(opt)} style={{borderWidth:1,borderColor: type===opt?'#3FA9F5':'#ddd',padding:10,borderRadius:10,marginRight:8}}>
            <Text style={{color: type===opt?'#3FA9F5':'#333'}}>{opt}</Text>
          </TouchableOpacity>))}
      </View>
      <TouchableOpacity onPress={add} style={{backgroundColor:'#3FA9F5',padding:12,borderRadius:12,alignItems:'center'}}><Text style={{color:'#fff',fontWeight:'700'}}>Adicionar</Text></TouchableOpacity>
    </View>
    <FlatList style={{marginTop:10}} data={members} keyExtractor={(m)=>String(m.membershipId)} renderItem={({item})=>(
      <View style={{borderWidth:1,borderColor:'#eee',borderRadius:12,padding:12,marginBottom:8}}><Text style={{fontWeight:'700'}}>{item.name}</Text><Text style={{color:'#666'}}>{item.type}</Text></View>
    )}/>
  </View>); }
