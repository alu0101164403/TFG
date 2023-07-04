import React, {useState} from 'react';
import {AuthContext, User, Wallet} from '../context/auth.context';
import {AxiosResponse} from 'axios';

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<null | User>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData: AxiosResponse) => {
    setUser(userData.data);
    setIsLoggedIn(true);
  };

  const updateUser = (userData: AxiosResponse) => {
    setUser(userData.data);
    setIsLoggedIn(true);
  };

  const updateWallet = (newWallet: AxiosResponse) => {
    const wallet: Wallet = {
      _id: newWallet.data._id,
      coins: newWallet.data.coins,
      history: newWallet.data.history,
    };
    setUser(prevUser => ({
      ...prevUser!,
      wallet: wallet,
    }));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{user, isLoggedIn, login, updateUser, updateWallet, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
