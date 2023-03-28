import { authFirebase } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Toast from "react-native-root-toast";
import { authSlice } from "./authReducer";

const { authSignOut, updateUserProfile, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    try {
      const response = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      const user = response.user;

      Toast.show("Registration successful", {
        duration: 3000,
        position: 50,
      });

      await updateProfile(authFirebase.currentUser, {
        displayName: name,
        userId: user.uid,
      });

      const { displayName, uid } = await authFirebase.currentUser;
      console.log("register", displayName, uid);

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      Toast.show(`Welcome`, {
        duration: 3000,
        position: 50,
      });
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(authFirebase);
    dispatch(authSignOut());

    Toast.show("Logout successful", {
      duration: 3000,
      position: 50,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(authFirebase, (user) => {
    if (user) {
      const userUpdateProfile = {
        userName: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
