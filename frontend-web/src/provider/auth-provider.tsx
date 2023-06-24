"use client";

import React, {useState} from 'react';
import {AuthContext, User} from '../context/auth.context';
import { AxiosResponse } from 'axios';

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