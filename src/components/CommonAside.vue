<template>
    <!-- width不写死-->
    <el-aside :width="width">
        <!-- 在elementplus复制菜单组件 -->
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="activeMenu"
        >
            <h3 v-show="!isCollapse">通用后台管理系统</h3>
            <h3 v-show="isCollapse">系统</h3>
            <!-- 先进行无子菜单的遍历 -->
            <!-- 此处 v-for这一串是给item进行了遍历-->
            <el-menu-item 
                v-for="item in noChildren"
                :key="item.path"
                :index="item.path"
                @click="handleMenu(item)"
            >
            <component class="icons":is="item.icon"></component>
            <span>{{item.label}}</span>
            </el-menu-item>
            
            <!-- 再进行有子菜单的遍历 -->
            <el-sub-menu 
                v-for="item in hasChildren"
                :key="item.path"
                :index="item.path"
            >
                <template #title>
                    <component class="icons":is="item.icon"></component>
                    <span>{{item.label}}</span>
                </template>
                <!-- 对el-menu-item进行遍历 -->
                <el-menu-item-group>
                    <el-menu-item 
                        v-for="(subItem,subIndex) in item.children"
                        :key="subItem.path"
                        :index="subItem.path"
                        @click="handleMenu(subItem)"
                    >
                    <component class="icons":is="subItem.icon"></component>
                    <span>{{subItem.label}}</span>
                    </el-menu-item>
                </el-menu-item-group>            
            </el-sub-menu>
      </el-menu>
    </el-aside>
</template>

<script setup>
import { ref,computed } from 'vue';
import { useAllDataStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'

// const list =ref([
//       	{
//           path: '/home',
//           name: 'home',
//           label: '首页',
//           icon: 'house',
//           url: 'Home'
//       	},
//         {
//             path: '/mall',
//             name: 'mall',
//             label: '商品管理',
//             icon: 'video-play',
//             url: 'Mall'
//         },
//         {
//             path: '/user',
//             name: 'user',
//             label: '用户管理',
//             icon: 'user',
//             url: 'User'
//         },
//         {
//             path: 'other',
//             label: '其他',
//             icon: 'location',
//             children: [
//                 {
//                     path: '/page1',
//                     name: 'page1',
//                     label: '页面1',
//                     icon: 'setting',
//                     url: 'Page1'
//                 },
//                 {
//                     path: '/page2',
//                     name: 'page2',
//                     label: '页面2',
//                     icon: 'setting',
//                     url: 'Page2'
//                 }
//             ]
//         }
// ])

const list =computed(()=>store.state.menuList)

// noChildren属性是没有子菜单的
// hasChildren属性是有子菜单的
// noChildren和hasChildren是对上面list进行的分类，在template的标签属性中使用
const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren =computed(() => list.value.filter(item => item.children))
const store = useAllDataStore()
const isCollapse = computed(() => store.state.isCollapse)
const width = computed(() => store.state.isCollapse ? '64px' : '180px')
const router = useRouter()
const route = useRoute()
const handleMenu = (item) => {
    router.push(item.path)
    store.selectMenu(item)
}
const activeMenu = computed(()=>route.path)
</script>

<style scoped lang="less">
.icons{
    width: 18px;
    height: 18px;
    margin-right: 5px;
}
.el-menu{
    border-right: none;
    h3{
        line-height: 48px;
        color:#fff;
        text-align: center;
    }
}
.el-aside{
    height: 100%;
    background-color: #545c64;
}
</style>
