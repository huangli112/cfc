import request from '@/utils/request'

export async function getMenuList () {
  const resp = await request.post('/type/findFirstList')
  const data = resp.data.map(item => {
    return {
      code: item.code,
      title: item.title,
      path: item.alias,
      icon: 'windows'
    }
  })

  return {
    ...resp,
    data
  }
}

// 获取首页轮播图列表
export async function getHomeSliderList (code) {
  const resp = await request.post('/type/info', { requestData: { code } })
  return resp.data.attachment
}

// 更新首页轮播图
export async function uploadInfo (data) {
  const resp = await request.post('/type/update', { requestData: { ...data } })
  return resp
}
