import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ReceitasMyFood } from '../data/DataMyFood'; 
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  
  const [curiosidade, setCuriosidade] = useState('');
  const [loadingApi, setLoadingApi] = useState(true);

  useEffect(() => {
    fetchCuriosity();
  }, []);

  const fetchCuriosity = async () => {
    try {
      setLoadingApi(true);
      const response = await fetch('https://meowfacts.herokuapp.com/?lang=por-br');
      const json = await response.json();
      
      if (json.data && json.data.length > 0) {
        setCuriosidade(json.data[0]);
      } else {
        setCuriosidade("A gastronomia é a arte de usar comida para criar felicidade.");
      }

    } catch (error) {
      console.error("Erro na API:", error);
      setCuriosidade("A melhor comida é aquela feita com carinho.");
    } finally {
      setLoadingApi(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Detalhes', { item })}
    >
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.category}>{item.categoria.toUpperCase()}</Text>
          <Text style={styles.title}>{item.titulo}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.descricao}</Text>
          <Text style={styles.price}>R$ {item.preco}</Text>
        </View>
        
        {item.imagem && (
          <Image source={{ uri: item.imagem }} style={styles.cardImage} />
        )}
      </View>
    </TouchableOpacity>
  );

  // --- COMPONENTE DO TOPO (Header da Lista) ---
  const renderHeader = () => (
    <View style={styles.apiContainer}>
      <View style={styles.apiHeaderRow}>
        <Icon name="bulb" size={20} color="#FFD700" />
        <Text style={styles.apiTitle}>Curiosidade do Dia</Text>
        <Icon name="bulb" size={20} color="#FFD700" />
      </View>

      {loadingApi ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color="#FFF" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.quoteText}>"{curiosidade}"</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ReceitasMyFood}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDD0' },
  listContent: { padding: 15 },
  
  // --- ESTILOS DA ÁREA DA API ---
  apiContainer: {
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#B71C1C'
  },
  apiHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  apiTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 10,
    textTransform: 'uppercase'
  },
  quoteText: {
    color: '#FFF',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20
  },
  loadingBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 12
  },

  // --- ESTILOS DO CARD ---
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    overflow: 'hidden'
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    marginRight: 10
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#eee'
  },
  category: {
    fontSize: 10,
    color: '#FF9800',
    fontWeight: 'bold',
    marginBottom: 2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8
  },
  price: {
    fontSize: 16,
    color: '#D32F2F',
    fontWeight: 'bold'
  }
});