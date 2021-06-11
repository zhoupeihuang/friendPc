import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


let baseUrl ='/dev-api'
console.log(process.env.VUE_APP_TYPE);
switch (process.env.VUE_APP_TYPE) {
  case 'development':
    // baseUrl = https://www.fastmock.site/mock/48b8202c8e9f39ca94c9078f450536e1/hymMock/getSystemRouters
    baseUrl = 'dev-api'
    break
  case 'sit':
    baseUrl = 'http://testapi.haiwm.com/hyportal3-service'
    break
  case 'uat':
    baseUrl = 'http://testapi.haiwm.com/hyportal3-service'
    break
  case 'production':
    baseUrl = 'https://www.haiwm.com/hyportal3-service'
    break
}

// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
 
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录', '注销登录', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

// // 获取 URL 参数
function getQueryVariable(url, variable) {
  var query = url.split("?")[1];
  if (query == undefined) return null;
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var param = vars[i].split("=");
    if (param[0] == variable) { return param[1]; }
  }
  return null;
}

export { getQueryVariable }

var RequestApi = {
  async get(url, data) {
    try {
      var res = await axios.get(url, {
        params: data
      })
      res = res.data
      return new Promise((resolve) => {
        if (res.status == 1) {
          resolve(res)
        } else {
          resolve(res);
        }
      })
    } catch (error) {
      //Toast('服务出错');
      console.log(error);
    }
  },
  async post(url, data) {
    try {
      var res = await axios.post(url, qs.stringify(data))
      res = res.data
      return res;
      // return new Promise((resolve, reject) => {
      //   if (res.status == 1) {
      //     resolve(res);
      //   } else {
      //     Toast(res.msg);
      //     reject(res);
      //   }
      // })
    } catch (error) {
      //Toast('服务出错');
      console.log(error);
    }
  }
}
export {
  RequestApi
}
