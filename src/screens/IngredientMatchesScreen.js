import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReceitasMyFood } from '../data/DataMyFood';

export default function IngredientMatchesScreen({ route, navigation }) {
  const { ingredient } = route.params;

  const matches = ReceitasMyFood.filter(receita => 
    receita.ingredientes.includes(ingredient)
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Detalhes', { item })}
    >
      <Image source={{ uri: item.imagem }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.category}>{item.categoria}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Receitas com "{ingredient}"</Text>
        <Text style={styles.countText}>{matches.length} encontradas</Text>
      </View>

      <FlatList
        data={matches}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma receita encontrada com este ingrediente.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDD0' },
  header: { padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#D32F2F' },
  countText: { color: '#666', marginTop: 5 },
  list: { padding: 15 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    alignItems: 'center'
  },
  cardImage: { width: 80, height: 80 },
  cardContent: { padding: 15, flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  category: { fontSize: 12, color: '#FF9800', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});