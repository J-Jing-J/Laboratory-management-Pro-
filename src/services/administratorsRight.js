import request from '@/utils/request';

// 获取所有的角色及权限信息
export const getRoleList = async () => {
  return request('/api/roleList');
};

export const getRightList = async () => {
  return request('/api/rightList');
};
//
// // 添加报修信息
// export const addRepairList = async (data) => {
//   console.log(555, data);
//   const url = '/api/addRepairList';
//   const options = { data };
//   return request.post(url, options);
//   // return request.post('/api/repairManage', {data: params})
// };
//
// // 更改报修状态
// export const changeRepairListState = async (data) => {
//   console.log(555, data);
//   const url = '/api/changeRepairListState';
//   const options = { data };
//   return request.put(url, options);
//   // return request.post('/api/repairManage', {data: params})
// };
