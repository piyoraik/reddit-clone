import React, {
  createContext,
  ReactElement,
  useState,
  useEffect,
  Dispatch,
  useContext,
} from "react";
import Auth, { CognitoUser } from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";

interface UserContextType {
  user: CognitoUser | null;
  setUser: Dispatch<React.SetStateAction<CognitoUser>>;
}

const userContext = createContext<UserContextType>({} as UserContextType);

interface Props {
  children: React.ReactElement;
}

export default function AuthContext({ children }: Props): ReactElement {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", () => {
      // perform some action to update state whenever an auth event is detected.
      checkUser();
    });
  }, []);

  async function checkUser() {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();
      if (amplifyUser) {
        setUser(amplifyUser);
      }
    } catch (err) {
      // No current signed in user.
      setUser(null);
    }
  }

  return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
}

export const useUser = (): UserContextType => useContext(userContext);
