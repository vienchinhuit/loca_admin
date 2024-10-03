import { createContext, useState } from "react";
import {
  getTokenFromCookie,
} from "../utils/auth";

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  // profile: User | null
  // setProfile: React.Dispatch<React.SetStateAction<User | null>>
  reset: () => void;
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getTokenFromCookie("access_token")),
  setIsAuthenticated: () => null,
  // profile: getProfileFromLS(),
  // setProfile: () => null,
  reset: () => null,
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({
  children,
  defaultValue = initialAppContext,
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultValue.isAuthenticated
  );
  // const [profile, setProfile] = useState<User | null>(defaultValue.profile)

  const reset = () => {
    setIsAuthenticated(false);
    // setProfile(null)
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        // profile,
        // setProfile,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
