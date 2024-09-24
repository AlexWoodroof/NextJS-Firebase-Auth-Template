// utils/firebase/userManagement.ts

import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';

interface UserData {
  email: string;
  given_name: string;
  family_name: string;
  phone_number: string;
}

export const createUserDocument = async (userId: string, userData: UserData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userData);
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
};

export const getUserDocument = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() as UserData : null;
  } catch (error) {
    console.error('Error getting user document:', error);
    throw error;
  }
};

export const updateUserDocument = async (userId: string, updateData: Partial<UserData>) => {
  try {
    await updateDoc(doc(db, 'users', userId), updateData);
  } catch (error) {
    console.error('Error updating user document:', error);
    throw error;
  }
};

export const deleteUserDocument = async (userId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
  } catch (error) {
    console.error('Error deleting user document:', error);
    throw error;
  }
};
