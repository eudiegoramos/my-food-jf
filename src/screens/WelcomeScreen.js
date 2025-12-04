import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importação do SafeArea
import Icon from 'react-native-vector-icons/Ionicons';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={() => navigation.openDrawer()}
      >
        <Icon name="menu" size={30} color="#D32F2F" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>MyFood<Text style={{color:'#FF9800'}}>JF</Text></Text>
        <Text style={styles.subtitle}>O melhor sabor caseiro e fitness</Text>
        <Text style={styles.subtitle}>direto para sua mesa.</Text>
        
        <Image 
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/706/706164.png'}} 
          style={styles.logo} 
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Cardápio')} 
        >
          <Text style={styles.buttonText}>VER CARDÁPIO</Text>
        </TouchableOpacity>
        
        <Text style={styles.hint}>Toque no menu ou deslize para ver opções</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDD0', 
  },
  menuButton: {
    position: 'absolute',
    top: 50, 
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  content: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#D32F2F', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hint: {
    marginTop: 20,
    color: '#999',
    fontSize: 12,
  }
});