<template>
  <div class="login-page">
    <div class="login-header">
      <div class="title">谵妄评估系统</div>
    </div>
    <div class="login-main">
      <el-form :model="loginForm" class="login-form">
        <div class="form-title">登录</div>
        <el-form-item>
          <el-input
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            name="phone"
            tabindex="1"
            :prefix-icon="User"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
            name="password"
            tabindex="2"
            :prefix-icon="Lock"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="submitLogin" class="btn-login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="isShowChangPwdDialog = true" class="sub-btn-login" link
            >修改密码</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-dialog v-model="isShowChangPwdDialog" title="修改密码" width="400">
      <el-form :model="changePwdForm">
        <el-form-item>
          <el-input
            v-model="changePwdForm.phone"
            placeholder="请输入手机号"
            name="phone"
            tabindex="1"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="changePwdForm.password"
            placeholder="请输入原密码"
            type="password"
            name="password"
            tabindex="2"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="changePwdForm.passwordNew1"
            placeholder="请输入新密码"
            type="password"
            name="passwordNew1"
            tabindex="3"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="changePwdForm.passwordNew2"
            placeholder="请再次输入新密码"
            type="password"
            name="passwordNew2"
            tabindex="4"
            clearable
          />
        </el-form-item>
        <el-button type="primary" @click="submitChangePassword" style="width: 100%">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import Cookie from '@/utils/cookie.js'
import HTTPAPI from '@/utils/http/api.js'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const loading = ref(false)
const isShowChangPwdDialog = ref(false)
const loginForm = reactive({
  phone: '',
  password: ''
})
const changePwdForm = reactive({
  phone: '',
  password: '',
  passwordNew1: '',
  passwordNew2: ''
})
const submitLogin = () => {
  loading.value = true
  HTTPAPI.login(loginForm).then((res) => {
    loading.value = false
    if (!res || res.status !== 0) return
    const { data } = res

    Cookie.setCookie({ token: data.token, phone: loginForm.phone, name: data.name, id: data.id })
    data.isAdmin ? router.push('/admin') : router.push('/projectList')
  })
}
const submitChangePassword = () => {
  if (
    !changePwdForm.phone ||
    !changePwdForm.password ||
    !changePwdForm.passwordNew1 ||
    !changePwdForm.passwordNew2
  ) {
    ElMessage.error('请填写完整信息')
    return
  }
  if (changePwdForm.passwordNew1 !== changePwdForm.passwordNew2) {
    ElMessage.error('两次输入的新密码不一致')
    return
  }
  HTTPAPI.changePassword({
    phone: changePwdForm.phone,
    password: changePwdForm.password,
    newPassword: changePwdForm.passwordNew1
  }).then((res) => {
    if (!res || res.status !== 0) return
    ElMessage.success('修改密码成功')
    isShowChangPwdDialog.value = false
  })
}
</script>

<style scoped lang="less">
@height-input-large: 56px;
@height-input-small: 48px;
@font-size-large: 16px;
@font-size-small: 14px;
@text-color: #333;
.login-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #404c70 0%, #1e253d 100%);
  .login-header {
    font-size: 28px;
    color: #fff;
    font-weight: 500;
    position: absolute;
    top: 50px;
    left: 50px;
    display: flex;
    .title {
      height: 40px;
      line-height: 40px;
      &::before {
        vertical-align: middle;
        content: '';
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('../../assets/img/logo.png') no-repeat;
        background-size: 100%;
        margin-right: 10px;
      }
    }
  }
  .login-main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 100px;
    .login-form {
      width: 500px;
      background: #fff;
      border-radius: 8px;
      padding: 50px;
      box-sizing: border-box;
      font-size: @font-size-large;
      .form-title {
        margin-bottom: 48px;
        font-size: 32px;
        line-height: 1.5;
        color: @text-color;
        font-weight: 600;
      }
      .el-form-item {
        margin-bottom: 24px;
        .svg-icon {
          z-index: 1;
          position: absolute;
          top: 50%;
          left: 20px;
          translate: 0 -50%;
        }
      }
      .el-input {
        :deep(.el-input__inner) {
          line-height: @height-input-large;
          height: @height-input-large;
          font-size: @font-size-large;
        }
      }
      .btn-login {
        width: 400px;
        height: 56px;
        margin-top: 24px;
        height: 56px;
      }
      .sub-btn-login {
        height: 22px;
        line-height: 22px;
        font-weight: 400;
      }
    }
  }
}
</style>
