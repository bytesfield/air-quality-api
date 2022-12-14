import axios from 'axios';
import https from 'https';
import { logger } from './logger.util';
import { ServiceUnavailableError } from '../errors';
import { Errors } from '../constants/errors.constant';

interface Props {
  baseUrl: string;
  timeout?: number;
  headers?: { [key: string]: any };
  httpsAgent?: https.Agent;
}

export class HttpClient {
  public instance: any;

  public constructor({ baseUrl, timeout, ...rest }: Props) {
    this.instance = axios.create({
      baseURL: baseUrl,
      ...(timeout && { timeout }),
      headers: { Accept: 'application/json' },
      ...rest
    });

    this.instance.interceptors.response.use(
      (response: any): any => {
        logger.info(`Response: ${response.config.method} ${(response.config.url, response.status)}`);
        return response;
      },
      (error: any): any => {
        if (!error.response) {
          logger.error('Response: Network Error');
        } else {
          logger.error(`${error.response} Response error`);
        }

        if (error.code === 'ECONNABORTED') {
          logger.error('Response: ECONNABORTED, timed out.', error);
          throw new ServiceUnavailableError(Errors.SERVICE_UNAVAILABLE);
        }

        return Promise.reject(error);
      }
    );
  }

  public get = (path: string, config = {}): Promise<any> => {
    return this.instance.get(path, config);
  };

  public post = (path: string, data: { [key: string]: any } | string, config = {}): Promise<any> => {
    return this.instance.post(path, data, config);
  };

  public put = (path: string, data: { [key: string]: any }, config = {}): Promise<any> => {
    return this.instance.put(path, data, config);
  };

  public patch = (path: string, data: { [key: string]: any }, config = {}): Promise<any> => {
    return this.instance.patch(path, data, config);
  };

  public delete = (path: string, config = {}): Promise<any> => {
    return this.instance.delete(path, config);
  };
}
