/* eslint-disable prettier/prettier */
import {AxiosResponse} from 'axios';
import http from '../../http-common';

const saveRequest = (data: string): Promise<AxiosResponse<any, any>> => {
  return http.post('/request/', data);
};

const getRequestsUser = async (idUser: string): Promise<AxiosResponse<any, any>> => {
  const datareq = await http.get('/request/owner/' + idUser);
  return datareq.data.data;
};

const getRequest = async (idRequest: string): Promise<AxiosResponse<any, any>> => {
  const datareq = await http.get('/request/id/' + idRequest);
  return datareq.data.data;
};

const getAllRequest = async (): Promise<AxiosResponse<any, any>> => {
  const datareq = await http.get('/request/');
  return datareq.data;
};


const RequestService = {
  saveRequest,
  getRequestsUser,
  getRequest,
  getAllRequest,
};

export default RequestService;
