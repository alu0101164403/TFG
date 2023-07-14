/**
 * @file auth.provider.tsx
 * @brief Provider. Se encarga de gestionar los métodos y variables del estado global de la aplicación. Envuelve a los componentes para que puedan hacer uso de estos datos.
 */
import React, {useState} from 'react';
import {AuthContext, User, Wallet} from '../context/auth.context';
import {AxiosResponse} from 'axios';

type Props = {
  children?: React.ReactNode;
};

/**
 * Proveedor de autenticación para la aplicación.
 * @param {Props} props - Propiedades del componente.
 * @returns {JSX.Element}
 */
const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<null | User>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /**
   * Almacena los datos del usuario.
   * @param {AxiosResponse} userData - Datos del usuario obtenidos del servidor.
   */
  const login = (userData: AxiosResponse) => {
    setUser(userData.data);
    setIsLoggedIn(true);
  };
  /**
   * Actualiza los datos del usuario.
   * @param {AxiosResponse} userData - Nuevos datos del usuario obtenidos del servidor.
   */
  const updateUser = (userData: AxiosResponse) => {
    setUser(userData.data);
    setIsLoggedIn(true);
  };
  /**
   * Actualiza los datos de la billetera del usuario.
   * @param {AxiosResponse} newWallet - Nuevos datos de la billetera obtenidos del servidor.
   */
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
  /**
   * Cierra la sesión de usuario y elimina los datos almacenados.
   */
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
