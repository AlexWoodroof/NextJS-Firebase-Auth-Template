import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    User,
    sendEmailVerification,
    applyActionCode,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import { createUserDocument } from './firestore/userManagement';

export const register = async (userData: {
    email: string;
    password: string;
    given_name: string;
    family_name: string;
    phone_number: string;
}): Promise<User> => {
    try {
        const { email, password, ...otherData } = userData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await createUserDocument(user.uid, {
            email,
            given_name: otherData.given_name,
            family_name: otherData.family_name,
            phone_number: otherData.phone_number,
        });

        await sendEmailVerification(user);

        return user;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const login = async (email: string, password: string, stayLoggedIn: boolean): Promise<User> => {
    try {
        if (stayLoggedIn) {
            await setPersistence(auth, browserLocalPersistence);
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            localStorage.setItem('authExpiration', expirationDate.toISOString());
        } else {
            await setPersistence(auth, browserSessionPersistence);
        }
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await firebaseSignOut(auth);
        localStorage.removeItem('authExpiration');
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

export const isLoggedIn = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                const expirationDate = localStorage.getItem('authExpiration');
                if (expirationDate) {
                    const now = new Date();
                    if (now > new Date(expirationDate)) {
                        logout();
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                } else {
                    resolve(true);
                }
            } else {
                resolve(false);
            }
        });
    });
};

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
};

export const resetPassword = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error('Reset password error:', error);
        throw error;
    }
};

export const confirmResetPassword = async (code: string, newPassword: string): Promise<void> => {
    try {
        await confirmPasswordReset(auth, code, newPassword);
    } catch (error) {
        console.error('Confirm reset password error:', error);
        throw error;
    }
};

export const verifyEmail = async (code: string): Promise<void> => {
    try {
        await applyActionCode(auth, code);
    } catch (error) {
        console.error('Email verification error:', error);
        throw error;
    }
};