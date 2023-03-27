// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";

// import { useRoute } from "./src/nav/router";

// export default function App() {
//   const routing = useRoute(true);
//   return <NavigationContainer>{routing}</NavigationContainer>;
// }

import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { RootSiblingParent } from "react-native-root-siblings";
import Main from "./src/components/Main";

export default function App() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <Main />
      </RootSiblingParent>
    </Provider>
  );
}
