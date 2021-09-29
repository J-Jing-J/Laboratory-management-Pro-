import request from '@/utils/request';

export const getMaintainList = async () => {
  // return request('/api/getMaintainList');
  const res = await request('http://192.168.43.52:8181/maintenance/findAll');
  return res;
};

export const deleteMaintainList = async (id) => {
  // const url = '/api/deleteRepairListState';
  const url = `http://192.168.43.52:8181/maintenance/deleteById/${id}`;
  // const options = id;
  console.log('service', id);
  console.log(url);
  const res = await request.post(url);
  console.log(123, res);
};

export const searchMaintainList = async (value) => {
  // const url = '/api/deleteRepairListState';
  const url = `http://192.168.43.52:8181/maintenance/findByRoomName/${value}`;
  // const options = value;
  console.log('service', value);
  console.log(url);
  const res = await request(url);
  console.log(123, res);
  return res;
};

// 添加
export const addMaintainList = async (data) => {
  const url = `http://192.168.43.52:8181/maintenance/save`;
  console.log(555, data);
  const res = await request.post(url, { data });
  console.log(123123, res);
  return res;
  // return request.post('/api/repairManage', {data: params})
};
