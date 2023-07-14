/* eslint-disable prettier/prettier */
/**
 * @file request.services.tsx
 * @brief Request service module. Contiene las funciones para realizar peticiones relacionadas con las solicitudes.
 */
import {AxiosResponse} from 'axios';
import http from '../../http-common';
/**
 * Interfaz para los datos de una petición.
*/
export interface RequestData {
  owner: {id: string, username: string},
  type: string;
  title: string;
  description: string;
  category: string;
  price: number;
}
/**
 * Interfaz para los datos de una petición recibida.
*/
export interface RequestDataReceive {
  params: any;
  _id: string;
  owner: {id: string, username: string},
  type: string;
  title: string;
  description: string;
  category: string;
  price: number;
  date: string;
}
/**
 * Petición al servidor pata guardar una nueva petición.
 * @param data Los datos de la petición a guardar.
 * @returns Una promesa que se resuelve con la respuesta del servidor.
*/
const saveRequest = async (data: RequestData): Promise<AxiosResponse<any, any>> => {
  return await http.post('/api/request/', data);
};
/**
 * Obtiene todas las peticiones de un usuario.
 * @param idUser El ID del usuario.
 * @returns Una promesa que se resuelve con la respuesta de la solicitud.
*/
const getRequestsUser = async (idUser: string): Promise<AxiosResponse<RequestDataReceive[]>> => {
  const datareq = await http.get('/api/request/owner/' + idUser);
  return datareq;
};
/**
 * Obtiene una petición por su ID.
 * @param idRequest El ID de la petición.
 * @returns Una promesa que se resuelve con la respuesta de la solicitud.
*/
const getRequest = async (idRequest: string): Promise<AxiosResponse<RequestDataReceive>> => {
  const datareq = await http.get('/api/request/id/' + idRequest);
  return datareq.data;
};
/**
 * Obtiene todas las peticiones.
 * @returns Una promesa que se resuelve con la respuesta de la solicitud.
*/
const getAllRequest = async (): Promise<AxiosResponse<RequestDataReceive[]>> => {
  const datareq = await http.get('/api/request/');
  return datareq;
};
/**
 * Edita una petición por su ID.
 * @param idRequest El ID de la petición.
 * @returns Una promesa que se resuelve con la respuesta de la solicitud.
*/
const editRequestById = async (idRequest:string): Promise<AxiosResponse<any, any>> => {
  const datareq = await http.patch('/api/request/id/' + idRequest);
  return datareq;
};
/**
 * Elimina una petición por su ID.
 * @param idRequest El ID de la petición.
 * @returns Una promesa que se resuelve con la respuesta de la solicitud.
*/
const deleteRequestById = async (idRequest:string): Promise<AxiosResponse<any, any>> => {
  return http.delete('/api/request/id/' + idRequest);
};

export const RequestService = {
  saveRequest,
  getRequestsUser,
  getRequest,
  getAllRequest,
  editRequestById,
  deleteRequestById,
};
