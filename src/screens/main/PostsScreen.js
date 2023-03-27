import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nested/DefaultScreenPosts";
import MapScreen from "../nested/MapScreen";
import CommentsScreen from "../nested/CommentsScreen";
const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{ headerShown: false }}
      />
    </NestedScreen.Navigator>
  );
}
