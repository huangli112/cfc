/*
* 获取首页轮播图列表
* 获取合作伙伴列表
*
*
*
* */
import request from '../utils/request'

export async function getSliderList (code) {
  const resp = await request.post('/type/info', { requestData: { code } })
  return resp.data.attachment
}

/*
* 获取留言板列表 /onlineMessage/list 不传参数
*
* */
export async function getMessageList (page, data) {
  const resp = await request.post('/onlineMessage/list', { page, requestData: { ...data } })
  return resp.data
}

/*
获取留言模块下拉菜单
*/
export async function getModuleList () {
  const resp = await request.post('/onlineMessage/findMouderList')
  return resp.data
}

/*
* 删除留言
* */
export async function deleteMessage (id) {
  const resp = await request.post('/onlineMessage/delete', { requestData: { id } })
  return resp.data
}

/*
* 获取联系我们列表 /info/list 获取第一条数据  不用传参
* 根据Id去修改记录
*
* */

export async function updateInfo (data) {
  const res = await request.post('/info/update', { requestData: { ...data } })
  return res
}

export async function getContactInfo () {
  const resp = await request.post('/info/list', { page: { pageNumber: 1, pageSize: -1 }, requestData: {} })
  return resp.data.list
}

/*
* 修改每个子模块的banner图  对应的父级ID拿到 /type/update
* */

export async function editModuleImg () {
  const resp = await request.post('/type/update')
  return resp.data
}

/*
获取关于我们信息 用来获取基础数据 /type/info
*/

export async function getTypeInfo (code) {
  const res = await request.post('type/info', { requestData: { code } })
  return res.data
}

export async function updateTypeInfo (data) {
  const res = await request.post('type/update', { requestData: { ...data } })
  return res.data
}

// 获取内容列表 (企业信息 实训板块列表 软件产品列表 新闻列表)

export async function getContentList (code) {
  const res = await request.post('content/list', { page: { pageNumber: 1, pageSize: -1 }, requestData: { code } })
  return res.data.list
}

export async function addContentInfo (params) {
  const res = await request.post('/content/save', { requestData: { ...params } })
  return res.data
}

export async function getContentInfoById (id) {
  const res = await request.post('/content/info', { requestData: { id } })
  return res.data
}

export async function updateContentInfo (data) {
  const res = await request.post('/content/update', { requestData: { ...data } })
  return res.data
}

export async function deleteContentInfo (id) {
  const res = await request.post('/content/delete', { requestData: { id } })
  return res
}

// 获取联系我们子集菜单
export async function getContactChild (code) {
  const res = await request.post('/type/child', { requestData: { code } })
  return res.data.map(item => item.id)
}
