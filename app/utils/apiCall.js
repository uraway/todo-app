import request from 'axios';
import config from '../../config/server';

export default (params) => {
  const method = params.method;
  const url = `${config.url}/${config.apiVersion}${params.path}`;
  const responseType = 'json';

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.api+json',
  };

  if (sessionStorage.getItem('accessToken')) {
    Object.assign(headers, sessionStorage.getItem('accessToken'));
  }

  const requestParams = { method, url, responseType, headers };

  if (params.data) {
    requestParams.data = params.data;
  }

  return request(requestParams);
};
