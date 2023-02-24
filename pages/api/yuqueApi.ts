// 定义 API 请求类
export class YuqueAPI {
  private readonly baseUrl = 'https://www.yuque.com/api/v2';
  private readonly headers = {
    'User-Agent': 'lyzhong-yuque-blog',
    'X-Auth-Token': this.accessToken,
  };

  // 构造函数接受一个 access_token 参数
  constructor(private readonly accessToken: string) {}

  private async fetchJson(url: string): Promise<any> {
    const response = await fetch(url, { headers: this.headers });
    return response.json();
  }

  // 获取用户信息
  async getUser(login?: string): Promise<any> {
    const url = `${this.baseUrl}/user${login ? `s/${login}` : ''}`;
    return this.fetchJson(url);
  }

  // 获取指定用户的文档仓库列表
  async getRepos(login: string, offset?: number): Promise<any> {
    const url = `${this.baseUrl}/users/${login}/repos`;
    return this.fetchJson(url);
  }

  // 获取指定用户的文档列表
  async getDocs(login: string, blogNames: string): Promise<any> {
    const url = `${this.baseUrl}/repos/${login}/${blogNames}/docs`;
    return this.fetchJson(url);
  }

  async getDoc(
    login: string,
    blogNames: string,
    slug: string | any,
  ): Promise<any> {
    const url = `${this.baseUrl}/repos/${login}/${blogNames}/docs/${slug}`;
    return this.fetchJson(url);
  }

  // 其他 API 请求方法
  // ...
}
