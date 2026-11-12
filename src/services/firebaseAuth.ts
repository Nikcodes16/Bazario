import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';

const authInstance = getAuth();

export const signupUser = async (
  email: string,
  password: string,
) => {
  const userCredential =
    await createUserWithEmailAndPassword(
      authInstance,
      email.trim(),
      password,
    );

  return userCredential.user;
};

export const loginUser = async (
  email: string,
  password: string,
) => {
  const userCredential =
    await signInWithEmailAndPassword(
      authInstance,
      email.trim(),
      password,
    );

  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(authInstance);
};