import requset from '../untils/request'

const uploadFileRequest = function (url: string,formData: any) {
  return requset({
    method: 'post',
    url: url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export {
  uploadFileRequest
}