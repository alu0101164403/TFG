/**
 * @file auth-services.tsx
 * @brief Authentication service module. Contiene las funciones para realizar solicitudes de autenticación al servidor.
 */
import {AxiosResponse} from 'axios';
import http from '../../http-common';
/**
 * Interfaz para los datos de usuario utilizados en el registro.
 */
export interface UserData {
  username: string;
  email: string;
  credential: string;
  password: string;
}
/**
 * Realiza una solicitud de registro de usuario.
 * @param data Los datos del usuario a registrar.
 * @returns Una promesa que se resuelve con la respuesta de la solicitud.
 */
const register = (data: UserData): Promise<AxiosResponse<any, any>> => {
  return http.post('/api/user/register', data);
};
/**
 * Realiza una solicitud de inicio de sesión.
 * @param data Los datos de inicio de sesión (nombre de usuario y contraseña).
 * @returns Una promesa que se resuelve con la respuesta de la solicitud.
 */
const login = async (data: {
  username: string;
  password: string;
}): Promise<AxiosResponse<string, string>> => {
  const dataUser = await http.post('/api/user/login', data);
  return dataUser.data;
};

export const Auth = {
  register,
  login,
};
