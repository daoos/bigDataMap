import axios from "axios";
import qs from "qs";

var apiUrl = 'http://'+ window.location.host + '/dataquery/MapAjaxInfoServlet.do';

if(sessionStorage.getItem('apiUrl')){
    apiUrl = sessionStorage.getItem('apiUrl')
}

export const request = axios.create({
    baseURL:apiUrl,
    //baseURL: process.env.BASE_API, // 因为我本地做了反向代理
    // baseURL: process.env.BASE_API_JSON, // 因为我本地做了反向代理
    timeout: 70000,
    responseType: "json",
    //withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});


//POST传参序列化(添加请求拦截器)
request.interceptors.request.use(
    config => {
        // 在发送请求之前做某件事
        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "delete"
        ) {
            // 序列化
            config.data = qs.stringify(config.data);
        }

        return config;
    },
    error => {
        return Promise.reject(error.data.error.message);
    }
);

//返回状态判断(添加响应拦截器)
request.interceptors.response.use(
    res => {
        //对响应数据做些事
        if (res.data && !res.data.success) {}
        return res;
    },
    error => {
        return Promise.reject(error);
    }
);


// export default request

export const requestJson = axios.create({
    baseURL:'./static/',
    timeout: 70000,
    responseType: "json",
    //withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});


//POST传参序列化(添加请求拦截器)
requestJson.interceptors.request.use(
    config => {
        // 在发送请求之前做某件事
        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "delete"
        ) {
            // 序列化
            config.data = qs.stringify(config.data);
        }

        return config;
    },
    error => {
        return Promise.reject(error.data.error.message);
    }
);

//返回状态判断(添加响应拦截器)
requestJson.interceptors.response.use(
    res => {
        //对响应数据做些事
        if (res.data && !res.data.success) {}
        return res;
    },
    error => {
        return Promise.reject(error);
    }
);
