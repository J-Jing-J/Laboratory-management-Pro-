import request from '@/utils/request';

// 登录验证
export async function fakeAccountLogin(params) {
  // return request('/api/login/account', {
  return request('http://192.168.43.52:8181/login/verify', {
    method: 'POST',
    data: params,
  });
}
