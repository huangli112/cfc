import { message } from 'ant-design-vue'

export const UploadUrl = 'http://114.67.199.59/cfc/file/upload'

export function blobToDataURI (blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export async function downloadImage (fileId) {
  if (!fileId) {
    return message.error('not find fileId ')
  }

  try {
    const resp = await fetch('http://114.67.199.59:80/cfc/file/download?fileUUID=' + fileId)
    const blob = await resp.blob()
    return blobToDataURI(blob)
  } catch (error) {
    // 文件下载失败
    message.error('file download error')
  }
}

export function handleAttachmentId (fileList) {
  if (!fileList) {
    return []
  }
  return fileList.map(item => item.response.data.id)
}

export function handleFileList (attachmentFiles) {
  if (!attachmentFiles) {
    return []
  }
  return attachmentFiles.map((item, index) => ({
    uid: '' + index,
    name: item.fileName || item.name,
    status: 'done',
    thumbUrl: item.thumbUrl,
    response: {
      code: '0',
      data: item,
      message: 'success',
      timestamp: Date.now()
    }
  }))
}
