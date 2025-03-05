@use '@/assets/styles/main.scss'

<script setup lang="ts">
import { ref } from 'vue'
import { useProxy } from '@/hooks/VueHook'
import { useUserStore } from '@/stores/user'
import CryptoJS from 'crypto-js'

const proxy = useProxy()
const userStore = useUserStore()

const formSwitch = ref(true)

const loginForm = ref({
  username: '',
  password: '',
})
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { max: 50, message: '长度不得超过50', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不得少于6位', trigger: 'blur' },
  ],
}

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { max: 50, message: '长度不得超过50', trigger: 'blur' },
  ],
  email: [
    {
      validator: (rule: object, value: string, callback: (arg0: Error | undefined) => void) => {
        const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (!!value && !regex.test(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback(undefined)
        }
      },
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不得少于6位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: object, value: string, callback: (arg0: Error | undefined) => void) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback(undefined)
        }
      },
      trigger: 'blur',
    },
  ],
}

const loginFormRef = ref()
const registerFormRef = ref()

const handleLogin = () => {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      const clone = JSON.parse(JSON.stringify(loginForm.value))
      clone.password = CryptoJS.SHA256(clone.password).toString(CryptoJS.enc.Base64)
      userStore.login(clone)
    } else {
      proxy.$message.error('请检查输入')
    }
  })
}

const handleRegister = () => {
  registerFormRef.value.validate((valid: boolean) => {
    if (valid) {
      const clone = JSON.parse(JSON.stringify(registerForm.value))
      clone.password = CryptoJS.SHA256(clone.password).toString(CryptoJS.enc.Base64)
      clone.confirmPassword = CryptoJS.SHA256(clone.confirmPassword).toString(CryptoJS.enc.Base64)
      userStore.register(clone)
    } else {
      proxy.$message.error('请检查输入')
    }
  })
}
</script>

<template>
  <div class="page-container">
    <div class="logo-container"></div>
    <el-card class="form-card">
      <el-form
        :model="loginForm"
        ref="loginFormRef"
        :rules="loginRules"
        label-position="top"
        class="form-content"
        v-if="formSwitch"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" maxlength="50" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            minlength="6"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit-btn" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="registerForm"
        ref="registerFormRef"
        :rules="registerRules"
        label-position="top"
        class="form-content"
        v-else
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" maxlength="50" />
        </el-form-item>
        <el-form-item label="邮箱（选填）" prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            minlength="6"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请确认密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit-btn" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
      <h4 v-if="formSwitch" class="switch">
        还没注册？点击 <a @click="formSwitch = false">注册</a>
      </h4>
      <h4 v-else class="switch">已有账号？点击 <a @click="formSwitch = true">登录</a></h4>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-image: url('@/assets/images/background.png');
}

.logo-container {
  margin-top: 30px;
  margin-bottom: 30px;
  height: 100px;
  width: 100px;
  background-image: url('@/assets/images/logo.png');
  background-size: cover;
  transition: transform 0.3s;
}

.logo-container:hover {
  transform: scale(1.05);
}

.form-card {
  width: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-tabs {
  margin-top: 10px;
}

.form-content {
  margin-top: 20px;
}

.submit-btn {
  width: 100%;
  background-color: var(--blue);
  border-color: var(--blue);
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.submit-btn:hover {
  background-color: var(--blue-light-3);
  border-color: var(--blue-light-3);
}

.switch {
  margin-top: 30px;
  text-align: center;
  line-height: normal;
}
.switch a {
  color: var(--blue);
}
.switch a:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
