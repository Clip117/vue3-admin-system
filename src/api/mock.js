import Mock from 'mockjs'
import homeApi from './mockData/home.js'
import userApi from './mockData/user'
import permissionApi from './mockData/permission'

// 第一个参数是拦截的路径，第二个参数是方法，第三个参数是制造出的假数据
// 此处第一个参数写法是正则表达式
// 第一个路径只要局部匹配上就可以拦截住请求
Mock.mock(/api\/home\/getTableData/, "get", homeApi.getTableData);
Mock.mock(/api\/home\/getCountData/, "get", homeApi.getCountData);
Mock.mock(/api\/home\/getChartData/, "get", homeApi.getChartData);
Mock.mock(/user\/getUserData/,"get", userApi.getUserList);
Mock.mock(/user\/deleteUser/, "get", userApi.deleteUser);
Mock.mock(/user\/addUser/,"post", userApi.createUser);
Mock.mock(/user\/editUser/, "post",userApi.updateUser);
Mock.mock(/permission\/getMenu/, "post",permissionApi.getMenu);