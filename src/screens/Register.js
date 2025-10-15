import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { api } from '../api';
import { gstyles } from '../styles';

export default function Register({ navigation }) {
  const [role, setRole] = useState('MORADOR'); // ADMIN | SINDICO | MORADOR
  const [name, setName] = useState('Morador Demo');
  const [email, setEmail] = useState('morador@morai.app');
  const [password, setPassword] = useState('123456');

  async function handleRegister() {
    try {
      await api.post('/auth/register', { name, email, password, role });
      Alert.alert('Conta criada!', 'Faça o login para continuar.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível criar sua conta.');
    }
  }

  return (
    <View style={gstyles.container}>
      <Text style={gstyles.h1}>Criar conta</Text>
      <Text style={gstyles.p}>Selecione seu perfil e preencha os dados.</Text>
      <View style={{ flexDirection:'row', gap:8, marginBottom:12 }}>
        {['MORADOR','SINDICO','ADMIN'].map(opt => (
          <TouchableOpacity key={opt} onPress={()=>setRole(opt)} style={[gstyles.btn, {borderWidth:1, borderColor: role===opt ? '#3FA9F5' : '#e5e5e5'}]}>
            <Text style={{color: role===opt ? '#3FA9F5' : '#333'}}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput style={gstyles.input} placeholder="Nome completo" value={name} onChangeText={setName} />
      <TextInput style={gstyles.input} placeholder="E-mail" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={gstyles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={[gstyles.btn, gstyles.btnPrimary]} onPress={handleRegister}>
        <Text style={gstyles.btnTextPrimary}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
