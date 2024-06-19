<template>
  <div class="projectList">
    <Topbar :showBack="false" />
    <div class="projectList-main">
      <div class="header-line">
        <el-input
          v-model="searchContent"
          placeholder="搜索项目"
          :prefix-icon="Search"
          class="search-input"
        />
      </div>
      <el-table :data="projectList" class="project-table">
        <el-table-column prop="projectId" label="项目编号"></el-table-column>
        <el-table-column prop="projectName" label="项目名"></el-table-column>
        <el-table-column label="操作" width="330">
          <template #default="scope">
            <el-button size="small" @click="gotoProject(scope.$index, scope.row)"
              >进入项目</el-button
            >
            <el-button size="small" @click="showMember(scope.$index, scope.row)"
              >成员管理</el-button
            >
            <el-button
              size="small"
              @click="handleEditProject(scope.$index, scope.row)"
              v-if="scope.row.isLeader"
              >修改信息</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDeleteProject(scope.$index, scope.row)"
              v-if="scope.row.isLeader"
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
          <el-input v-model="editProjectForm.projectId" name="projectId" tabindex="1" disabled />
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            v-model="editProjectForm.projectName"
            placeholder="请输入修改后的项目名"
            name="projectName"
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
        <el-button type="primary" @click="submitEditProject" style="width: 100%"
          >提交修改</el-button
        >
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="projectMemberVisible"
      :title="project2showMember.projectId + project2showMember.projectName + '成员'"
      width="75%"
    >
      <ProjectMember :project="project2showMember" />
    </el-dialog>
  </div>
</template>

<script setup>
import HTTPAPI from '@/utils/http/api.js'
import { debounce } from 'lodash'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Topbar from '@/components/system/Topbar.vue'
import ProjectMember from './ProjectMember.vue'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const searchContent = ref('')
const editProjectVisible = ref(false)
const projectMemberVisible = ref(false)
const project2showMember = ref({})
const editProjectForm = ref({
  projectId: '',
  projectName: '',
  description: ''
})
const projectList = ref([])
const allProjectList = ref([])
const handleEditProject = (index, row) => {
  editProjectForm.value.projectId = row.projectId
  editProjectForm.value.projectName = row.projectName
  editProjectForm.value.description = row.description
  editProjectVisible.value = true
}
const showMember = (index, row) => {
  projectMemberVisible.value = true
  project2showMember.value = row
}
const gotoProject = (index, row) => {
  router.push({ path: '/project', query: { projectId: row.projectId } })
}
const handleDeleteProject = (index, row) => {
  ElMessageBox.confirm(`确认删除项目 ${row.projectId} ${row.projectName} ？`, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    HTTPAPI.deleteProject({ projectId: row.projectId }).then((res) => {
      if (!res || res.status !== 0) return
      ElMessage.success('删除成功')
      getAllProjectList()
    })
  })
}
const submitEditProject = (index, row) => {
  const form = editProjectForm.value
  if (!form.projectId || !form.projectName || !form.description) return
  HTTPAPI.changeProjectInfo(form).then((res) => {
    if (!res || res.status !== 0) return
    ElMessage.success('修改成功')
    getAllProjectList()
    editProjectVisible.value = false
    editProjectForm.value = { projectId: '', projectName: '', description: '' }
  })
}
const searchCurProjectList = (newS) => {
  const s = newS?.toLowerCase()
  if (s) {
    projectList.value = allProjectList.value.filter((u) =>
      `${u.projectName}${u.projectId}`.toLowerCase().includes(s)
    )
  } else {
    projectList.value = allProjectList.value
  }
}
watch(searchContent, debounce(searchCurProjectList, 500), { deep: true, immediate: true })

const getAllProjectList = () => {
  allProjectList.value = []
  HTTPAPI.getAllProjects().then((res) => {
    if (!res || res.status !== 0) return
    allProjectList.value = res.data.projects
    searchCurProjectList()
  })
}

onMounted(() => {
  getAllProjectList()
})
</script>

<style lang="less" scoped>
.projectList {
  padding: 32px;
}
.projectList-main {
  margin-bottom: 32px;
  background-color: white;
  padding: 16px 32px;
  border-radius: 4px;
  .header-line {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .search-input {
      width: 300px;
    }
  }
}
</style>
