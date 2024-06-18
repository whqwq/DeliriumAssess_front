<template>
  <div class="admin-page">
    <Topbar :showBack="false" />
    <div class="admin-main">
      <el-tabs>
        <el-tab-pane label="用户列表">
          <UsersManage />
        </el-tab-pane>
        <el-tab-pane label="项目列表">
          <ProjectsManage />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import Topbar from '@/components/system/Topbar.vue'
import UsersManage from './UsersManage.vue'
import ProjectsManage from './ProjectsManage.vue'
</script>

<style lang="less" scoped>
.admin-page {
  padding: 32px;
}
.admin-main {
  margin-bottom: 32px;
  background-color: white;
  padding: 16px 32px;
  border-radius: 4px;
}
:deep(.el-tabs__content) {
  padding-top: 16px;
}
</style>
