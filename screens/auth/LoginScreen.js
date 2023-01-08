import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  console.log(navigation);
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  const onSubmit = () => {
    if (!state.email || !state.password) {
      return Alert.alert("Error", "Please, enter name, email and  password");
    }
    console.log(state);
    keyboardHide();
    setstate(initialState);
  };
  const [fontsLoaded] = useFonts({
    "EastSeaDokdo-Regular": require("../../assets/fonts/EastSeaDokdo-Regular.ttf"),
    "Roboto-Italic": require("../../assets/fonts/Roboto-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/background.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View style={styles.frame}>
              <Text style={styles.headerTitle}>Log in</Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  textAlign={"left"}
                  placeholder={"Email address"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  textAlign={"left"}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setstate((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                onPress={() => onSubmit()}
              >
                <Text style={styles.btnTitle}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.titleLink}>
                  Don't have an account? Sign up!
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  frame: {
    paddingTop: 32,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
  },
  headerTitle: {
    fontFamily: "EastSeaDokdo-Regular",
    fontSize: 60,
    lineHeight: 55,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
  },
  inputField: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#E8E8E8",
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
  },

  btn: {
    borderRadius: 100,
    height: 51,
    marginTop: 43,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  titleLink: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginBottom: 45,
    fontFamily: "Roboto-Italic",
  },
});
