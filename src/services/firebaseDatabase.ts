import {
  getDatabase,
  ref,
  set,
  get,
  update
} from '@react-native-firebase/database';

const databaseInstance = getDatabase(
  undefined,
  'https://bazario-82da0-default-rtdb.asia-southeast1.firebasedatabase.app',
);

export interface UserData {
  name: string;
  email: string;
  phone: string;
  createdAt: number;
}

export const createUserProfile = async (
  uid: string,
  userData: UserData,
) => {
  console.log('DATABASE WRITE START');
  console.log('UID:', uid);
  console.log('DATA:', userData);

  const userRef = ref(
    databaseInstance,
    `users/${uid}`,
  );

  await set(userRef, userData);

  console.log('DATABASE WRITE SUCCESS');
};

export const getUserProfile = async (uid: string) => {
  const userRef = ref(
    databaseInstance,
    `users/${uid}`,
  );

  const snapshot = await get(userRef);

  console.log('DATABASE READ:', snapshot.val());

  if (snapshot.exists()) {
    return snapshot.val() as UserData;
  }

  return null;
};
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserData>,
) => {
  const userRef = ref(databaseInstance, `users/${uid}`);

  await update(userRef, data);
};