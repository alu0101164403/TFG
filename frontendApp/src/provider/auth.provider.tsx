import React, {useState} from 'react';
import {AuthContext} from '../context/auth.context';

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<null | String>(null);
  const [wallet, setWallet] = useState<null | String>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);

  const login = (userData: String) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    console.log('Logout');
    setUser(null);
    setWallet(null);
  };

  const loadWallet = (data: String) => {
    setWallet(data);
  };

  return (
    <AuthContext.Provider
      value={{user, wallet, isLoggedIn, login, logout, loadWallet}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
