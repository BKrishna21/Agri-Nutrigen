
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { onAuthStateChanged, User } from 'firebase/auth';

import { auth, db } from './firebase';

import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  setUser: () => {}
});

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [isAdmin, setIsAdmin] =
    useState(false);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          setUser(user);

          if (user) {

            // Sync user to Firestore
            const userRef = doc(
              db,
              'users',
              user.uid
            );

            const userSnap =
              await getDoc(userRef);

            if (!userSnap.exists()) {

              await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt:
                  new Date().toISOString()
              });
            }
          }

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, []);

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        setUser
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);
