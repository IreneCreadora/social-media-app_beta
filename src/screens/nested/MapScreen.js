import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => (
  <View style={styles.container}>
    <MapView
      style={styles.full}
      initialRegion={{
        latitude: 50.516339,
        longitude: 30.602185,
        latitudeDelta: 0.001,
        longitudeDelta: 0.006,
      }}
    >
      <Marker
        coordinate={{ latitude: 50.516339, longitude: 30.602185 }}
        title="travel photo"
      />
    </MapView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  full: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
