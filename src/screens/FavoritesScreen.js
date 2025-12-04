import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReceitasMyFood } from '../data/DataMyFood';

export default function FavoritesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('receitas');
  const [favRecipes, setFavRecipes] = useState([]);
  const [favIngredients, setFavIngredients] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const recipes = await AsyncStorage.getItem('@myfood_recipes');
      const ingredients = await AsyncStorage.getItem('@myfood_ingredients');
      
      if (recipes) {
        const parsedRecipes = JSON.parse(recipes);
        

        const updatedRecipes = parsedRecipes.map(savedItem => {
          const freshItem = ReceitasMyFood.find(r => r.id === savedItem.id);
          return freshItem || savedItem; 
        });

        setFavRecipes(updatedRecipes);
      }

      if (ingredients) setFavIngredients(JSON.parse(ingredients));
    } catch (e) { console.log(e); }
  };

  const clearIngredient = async (ingName) => {
    const newList = favIngredients.filter(i => i !== ingName);
    setFavIngredients(newList);
    await AsyncStorage.setItem('@myfood_ingredients', JSON.stringify(newList));
  };

  // --- RENDERIZAÇÃO DA RECEITA COM MINI FOTO ---
  const renderRecipe = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Detalhes', { item })}
    >
      {/* Imagem Quadrada (Miniatura) */}
      <Image 
        source={{ uri: item.imagem }} 
        style={styles.recipeImage} 
      />

      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.cardSub}>{item.categoria}</Text>
      </View>
      
      <Icon name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
  );

  const renderIngredient = ({ item }) => (
    <View style={styles.ingredientCard}>
      <TouchableOpacity 
        style={{flex: 1}} 
        onPress={() => navigation.navigate('ReceitasPorIngrediente', { ingredient: item })}
      >
        <Text style={styles.ingText}>{item}</Text>
        <Text style={styles.ingHint}>Ver receitas com isso</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => clearIngredient(item)} style={styles.trashBtn}>
        <Icon name="trash-outline" size={22} color="#D32F2F" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Favoritos</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'receitas' && styles.activeTab]}
          onPress={() => setActiveTab('receitas')}
        >
          <Text style={[styles.tabText, activeTab === 'receitas' && styles.activeTabText]}>Receitas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ingredientes' && styles.activeTab]}
          onPress={() => setActiveTab('ingredientes')}
        >
          <Text style={[styles.tabText, activeTab === 'ingredientes' && styles.activeTabText]}>Ingredientes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'receitas' ? (
          <FlatList
            data={favRecipes}
            keyExtractor={item => item.id}
            renderItem={renderRecipe}
            ListEmptyComponent={<Text style={styles.empty}>Nenhuma receita favoritada.</Text>}
          />
        ) : (
          <FlatList
            data={favIngredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderIngredient}
            ListEmptyComponent={<Text style={styles.empty}>Nenhum ingrediente salvo.</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDD0' },
  header: { padding: 20, backgroundColor: '#D32F2F' },
  headerTitle: { fontSize: 22, color: '#FFF', fontWeight: 'bold', textAlign:'center' },
  
  tabsContainer: { flexDirection: 'row', backgroundColor: '#FFF', elevation: 2 },
  tab: { flex: 1, padding: 15, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#FF9800' },
  tabText: { fontSize: 16, color: '#888', fontWeight: 'bold' },
  activeTabText: { color: '#D32F2F' },

  content: { flex: 1, padding: 15 },
  
  // --- CARD COM FOTO ---
  card: { 
    backgroundColor: '#FFF', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 10, 
    elevation: 2,
    flexDirection: 'row', 
    alignItems: 'center'
  },
  recipeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15, 
    backgroundColor: '#EEE'
  },
  textContainer: {
    flex: 1, 
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardSub: { fontSize: 12, color: '#FF9800', marginTop: 2 },
  
  ingredientCard: { 
    backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    elevation: 1 
  },
  ingText: { fontSize: 18, color: '#333', fontWeight: 'bold' },
  ingHint: { fontSize: 12, color: '#999' },
  trashBtn: { padding: 10 },
  empty: { textAlign: 'center', marginTop: 50, color: '#999', fontStyle: 'italic' }
});