import React, { useState } from "react";
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
} from "react-native";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/background.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.frame,
                marginBottom: isShowKeyboard ? 100 : 0,
              }}
            >
              <Text style={styles.headerTitle}>Sign up</Text>
              <View style={styles.form}>
                <View style={styles.inputField}>
                  <TextInput
                    style={styles.input}
                    textAlign={"left"}
                    placeholder={"Name"}
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.name}
                    onChangeText={(value) =>
                      setstate((prevState) => ({ ...prevState, name: value }))
                    }
                  />
                </View>
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
                  onPress={keyboardHide}
                >
                  <Text style={styles.btnTitle}>Sign up</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.titleLink}>Have an account? Log in!</Text>
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
    width: "100%",
    height: "auto",
    justifyContent: "center",
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
  },
  headerTitle: {
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
  },
  form: {
    height: "auto",
    marginBottom: 16,
    paddingHorizontal: 10,
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
  },
});
