import request from '@/utils/request'

export function fetchDashboard() {
  return request('/api/admin/index')
}
