/**
 * 职径导航 - 推荐统计接口 (Vercel Serverless Function)
 *
 * 路由说明:
 * - 文件路径 `api/recommend/stats.js` 会自动映射为接口路径 `/api/recommend/stats`
 * - 这样就不需要在 `vercel.json` 里写旧版的 `routes` 规则了
 */

// 从同目录的 recommend.js 复用统计处理逻辑(避免重复代码)
import { statsHandler } from '../recommend.js';

/**
 * Vercel Serverless Function 主入口
 * @param {Request} request - 请求对象
 * @returns {Response} - 响应对象
 */
export default async function handler(request) {
  // 允许浏览器的跨域预检请求(Preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  // 只允许 GET 请求
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: '只支持GET请求' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 调用复用的统计处理逻辑
  return statsHandler(request);
}

