import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api';
import { gstyles } from '../styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('admin@morai.app');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', data.token);
      navigation.replace('Dashboard');
    } catch (e) {
      Alert.alert('Erro', 'Credenciais inválidas.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={gstyles.container}>
      <Text style={gstyles.h1}>Entrar</Text>
      <Text style={gstyles.p}>Use seu e-mail e senha.</Text>
      <TextInput style={gstyles.input} placeholder="E-mail" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={gstyles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={[gstyles.btn, gstyles.btnPrimary]} onPress={handleLogin} disabled={loading}>
        <Text style={gstyles.btnTextPrimary}>{loading ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>
      <Text style={{color:'#3FA9F5', fontWeight:'600', marginTop:10, textAlign:'center'}} onPress={() => navigation.navigate('Register')}>Criar conta</Text>
    </View>
  );
}
