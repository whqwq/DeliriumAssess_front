<template>
  <div class="admin-page">
    <Topbar :showBack="false" />
    <div class="admin-main">
      <el-tabs>
        <el-tab-pane label="用户列表">
          <UsersManage :userList="userList" />
        </el-tab-pane>
        <el-tab-pane label="项目列表">
          <ProjectsManage :userList="userList" :projectList="projectList" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import Topbar from '@/components/system/Topbar.vue'
import UsersManage from './UsersManage.vue'
import ProjectsManage from './ProjectsManage.vue'
import { ref, onMounted } from 'vue'

const userList = ref([])
const projectList = ref([])

onMounted(() => {
  userList.value = [
    { name: 'Alex', phone: '111', hospital: 'abc', createDate: '2024-05-27', remark: 'aaaaaa' },
    { name: 'Bob', phone: '112', hospital: 'abc', createDate: '2024-05-27', remark: 'aaaaaa' }
  ]
  projectList.value = [
    { name: '项目A', id: 'XM001', description: 'balabala' },
    { name: '项目B', id: 'XM002', description: 'balabala' }
  ]
})
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
