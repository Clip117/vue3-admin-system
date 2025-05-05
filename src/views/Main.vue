<script setup>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTab from '@/components/CommonTab.vue'
</script>

<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <!-- 左侧：自定义组件（可能包含菜单逻辑） -->
            <!-- 我们现在想点击header上的方框，控制左侧栏 -->
            <!-- 涉及组件间的传值，使用pinia -->
            <common-aside />
            
            <el-container>
            <!-- 顶部：复用自定义的 Header 组件 -->
            <el-header class="el-header">
                <common-header /> <!-- 这里复用了自定义的 Header 组件 -->
            </el-header>
            <common-tab />
            <!-- 主内容区 -->
            <el-main class="right-main">
                <router-view></router-view>
            </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="less">
    .common-layout,.lay-container{
        height: 100%;
    }
    .el-header{
        background-color: #333;       
    }
</style>
