import React, {useState} from 'react';
import {AuthContext} from '../context/auth.context';

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    console.log('Logout');
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
