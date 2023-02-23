// 获取首页轮播图列表
import request from '../utils/request'

export async function getPartnerList (code) {
  const resp = await request.post('/type/info', { requestData: { code } })
  return resp.data.attachment
}

// 更新首页轮播图
export async function uploadPartInfo (data) {
  const resp = await request.post('/type/update', { requestData: { ...data } })
  return resp
}
