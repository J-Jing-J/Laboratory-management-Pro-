import request from '@/utils/request';

// 获取所有的报修信息
export const getRepairManage = async () => {
  return request('/api/repairManage');
};

// 添加报修信息
export const addRepairList = async (data) => {
  console.log(555, data);
  const url = '/api/addRepairList';
  const options = { data };
  return request.post(url, options);
  // return request.post('/api/repairManage', {data: params})
};

// 更改报修状态
export const changeRepairListState = async (data) => {
  console.log(555, data);
  const url = '/api/changeRepairListState';
  const options = { data };
  return request.put(url, options);
  // return request.post('/api/repairManage', {data: params})
};

// 删除
export const deleteRepairListState = async (data) => {
  const url = '/api/deleteRepairListState';
  const options = { data };
  console.log('service', options);
  return request.post(url, options);
};

// 查找
export const searchRepairListState = async (data) => {
  const url = '/api/searchRepairListState';
  const options = { data };
  console.log('service', options);
  return request.post(url, options);
};