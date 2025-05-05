<template>
    <div class="login-page">
        <el-form :model="loginForm" class="login-container">
            <h3>系统登录</h3>
            
            <el-form-item>
                <el-input
                    type="input"
                    placeholder="请输入用户名"
                    v-model="loginForm.username"
                >
                </el-input>
            </el-form-item>
            
            <el-form-item>
                <el-input
                    type="password"
                    placeholder="请输入密码"
                    v-model="loginForm.password"
                >
                </el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="login"> 登录 </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>

import { reactive,getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
import { useAllDataStore } from '@/stores'
import { ElMessage } from 'element-plus'

const { proxy } = getCurrentInstance();
const router = useRouter()
const store = useAllDataStore()
const loginForm = reactive({
  username: '',
  password: '',
});

const login = async () => {
  const res = await proxy.$api.getMenu(loginForm);
    if(res){
      store.updateMenuList(res.menuList)
      store.state.token=res.token
      //在这里执行添加路由方法,并传入router
      store.addMenu(router)
      router.push("/home")
    }
}
</script>

<style lang="less" scoped>
.login-page {
    width: 100%;
    height: 100vh;
    background-image: url('../assets/images/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    h3 {
        text-align: center;
        margin-bottom: 20px;
        color: #505450;
    }
    // 样式穿透
    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>