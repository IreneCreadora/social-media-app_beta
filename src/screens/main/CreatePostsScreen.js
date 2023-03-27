import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { Camera } from "expo-camera";
import "react-native-get-random-values";
import * as Location from "expo-location";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [localization, setLocalization] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const uploadPhotoToServer = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuidv4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    const dowloadedURL = await getDownloadURL(fileRef);
    setPhoto(dowloadedURL);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(status === "granted");
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    setPhoto(photo.uri);
    setLocation(location);
  };

  const publishPhoto = () => {
    const post = {
      id: uuidv4(),
      photo,
      photoName,
      localization,
    };
    navigation.navigate("Posts", { screen: "DefaultScreen", params: post });
  };

  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  const [fontsLoaded] = useFonts({
    "EastSeaDokdo-Regular": require("../../../assets/fonts/EastSeaDokdo-Regular.ttf"),
    "Roboto-Italic": require("../../../assets/fonts/Roboto-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // const createNewPost = localization === "" || photoName === "" || photo === "";

  let localPosition = "Waiting..";
  if (errorMsg) {
    localPosition = errorMsg;
  } else if (location) {
    localPosition = `${location.coords.latitude}, ${location.coords.longitude}`;
  }

  return (
    <ScrollView style={styles.container}>
      <Camera
        style={styles.camera}
        ref={setCamera}
        onCameraReady={onCameraReady}
      >
        {photo && (
          <View style={styles.takeSnapShot}>
            <Image source={{ uri: photo }} style={{ height: 100, width: 80 }} />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto}>
          <Image
            source={require("../../../assets/images/makesnap.png")}
            style={styles.snapShot}
          />
        </TouchableOpacity>
      </Camera>
      <Text style={styles.uploadBtn}>Upload Photo</Text>
      <View style={{ ...styles.inputWrapper, marginBottom: 16 }}>
        <TextInput
          style={styles.input}
          textAlign={"left"}
          placeholder={"Photo name..."}
          placeholderTextColor="#BDBDBD"
          onChangeText={setPhotoName}
        />
      </View>
      <View style={{ ...styles.inputWrapper, marginBottom: 32 }}>
        <TextInput
          style={styles.input}
          textAlign={"left"}
          placeholder={"Locality"}
          placeholderTextColor="#BDBDBD"
          onChangeText={setLocalization}
          value={localPosition}
        />
        <Image
          source={require("../../../assets/images/localization.png")}
          style={styles.localizationIcon}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={!photo}
        onPress={publishPhoto}
      >
        <View style={!photo ? styles.button : styles.activeButton}>
          <Text style={!photo ? styles.buttonText : styles.activeButtonText}>
            Publish
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: 343,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
    borderRadius: 8,
    marginBottom: 8,
  },
  snapShot: {
    width: 80,
    height: 80,
  },
  uploadBtn: {
    marginHorizontal: 16,
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  inputWrapper: {
    marginHorizontal: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  input: {
    height: 30,
    fontFamily: "Roboto-Italic",
    fontSize: 16,
    flex: 1,
  },
  localizationIcon: {
    width: 24,
    height: 24,
  },
  button: {
    marginHorizontal: 16,
    backgroundColor: "#DEDEDE",
    borderRadius: 100,
    alignItems: "center",
  },
  activeButton: {
    marginHorizontal: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    paddingVertical: 16,
    fontSize: 16,
    color: "#BDBDBD",
  },
  activeButtonText: {
    fontFamily: "Roboto-Italic",
    paddingVertical: 16,
    fontSize: 16,
    color: "#fff",
  },
  takeSnapShot: {
    fontFamily: "Roboto-Italic",
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "white",
  },
});
