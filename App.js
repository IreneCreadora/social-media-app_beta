import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import RegistrationScreen from "./src/screens/RegistrationScreen";
// import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B4371",
  },
});
