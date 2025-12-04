import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ReceitasMyFood } from '../data/DataMyFood';

export default function DetailScreen({ route }) {
  const { item: initialItem } = route.params; 


  const item = ReceitasMyFood.find(r => r.id === initialItem.id) || initialItem;

  const [isRecipeFav, setIsRecipeFav] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, );

  const checkFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem('@myfood_recipes');
      const list = stored ? JSON.parse(stored) : [];
      const exists = list.some(fav => fav.id === item.id);
      setIsRecipeFav(exists);
    } catch (e) { console.log(e); }
  };

  const toggleRecipeFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem('@myfood_recipes');
      let list = stored ? JSON.parse(stored) : [];
      
      if (isRecipeFav) {
        list = list.filter(fav => fav.id !== item.id);
        Alert.alert("Removido", "Receita removida dos favoritos.");
      } else {
        list.push(item);
        Alert.alert("Salvo", "Receita adicionada aos favoritos!");
      }
      
      await AsyncStorage.setItem('@myfood_recipes', JSON.stringify(list));
      setIsRecipeFav(!isRecipeFav);
    } catch (e) { Alert.alert("Erro", "Não foi possível salvar."); }
  };

  const saveIngredient = async (ingredient) => {
    try {
      const stored = await AsyncStorage.getItem('@myfood_ingredients');
      let list = stored ? JSON.parse(stored) : [];
      
      if (!list.includes(ingredient)) {
        list.push(ingredient);
        await AsyncStorage.setItem('@myfood_ingredients', JSON.stringify(list));
        Alert.alert("Ingrediente Salvo", `${ingredient} foi salvo em sua lista!`);
      } else {
        Alert.alert("Aviso", "Este ingrediente já está na lista.");
      }
    } catch (e) { console.log(e); }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView>
        <Image 
          source={{ uri: item.imagem }} 
          style={styles.image} 
          resizeMode="cover" 
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{item.titulo}</Text>
            <TouchableOpacity onPress={toggleRecipeFavorite}>
              <Icon 
                name={isRecipeFav ? "heart" : "heart-outline"} 
                size={30} 
                color="#D32F2F" 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.category}>{item.categoria}</Text>
          <Text style={styles.price}>Preço Unitário: R$ {item.preco}</Text>
          <Text style={styles.description}>{item.descricao}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Ingredientes</Text>
          <Text style={styles.hint}>Toque no '+' para favoritar um ingrediente</Text>
          
          {item.ingredientes && item.ingredientes.map((ing, index) => (
            <View key={index} style={styles.ingredientRow}>
              <Text style={styles.ingredientText}>• {ing}</Text>
              <TouchableOpacity onPress={() => saveIngredient(ing)}>
                <Icon name="add-circle-outline" size={24} color="#FF9800" />
              </TouchableOpacity>
            </View>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDD0' },
  image: { 
    width: '100%', 
    height: 250, 
    backgroundColor: '#ddd' 
  },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#D32F2F', flex: 1 },
  category: { fontSize: 16, color: '#FF9800', fontWeight: 'bold', marginTop: 5 },
  price: { fontSize: 18, color: '#333', marginTop: 5, fontWeight: 'bold' },
  description: { fontSize: 16, color: '#555', marginTop: 15, lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#CCC', marginVertical: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  hint: { fontSize: 12, color: '#888', marginBottom: 15, fontStyle: 'italic' },
  ingredientRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  ingredientText: { fontSize: 16, color: '#444' }
});