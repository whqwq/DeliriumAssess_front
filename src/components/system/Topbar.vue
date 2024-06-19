<template>
  <div class="topbar">
    <div class="topbar-left">
      <template v-if="showBack">
        <el-icon @click="goBack" style="cursor: pointer"><Back /></el-icon>
        <el-divider direction="vertical" />
      </template>
      <div class="topbar-title" v-if="showLogo">谵妄评估系统</div>
    </div>
    <div class="topbar-right">
      <div class="topbar-avatar">
        <el-avatar>{{ username }}</el-avatar>
      </div>
    </div>
  </div>
  <div class="topbar-space"></div>
</template>

<script setup>
import Cookie from '@/utils/cookie.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  showBack: { default: true },
  showLogo: { default: true }
})
const username = Cookie.getCookie('name')
const goBack = () => {
  router.go(-1)
}
</script>

<style scoped lang="less">
.topbar-space {
  width: 100%;
  height: var(--topbar-height);
}
.topbar {
  z-index: 10;
  background: linear-gradient(135deg, #404c70 0%, #1e253d 100%);
  width: 100%;
  height: var(--topbar-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  box-shadow: 0 1px 4px gray;
  padding: 0 16px;
  font-size: calc(var(--topbar-height) / 2);
  color: white;
  line-height: var(--topbar-height);
  .topbar-left {
    display: flex;
    align-items: center;
    .topbar-title {
      text-align: center;
      // font-size: 20px;
      &::before {
        vertical-align: middle;
        content: '';
        display: inline-block;
        width: calc(var(--topbar-height) / 2);
        height: calc(var(--topbar-height) / 2);
        background: url('../../assets/img/logo.png') no-repeat;
        background-size: 100%;
        margin: 0 10px;
      }
    }
  }
  .topbar-right {
    .topbar-avatar {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
