//从 vue-router 中引入两个方法：createRouter 用于创建路由器对象，
// createWebHashHistory 用于开启 Hash 模式（URL 中带 # 的形式）
import { createRouter, createWebHashHistory } from "vue-router";

// 制定路由规则，每一项是一个路由配置对象
const routes = [
    {   
        // 路由路径，当访问根路径 `/` 时会匹配这个路由
        path: "/",
        // 路由名称，可以在编程式导航中使用
        name: "main",
        // 路由对应的组件，这里使用了懒加载方式引入 Main.vue（只有在访问时才加载）
        component: () => import("@/views/Main.vue"),
        // 重定向到 /home
        redirect: "/home",
    },
    //     children:[
    //         {
    //             path: "home",
    //             name: "home",
    //             component: () => import("@/views/Home.vue"),
    //         },
    //         {
    //             path: "user",
    //             name: "user",
    //             component: () => import("@/views/User.vue"),
    //         },
    //          //下面三个是新添加的路由
    //         {
    //             path: 'mall',
    //             name: 'mall',
    //             component: () => import('@/views/Mall.vue')
    //         },
    //         {
    //             path: 'page1',
    //             name: 'page1',
    //             component: () => import('@/views/Page1.vue')
    //         },
    //         {
    //             path: 'page2',
    //             name: 'page2',
    //             component: () => import('@/views/Page2.vue')
    //         }
    //     ]
    // },
    //注意这个是一级路由，不是放到之前的children中
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/Main.vue'),
        redirect: '/home',
        children:[
        ]
    },
    //也是一级路由
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
    }
    
]
// 创建路由器对象，配置路由模式和路由规则
const router = createRouter({
    // 路由模式使用 hash 模式（URL 中会带有 # 号），适用于不配置服务器重定向的情况
    history: createWebHashHistory(),
    // 将上面定义的路由规则传入
    routes,
  }); 

// 导出路由对象，在 main.js 中引入并挂载到 Vue 应用上
export default router;

