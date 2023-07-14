"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from '@/context/auth.context';

// obtiene payload del token de los datos
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// decodifica token y comprueba fecha caducidad y actual
export const AuthVerify = () => {
  const {logout, user} = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
        router.push("/login");
        console.log("Time token expired");
      }
    }
  }, []);
  // Devolver null ya que no necesitamos renderizar nada en el componente
  return null;
}