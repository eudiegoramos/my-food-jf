import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  
  const RESTAURANTE_LAT = -21.778021;
  const RESTAURANTE_LON = -43.329338;

  const mapHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { width: 100%; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>

          var map = L.map('map').setView([${RESTAURANTE_LAT}, ${RESTAURANTE_LON}], 16);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(map);

          var restIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          L.marker([${RESTAURANTE_LAT}, ${RESTAURANTE_LON}], {icon: restIcon})
            .addTo(map)
            .bindPopup("<b>MyFoodJF</b><br>Rua Principal, Juiz de Fora<br>Aberto para retirada!")
            .openPopup();
        </script>
      </body>
      </html>
    `;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Venha nos visitar!</Text>
            <Text style={styles.subtitleText}>Juiz de Fora - MG</Text>
        </View>
      </View>
      
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 15,
    backgroundColor: '#D32F2F', 
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF', 
  },
  subtitleText: {
    fontSize: 14,
    color: '#FFF', 
    marginTop: 4, 
  },
  webview: {
    flex: 1,
  },
});