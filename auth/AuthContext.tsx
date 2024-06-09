import { auth } from "@/firebaseConfig/firebase";
import { createAccount } from "@/utils/authFunctions";
import { getLocationPermission } from "@/utils/locationFunctions";
import { ErrorAlert } from "@/utils/utils";
import { FirebaseError } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthContextProps {
  signIn(email: string, password: string): void;
  signUp(email: string, password: string, role: string): void;
  logout(): void;
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean | undefined;
  locationEnabled: boolean | undefined;
  updateLocationEnabled(): void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoading: false,
  logout() {
    return null;
  },
  signIn() {
    return null;
  },
  signUp() {
    return null;
  },
  user: null,
  isAuthenticated: undefined,
  locationEnabled: undefined,
  updateLocationEnabled() {
    return null;
  },
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [user, setUser] = useState<User | null>(null);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    (async () => {
      await getLocationPermission().then((value) => {
        setLocationEnabled(value.granted);
      });
    })();

    return unsub;
  }, []);

  async function signIn(email: string, password: string) {
    setIsLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .catch((error: FirebaseError) => {
        ErrorAlert("Sign In", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function signUp(email: string, password: string, role: string) {
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        createAccount(user, role);
      })

      .catch((error: FirebaseError) => {
        ErrorAlert("Sign Up", error);
      })

      .finally(() => {
        setIsLoading(false);
      });
  }

  async function logout() {
    await signOut(auth);
  }

  function updateLocationEnabled() {
    setLocationEnabled(true);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        signIn,
        signUp,
        logout,
        user,
        locationEnabled,
        updateLocationEnabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside the AuthContextProvider!");
  }

  return value;
}
