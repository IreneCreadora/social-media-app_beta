import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const [fontsLoaded] = useFonts({
    "EastSeaDokdo-Regular": require("../../../assets/fonts/EastSeaDokdo-Regular.ttf"),
    "Roboto-Italic": require("../../../assets/fonts/Roboto-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          source={require("../../../assets/images/user.png")}
          style={styles.userImage}
        />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>example@example.com</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View>
                <Image source={{ uri: item.photo }} style={styles.image} />
                <Text style={styles.placeTitle}>{item.photoName}</Text>
              </View>

              <View style={styles.locationCommentContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Posts", { screen: "CommentsScreen" })
                  }
                >
                  <View style={styles.commentContainer}>
                    <Image
                      source={require("../../../assets/images/comment.png")}
                      style={styles.commentLogo}
                    />
                    <Text style={styles.commentAmount}>0</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Posts", { screen: "MapScreen" })
                  }
                >
                  <View style={styles.location}>
                    <Image
                      source={require("../../../assets/images/localization.png")}
                      style={{ width: 24, height: 24, marginRight: 4 }}
                    />
                    <Text style={styles.locationText}>
                      {" "}
                      {item.localization}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  userWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 32,
  },
  userImage: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userName: {
    fontFamily: "Roboto-Italic",
    fontWeight: "700",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Italic",
    fontWeight: "400",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  placeTitle: {
    fontFamily: "Roboto-Italic",
    fontWeight: "500",
    fontSize: 16,
    color: "#212121",
  },
  locationCommentContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 8,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  commentLogo: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  commentAmount: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Roboto-Italic",
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#212121",
  },
});

export default DefaultScreenPosts;
