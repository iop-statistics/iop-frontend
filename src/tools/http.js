import axios from 'axios'

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;

axios.interceptors.response.use(response => {
  return response
}, err => {
  let msg = ''
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break;
      case 401:
        err.message = '未授权，请重新登录'
        break;
      case 403:
        err.message = '拒绝访问'
        break;
      case 404:
        err.message = '请求错误,未找到该资源'
        break;
      case 405:
        err.message = '请求方法未允许'
        break;
      case 408:
        err.message = '请求超时'
        break;
      case 500:
        err.message = '服务器端出错'
        break;
      case 501:
        err.message = '网络未实现'
        break;
      case 502:
        err.message = '网络错误'
        break;
      case 503:
        err.message = '服务不可用'
        break;
      case 504:
        err.message = '网络超时'
        break;
      case 505:
        err.message = 'http版本不支持该请求'
        break;
      default:
        err.message = `连接错误${err.response.status}`
    }
    err.response['msg'] = err.message
    msg = 'ajax Intercept errors----------------->' + '\n\n' + 'statusCode：' + err.response.status + '\n' + 'errorMessage：' + err.message
  } else {
    err.message = 'Your network seems bad, please refresh the page'
    msg = 'ajax Intercept errors----------------->' + '\n\n' + 'errorMessage：' + err.message
  }
  // message.err(err.message)
  console.log(msg)
  return Promise.resolve(err.response)
})

// http://hk.commonspace.com.au:8080/outdoor/          香港生产
// https://syd.commonspace.com.au/                     悉尼生产https

axios.defaults.baseURL = 'http://db.baka.pw:8898'
// axios.defaults.withCredentials = true //意思是携带cookie信息,保持session的一致性
// 设置默认请求头
axios.defaults.headers = {
  'Content-Type': 'application/json',
}
axios.defaults.timeout = 40000

export default {
  // get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials: false,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  },
  // post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        // headers: {
        //   'Content-type': 'application/x-www-form-urlencoded'
        // },
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }, { emulateJson: true }).then(res => {
        if (res === undefined) return false;
        if (res.data.success) {
          res['success'] = true
          resolve(res)
        } else {
          let errorInfo = {
            success: res.data.success,
            msg: res.data.errorInfo || res.data.errorCode
          }
          resolve(errorInfo)
          // alert('statusCode：' + res.status + '\n' + 'errorMessage：' + msg)
        }
      }).catch(function (error) {
        alert('axiosErr')
        console.log('axiosError:' + error)
      })
    })
  }
}
