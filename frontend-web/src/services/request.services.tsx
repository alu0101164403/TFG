import {AxiosResponse} from 'axios';
import http from '../../http-commons';
import { data } from 'autoprefixer';

const saveRequest = (data: string): Promise<AxiosResponse<any, any>> => {
  return http.post('/request/', data);
};

const getRequestsUser = async (idUser: string): Promise<AxiosResponse<any, any>> => {
  const datareq = await http.get('/request/owner/' + idUser);
  return datareq.data;
};

const getRequest = async (idRequest: string): Promise<AxiosResponse<any, any>> => {
  const datareq = await http.get('/request/id/' + idRequest);
  return datareq.data;
};

const getAllRequest = async (): Promise<AxiosResponse<any, any>> => {
  const datareq = await http.get('/request/');
  return datareq.data;
};

const editRequestById = async (idRequest:string): Promise<AxiosResponse<any, any>> => {
  const datareq = await http.patch('/request/id/' + idRequest);
  console.log(datareq)
  return datareq;
}

const deleteRequestById = async (idRequest:string): Promise<AxiosResponse<any, any>> => {
  return http.delete('/request/id/' + idRequest);
}

const RequestService = {
  saveRequest,
  getRequestsUser,
  getRequest,
  getAllRequest,
  editRequestById,
  deleteRequestById,
};

export default RequestService;