import axios, { AxiosInstance, AxiosResponse } from 'axios';

// 定义 API 请求类
export class YuqueAPI {
  private readonly http: AxiosInstance;

  // 构造函数接受一个 access_token 参数
  constructor(private readonly accessToken: string) {
    // 创建 Axios 实例，并设置默认请求头
    this.http = axios.create({
      baseURL: 'https://www.yuque.com/api/v2',
      headers: {
        'User-Agent': 'lyzhong-yuque-blog',
        'X-Auth-Token': accessToken, // 在请求头中携带访问令牌
      },
    });
  }

  // 获取用户信息
  // 获取用户信息
  async getUser(login?: string): Promise<AxiosResponse<any>> {
    return this.http.get(`/user${login ? `s/${login}` : ''}`);
  }

  // 获取指定用户的文档仓库列表
  async getRopes(login: string, offset?: number): Promise<AxiosResponse<any>> {
    return this.http.get(`/users/${login}/repos`);
  }

  // 获取指定用户的文档列表
  async getDocs(login: string, blogNames: string): Promise<AxiosResponse<any>> {
    return this.http.get(`/repos/${login}/${blogNames}/docs`);
  }

  // 其他 API 请求方法
  // ...
}
