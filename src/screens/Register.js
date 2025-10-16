import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { api } from '../api';
export default function Register({ navigation }) {
  const [role, setRole] = useState('MORADOR');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function handleRegister(){ try{ await api.post('/auth/register',{name,email,password,role}); Alert.alert('Conta criada','Faça login.'); navigation.goBack(); }catch{ Alert.alert('Erro','Não foi possível criar sua conta.'); } }
  return (<View style={{padding:16}}>
    <Text style={{fontSize:28,fontWeight:'800',marginBottom:12}}>Criar conta</Text>
    <View style={{flexDirection:'row',gap:8,marginBottom:12}}>
      {['MORADOR','SINDICO','ADMIN'].map(opt=> (<TouchableOpacity key={opt} onPress={()=>setRole(opt)} style={{borderWidth:1,borderColor: role===opt?'#3FA9F5':'#ddd',padding:10,borderRadius:12,marginRight:8}}><Text style={{color: role===opt?'#3FA9F5':'#333'}}>{opt}</Text></TouchableOpacity>))}
    </View>
    <TextInput style={{borderWidth:1,borderRadius:12,padding:12,marginBottom:10}} placeholder="Nome" value={name} onChangeText={setName}/>
    <TextInput style={{borderWidth:1,borderRadius:12,padding:12,marginBottom:10}} placeholder="E-mail" autoCapitalize="none" value={email} onChangeText={setEmail}/>
    <TextInput style={{borderWidth:1,borderRadius:12,padding:12,marginBottom:10}} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword}/>
    <TouchableOpacity onPress={handleRegister} style={{backgroundColor:'#3FA9F5',padding:14,borderRadius:14,alignItems:'center'}}><Text style={{color:'#fff',fontWeight:'700'}}>Criar conta</Text></TouchableOpacity>
  </View>); }
