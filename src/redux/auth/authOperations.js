import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      console.log(`in operations ${email}`);

      const user = await auth.currentUser;

      await user.updateProfile({
        displayName: name,
      });

      const { displayName, uid } = await auth.currentUser;

      const userUpdateProfile = {
        nickName: displayName,
        userId: uid,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error", error);

      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSignOut());
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
