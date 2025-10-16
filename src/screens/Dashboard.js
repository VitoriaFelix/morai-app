import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSession } from '../auth/useSession';

export default function Dashboard() {
  const { me, loading } = useSession();
  const navigation = useNavigation();

  if (loading) return <Text style={{ padding: 16 }}>Carregando...</Text>;

  async function handleLogout() {
    await AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  }

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
      <View>
        <Text style={{ fontSize: 22, fontWeight: '700' }}>
          Olá, {me?.name || 'usuário'} 👋
        </Text>
        <Text style={{ marginTop: 8 }}>
          Perfil: {me?.roles?.join(', ') || '...'}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#FF5A5F',
          padding: 14,
          borderRadius: 14,
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
