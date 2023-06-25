/* eslint-disable prettier/prettier */
import {AxiosResponse} from 'axios';
import http from '../../http-common';

export interface RequestData {
  owner: {id: string, username: string},
  type: string;
  title: string;
  description: string;
  category: string;
  price: number;
}

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

const saveRequest = async (data: RequestData): Promise<AxiosResponse<any, any>> => {
  return await http.post('/request/', data);
};

const getRequestsUser = async (idUser: string): Promise<AxiosResponse<RequestDataReceive[]>> => {
  const datareq = await http.get('/request/owner/' + idUser);
  return datareq;
};

const getRequest = async (idRequest: string): Promise<AxiosResponse<RequestDataReceive>> => {
  const datareq = await http.get('/request/id/' + idRequest);
  return datareq.data;
};

const getAllRequest = async (): Promise<AxiosResponse<RequestDataReceive[]>> => {
  const datareq = await http.get('/request/');
  return datareq;
};

const editRequestById = async (idRequest:string): Promise<AxiosResponse<any, any>> => {
  const datareq = await http.patch('/request/id/' + idRequest);
  return datareq;
};

const deleteRequestById = async (idRequest:string): Promise<AxiosResponse<any, any>> => {
  return http.delete('/request/id/' + idRequest);
};

export const RequestService = {
  saveRequest,
  getRequestsUser,
  getRequest,
  getAllRequest,
  editRequestById,
  deleteRequestById,
};
