import { HttpClient } from '../../utils/httpClient';

interface RequestDataProps {
  url: string;
  method: 'get' | 'delete' | 'post' | 'put';
  data?: { [key: string]: any };
  headers?: { [key: string]: any };
}

export class AirVisualBaseService {
  public readonly baseURL: string;

  public httpClient: HttpClient;

  public constructor(baseURL: string) {
    this.baseURL = baseURL;

    this.httpClient = new HttpClient({
      baseUrl: this.baseURL
    });
  }

  public async makeRequest<T>(requestData: RequestDataProps): Promise<T> {
    let request = null;

    if (requestData.method === 'get' || requestData.method === 'delete') {
      request = this.httpClient[requestData.method](requestData.url);
    } else {
      request = this.httpClient[requestData.method](requestData.url, requestData.data);
    }
    const { data } = await request;
    return data;
  }
}
