import axios from 'axios';
import store from '../store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false, //true配合cookie使用 后台的 Access-Control-Allow-Origin:*  不能设置为*号
  timeout: 5000
})

service.interceptors.request.use((config: any) => { //请求拦截
  // get 请求，添加到 url 中
  const icode = '5DF501E064444443'
  config.params = { ...config.params, icode: icode }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: '5DF501E064444443' }
  }
  store.commit('setLoading', true)
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use( //响应拦截
  res => {
    if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
      return Promise.reject(res || 'error')
    } else {
      setTimeout(() => {
        store.commit('setLoading', false)
      }, 0)
      console.log(res, 'success')
      return res
    }
  },
  err => {
    console.log(err.response, 'err')
    if(err.response===undefined){
      store.commit('setError', { status: true, message: '请检查网络状况' })
      store.commit('setLoading', false)
    }
    const { error } = err.response.data||err.response
    if(error!==undefined){
      store.commit('setError', { status: true, message: error })
      store.commit('setLoading', false)
      return Promise.reject(error)
    }else{
      store.commit('setError', { status: true, message: error })
      store.commit('setLoading', false)
      return Promise.reject('error')
    }
    
  }
)
export default service