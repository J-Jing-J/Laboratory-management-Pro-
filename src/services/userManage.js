import request from "@/utils/request";

export const getUserList = async () => {
  return request('/api/getUserList')
}
