import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import MapScreen from './src/screens/MapScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AboutScreen from './src/screens/AboutScreen';
import IngredientMatchesScreen from './src/screens/IngredientMatchesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyFoodTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: '#D32F2F', elevation: 0, shadowOpacity: 0 },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',

        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
            <Icon name="menu" size={30} color="#FFF" />
          </TouchableOpacity>
        ),

        tabBarStyle: {
            backgroundColor: '#FFF',
            borderTopColor: '#FF9800',
            borderTopWidth: 2,
            height: 60,
            paddingBottom: 5
        },
        tabBarActiveTintColor: '#D32F2F',
        tabBarInactiveTintColor: 'gray',

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'ListaCardapio') iconName = focused ? 'restaurant' : 'restaurant-outline';
          else if (route.name === 'Localizacao') iconName = focused ? 'map' : 'map-outline';
          else if (route.name === 'Favoritos') iconName = focused ? 'heart' : 'heart-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="ListaCardapio" component={HomeScreen} options={{ title: 'Cardápio' }} />
      <Tab.Screen name="Localizacao" component={MapScreen} options={{ title: 'Localização' }} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
    </Tab.Navigator>
  );
}

// --- DRAWER NAVIGATOR ---
function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Início"
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#FFFDD0' },
        drawerActiveTintColor: '#D32F2F',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: { fontWeight: 'bold', fontSize: 16 },
      }}
    >
      <Drawer.Screen name="Início" component={WelcomeScreen} options={{
          drawerIcon: ({color}) => <Icon name="home" size={22} color={color} />
      }}/>
      <Drawer.Screen name="Cardápio" component={MyFoodTabs} options={{
          title: 'Ver Cardápio',
          drawerIcon: ({color}) => <Icon name="restaurant" size={22} color={color} />
      }}/>
      <Drawer.Screen name="Sobre" component={AboutScreen} options={{
          title: 'Sobre o App',
          drawerIcon: ({color}) => <Icon name="information-circle" size={22} color={color} />
      }}/>
    </Drawer.Navigator>
  );
}

// --- ROOT STACK ---
export default function App() {

  useEffect(() => {
    async function configureNavigationBar() {
      if (Platform.OS === 'android') {
        await NavigationBar.setVisibilityAsync("hidden");
        await NavigationBar.setBehaviorAsync("overlay-swipe");
      }
    }
    configureNavigationBar();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#D32F2F" />
        <Stack.Navigator>

          <Stack.Screen
            name="RootDrawer"
            component={MyDrawer}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Detalhes"
            component={DetailScreen}
            options={{
              title: 'Detalhes do Prato',
              headerStyle: { backgroundColor: '#D32F2F' },
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen
            name="ReceitasPorIngrediente"
            component={IngredientMatchesScreen}
            options={{
              title: 'Busca por Ingrediente',
              headerStyle: { backgroundColor: '#D32F2F' },
              headerTintColor: '#fff',
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}