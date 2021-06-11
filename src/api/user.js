import request from '@/utils/request'
import axios from 'axios'
import qs from 'qs';

export function login(data) {
  return request({
    url: '/hywing/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/hywing/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/hywing/user/logout',
    method: 'post'
  })
}

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
