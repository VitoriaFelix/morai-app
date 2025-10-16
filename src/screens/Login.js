import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('admin@morai.app');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', data.token);
      navigation.replace('App');
    } catch (e) {
      Alert.alert('Erro', 'Credenciais inválidas.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight:'800', marginBottom:12 }}>Entrar</Text>
      <TextInput style={{ borderWidth:1, borderRadius:12, padding:12, marginBottom:10 }} placeholder="E-mail" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={{ borderWidth:1, borderRadius:12, padding:12, marginBottom:10 }} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor:'#3FA9F5', padding:14, borderRadius:14, alignItems:'center' }}>
        <Text style={{ color:'#fff', fontWeight:'700' }}>{loading ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>
      <Text onPress={()=>navigation.navigate('Register')} style={{ color:'#3FA9F5', textAlign:'center', marginTop:12 }}>Criar conta</Text>
    </View>
  );
}
