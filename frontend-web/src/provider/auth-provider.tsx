import React, {useState} from 'react';
import {AuthContext} from '../context/auth.context';

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<null | String>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData: String) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const updateUser = (userData: String) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{user, isLoggedIn, login, updateUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;