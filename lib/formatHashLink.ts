/**
 * 将 slug 转换为 URL 锚点
 *
 * @param slug 需要转换的 slug
 * @returns URL 锚点格式的 slug
 */
export function formatHashLink(slug: string) {
  // 判断是否在浏览器环境下
  if (typeof window !== 'undefined') {
    // 将字符串中的空格替换为 -
    return slug.toLowerCase().replace(/ /g, '-');
  }
}
