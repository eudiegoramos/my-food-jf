import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AboutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Icon name="restaurant" size={100} color="#FF9800" />

        <Text style={styles.title}>Sobre o MyFood<Text style={{color:'#FF9800'}}>JF</Text></Text>

        <View style={styles.card}>
          <Text style={styles.description}>
            O <Text style={styles.bold}>MyFoodJF</Text> é o seu aplicativo oficial para encomendar as melhores refeições congeladas, marmitex e bolos caseiros.
          </Text>
          <Text style={styles.description}>
            Nossa missão é levar sabor, praticidade e saúde para sua mesa, com ingredientes selecionados e aquele tempero de casa.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Funcionalidades do App:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Menu Lateral:</Text> Navegue entre Início, Cardápio e Sobre.</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Cardápio:</Text> Veja nossas opções de Marmitex, Fitness e Bolos.</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Localização:</Text> Veja a localização da cozinha em tempo real (API).</Text>
          <Text style={styles.listItem}>• <Text style={styles.bold}>Favoritos:</Text> Salve suas receitas e ingredientes preferidos.</Text>
        </View>

        <Text style={styles.footer}>Desenvolvido para o Trabalho Final</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Início')}
        >
          <Text style={styles.buttonText}>VOLTAR AO INÍCIO</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFDD0',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#D32F2F'
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 10,
  },
  list: {
    alignSelf: 'flex-start',
    marginBottom: 30,
    marginLeft: 10,
  },
  listItem: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});