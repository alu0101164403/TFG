import {AxiosResponse} from 'axios';
import http from '../../http-common';

interface Data {
  emitter: string;
  receiver: string;
  message: string;
  dataTime: Date;
}

const sendMessage = (data: Data): Promise<AxiosResponse<any, any>> => {
  return http.post('/api/message', data);
};

const chatList = (): Promise<AxiosResponse<any, any>> => {
  return http.get('/api/message');
};

const getAll = (): Promise<AxiosResponse<any, any>> => {
  return http.get('chatList');
};

const getMessages = (
  emiterId: string,
  receiverId: string,
): Promise<AxiosResponse<any, any>> => {
  return http.get('/api/message/' + emiterId + '/' + receiverId);
};

export default {
  sendMessage,
  getMessages,
  getAll,
  chatList,
};
