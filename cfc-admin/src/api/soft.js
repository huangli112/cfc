import request from '../utils/request'

export async function getSoftInfoList(code) {
    const resp = await request.post('/content/list', { page: { pageNumber: 1, pageSize: -1 }, requestData: { code } })
    return resp.data.list
}

export async function getSoftInfo(id) {
    const resp = await request.post('/content/info', { requestData: { id } })
    return resp.data
}

export async function addSoft(data) {
    const resp = await request.post('/content/save', { requestData: data })
    return resp
}

export async function updateSoft(data) {
    const resp = await request.post('/content/update', { requestData: data })
    return resp
}

export async function deleteSoft(id) {
    const resp = await request.post('/content/delete', { requestData: { id } })
    return resp
}