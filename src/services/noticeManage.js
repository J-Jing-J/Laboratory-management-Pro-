import request from '@/utils/request'

// 获取公告列表
export const fetchNotice = async (params) => {
  console.log(params);
  const res = await request('/api/admin/notice')
  return res
  // return request('/api/admin/notice')
}

// 修改公告状态
export const changePublishListState = async (data) => {
  // console.log(data);
  // const options = {id, status} = data
  const url = '/api/changePublishListState'
  const options = {data}
  console.log(555666,options)
  return request.put(url, options)
  // return request.post('/api/repairManage', {data: params})
}

// 添加公告
export const addNotice = async (params) => {
  console.log(params);
  const url = '/api/addNotice/'
  const options = {params}
  return request.post(url, options)
}

// 编辑公告
export const editNotice = async (params) => {
  return request.put('/api/editNotice/',{params})
}


// 公告详情
export const noticeDetail = async (editId) => {
  return request.get('/api/noticeDetail', {editId})
}
