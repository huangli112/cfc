// 获取企业信息列表
import request from '../utils/request'

export async function getCompanyInfoList (code) {
  const resp = await request.post('/content/list', { page: { pageNumber: 1, pageSize: -1 }, requestData: { code } })
  return resp.data.list
}

// 新增企业信息
export async function addCompany (data) { // data:{code, attachment, title, copywriting}
  const resp = await request.post('/content/save', { requestData: { ...data } })
  return resp
}

export async function updateCompany (data) { // data:{id, code, attachment, title, copywriting}
  const resp = await request.post('/content/update', { requestData: { ...data } })
  return resp
}

export async function deleteCompany (id) {
  const resp = await request.post('/content/delete', { requestData: { id } })
  return resp
}
