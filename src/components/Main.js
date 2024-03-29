import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../nav/router";

import { authStateChangeUser } from "../redux/auth/authOperations";
import { selectAuth } from "../redux/auth/authSelectors";

export default function Main() {
  const { stateChange } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
