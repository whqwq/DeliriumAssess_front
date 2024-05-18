<template>
  <div class="topbar">
    <div class="topbar-left">
      <div class="topbar-title">
        谵妄评估系统
      </div>
    </div>
    <div class="topbar-right">
      <div class="topbar-avatar">
        <el-avatar>user</el-avatar>
      </div>
    </div>
  </div>
  <div class="topbar-space"></div>
</template>

<script setup>
</script>

<style scoped lang="less">
@topbarHeight: 56px;
.topbar-space {
  width: 100%;
  height: @topbarHeight;
}
.topbar {
  background: linear-gradient(135deg, #404c70 0%, #1e253d 100%);
  width: 100%;
  height: @topbarHeight;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  box-shadow: 0 1px 4px gray;
  padding: 0 16px;
  .topbar-left {
    .topbar-title {
      color: #fff;
      font-size: 20px;
      &::before {
        vertical-align: middle;
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../assets/img/logo.png') no-repeat;
        background-size: 100%;
        margin-right: 10px;
      }
    }
  }
  .topbar-right {
    .topbar-avatar {
      cursor: default;
    }
  }
}
</style>