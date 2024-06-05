<template>
  <div class="admin-projects">
    <div class="header-line">
      <div>
        <el-button type="success" @click="createProjectVisible = true">创建项目</el-button>
      </div>
      <el-input
        v-model="searchProjectText"
        placeholder="搜索项目"
        :prefix-icon="Search"
        class="search-input"
      />
    </div>
    <el-table :data="curProjectList" class="project-table">
      <el-table-column prop="id" label="项目编号"></el-table-column>
      <el-table-column prop="name" label="项目名"></el-table-column>
      <el-table-column label="操作" width="330">
        <template #default="scope">
          <el-button size="small" @click="handleEditProject(scope.$index, scope.row)"
            >修改信息</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDeleteProject(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="editProjectVisible" title="修改信息" width="400">
    <el-form :model="editProjectForm" label-width="auto" label-position="left">
      <el-form-item label="项目编号">
        <el-input v-model="editProjectForm.id" name="id" tabindex="1" disabled />
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input
          v-model="editProjectForm.name"
          placeholder="请输入修改后的项目名"
          name="name"
          tabindex="2"
        />
      </el-form-item>
      <el-form-item label="项目简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3 }"
          v-model="editProjectForm.description"
          placeholder="请输入修改后的项目简介"
          name="description"
          tabindex="3"
        />
      </el-form-item>
      <el-button type="primary" @click="submitEditProject" style="width: 100%">提交修改</el-button>
    </el-form>
  </el-dialog>
  <el-dialog v-model="createProjectVisible" title="新建项目">
    <CreatePrject :userList="userList" @close="createProjectVisible = false" />
  </el-dialog>
</template>

<script setup>
import CreatePrject from './CreateProject.vue'
import { debounce } from 'lodash'
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { ref, watch, computed } from 'vue'
const props = defineProps(['projectList', 'userList'])
const projectList = computed(() => props.projectList)
const userList = computed(() => props.userList)

const searchProjectText = ref('')
const createProjectVisible = ref(false)
const editProjectVisible = ref(false)
const editProjectForm = ref({
  id: '',
  name: '',
  description: ''
})
const curProjectList = ref([])
const handleEditProject = (index, row) => {
  editProjectForm.value.id = row.id
  editProjectForm.value.name = row.name
  editProjectForm.value.description = row.description
  editProjectVisible.value = true
}
const handleDeleteProject = (index, row) => {
  ElMessageBox.confirm(`确认删除项目 ${row.id} ${row.name} ？`, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {})
}
const submitEditProject = (index, row) => {
  const form = editProjectForm.value
  if (!form.id || !form.name || !form.description) return
  editProjectVisible.value = false
  editProjectForm.value = { id: '', name: '', description: '' }
}
const searchCurProjectList = (newS) => {
  const s = newS.toLowerCase()
  if (s) {
    curProjectList.value = projectList.value.filter((u) =>
      `${u.name}${u.id}`.toLowerCase().includes(s)
    )
  } else {
    curProjectList.value = projectList.value
  }
}
watch(searchProjectText, debounce(searchCurProjectList, 500), { deep: true, immediate: true })
</script>

<style lang="less" scoped>
.header-line {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  .search-input {
    width: 300px;
  }
}
</style>
