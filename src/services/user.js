import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
// 获取当前用户信息
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/fetchNotices');
}
