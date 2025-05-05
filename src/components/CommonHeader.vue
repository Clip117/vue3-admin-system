<template>
    <div class="header">
        <!-- l-content是header的左侧内容，是一个图标 -->
        <div class="l-content">
            <el-button size="small" @click="handleCollapse">
                <component class="icons" is="menu"></component>
            </el-button>
            <!-- 这里是一个静态的面包屑-->
            <!-- 因为首页是一定存在的所以直接写死 -->
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if = "current" :to ="current.path">{{current.label}}</el-breadcrumb-item>    
            </el-breadcrumb>
        </div>
          <!-- r-content是header的右侧内容 ，是用户头像-->
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('user')" class="user" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click = "handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import {ref,computed} from 'vue';
import { useAllDataStore } from '@/stores'
import { useRouter } from 'vue-router'
const getImageUrl = (url) => {
    // 新创建一个URL对象，传入图片的路径和当前模块的url
    // 前参数是相对路径，后参数是绝对路径，url是当前模块的url
    //可查new URL mdn
    return new URL(`../assets/images/${url}.png`, import.meta.url).href
}

const store = useAllDataStore()
const handleCollapse = () => {
    // 这里是点击menu图标的事件
    // 通过pinia来控制侧边栏的展开和收起
    // 这里需要引入pinia
    // 通过store来获取侧边栏的状态,做一个取反
    store.state.isCollapse = !store.state.isCollapse
}
const router = useRouter()
const handleLogout= () => {
  //执行重置方法
  store.clean()
  router.push("/login")
}
const current = computed(() => store.state.currentMenu)
</script>

<style scoped lang="less">
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #333;
}
.icons{
    width: 20px;
    height: 20px;    
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
// 以下为样式穿透
:deep(.bread span){
    color:#fff !important;
    cursor: pointer !important;
}
</style>
