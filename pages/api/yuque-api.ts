// 定义 API 请求类
export class YuqueAPI {
  private readonly baseUrl = 'https://www.yuque.com/api/v2';

  // 构造函数接受一个 access_token 参数
  constructor(private readonly accessToken: string) {}

  // 用 fetch 发送 GET 请求并返回解析后的 JSON 数据
  private async fetchJson(url: string): Promise<any> {
    const headers = {
      'User-Agent': 'lyzhong-yuque-blog',
      'X-Auth-Token': this.accessToken,
    };
    const response = await fetch(url, { headers });
    return response.json();
  }

  /**
   * 获取用户信息
   *
   * @param login 用户名
   * @returns 用户信息
   */
  async getUser(login?: string): Promise<any> {
    const url = `${this.baseUrl}/user${login ? `s/${login}` : ''}`;
    return this.fetchJson(url);
  }

  /**
   * 获取指定用户的文档仓库列表
   *
   * @param login 用户名
   * @param offset 偏移量
   * @returns 文档仓库列表
   */
  async getRepos(login: string, offset?: number): Promise<any> {
    const url = `${this.baseUrl}/users/${login}/repos`;
    return this.fetchJson(url);
  }

  /**
   * 获取指定用户的文档列表
   *
   * @param login 用户名
   * @param blogNames 仓库名称
   * @returns 文档列表
   */
  async getDocs(login: string, blogNames: string): Promise<any> {
    const url = `${this.baseUrl}/repos/${login}/${blogNames}/docs`;
    return this.fetchJson(url);
  }

  /**
   * 获取指定用户的文档
   *
   * @param login 用户名
   * @param blogNames 仓库名称
   * @param slug 文档 Slug
   * @returns 文档信息
   */
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
