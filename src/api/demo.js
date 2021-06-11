// 此文件mock接口对应 mock/modules/demo.js
import request from "@/utils/request";
import axios from 'axios'
import qs from 'qs';
// url为mock 模块中定义的url
// url为mock 模块中定义的url
export const getDemoData = (params = {}) => {
  return request({
    url: "/getList",
    method: "get",
    params: params
  });
};
export const postDemoData = data => {
  return request({
    url: "/postList",
    method: "post",
    data
  });
};
export const getUrlDemoData = (params) => {
  return request({
    url: "/getList?"+params,
    method: "get",    
  });
};



export const loginDone_SearchRequest = params => {
  return request({
    url: 'RepayFlow/RepayFlow_query_todoYCL',
    method: 'post',
    data:params
  });
};


export const uploaderDemoData = data => {
  return request({
    url: "https://httpbin.org/post",
    method: "post",
    data
  });
};

// 登录失败示例
export const loginFail = data => {
  return request({
    url: "/loginFail",
    method: "post",
    data
  });
};



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
