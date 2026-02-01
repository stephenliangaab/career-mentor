/**
 * 职径导航 - 统计接口
 *
 * 路径：GET /api/recommend/stats
 * 说明：Vercel 会按文件路径自动映射路由，所以这里单独拆一个文件，
 *      避免依赖 vercel.json 的 routes/rewrites 配置。
 */

// 从上层 recommend.js 复用 statsHandler
import { statsHandler } from '../recommend.js';

/**
 * Vercel Serverless Function 入口
 * @param {Request} request
 * @returns {Response}
 */
export default async function handler(request) {
  // 允许浏览器预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  // 只允许 GET
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: '只支持GET请求' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return await statsHandler(request);
}

/**
 * 职径导航 - 推荐统计接口 (Vercel Serverless Function)
 *
 * 路由说明:
 * - 文件路径 `api/recommend/stats.js` 会自动映射为接口路径 `/api/recommend/stats`
 * - 因此不需要在 `vercel.json` 里写旧版的 `routes`
 */

// 复用 recommend.js 里的统计逻辑，避免复制粘贴
import { statsHandler } from '../recommend.js';

/**
 * Vercel Serverless Function 主入口
 * @param {Request} request - 请求对象
 * @returns {Response} - 响应对象
 */
export default async function handler(request) {
  // 允许浏览器跨域预检请求(Preflight)
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

  return statsHandler(request);
}

