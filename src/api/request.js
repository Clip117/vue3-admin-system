import axios from 'axios';
import { ElMessage } from 'element-plus';
import config from '@/config';
// 添加axios的一个实例对象
const service = axios.create({
  baseURL:config.baseApi,
});
const NETWORK_ERROR = "网络错误...";
// 以下代码是axios官网的拦截器代码
// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
      }
);

// 添加响应拦截器
service.interceptors.response.use(
    (res)=>{
        console.log(res)
        const { code,data,msg } = res.data;
        //这个端口是和后端约定好的
        if(code === 200){
            return data;
        }else{
            const NETWORK_ERROR = "网络错误...";
            // 有message就报message，没有就报网络错误
            ElMessage.error(msg || NETWORK_ERROR);
            return Promise.reject(msg || NETWORK_ERROR);
        }
    }
);

// 这是我们的核心方法
function request(options) {
  options.method = options.method || 'get';
  // 关于get请求参数调整，这是axios的一个使用，我们做了get和其他方法的统一
  // 不论是什么方法，都传data
  if (options.method.toLowerCase() === 'get'){
    options.params = options.data;
  }
  // 对mock的开关做一个处理
  let isMock = config.mock;
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock;
  }
  // 针对环境做一个处理
  if (config.env === 'prod') {
    // 如果是线上环境，就不能用mock
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mock : config.baseApi;
  }
  return service(options)
}

// 导出我们的请求
export default request;