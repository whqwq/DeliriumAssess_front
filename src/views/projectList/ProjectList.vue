<template>
  <div class="projectList">
    <Topbar />
    <div class="projectList-main">
      <div class="header-line">
        <el-button type="primary" plain @click="isShowCreateProject = true">新建项目</el-button>
        <el-input
          v-model="searchContent"
          placeholder="输入信息搜索项目"
          :prefix-icon="Search"
          class="search-input"
        />
      </div>
      <el-table :data="projectTable" class="project-table">
        <el-table-column prop="id" label="项目编号"></el-table-column>
        <el-table-column prop="name" label="项目名"></el-table-column>
        <el-table-column prop="leader" label="组长"></el-table-column>
        <el-table-column label="操作" width="400">
          <template #default="scope">
            <el-button size="small" @click="gotoProject(scope.$index, scope.row)"
              >进入项目</el-button
            >
            <el-button size="small" @click="showMember(scope.$index, scope.row)"
              >查看成员</el-button
            >
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
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
    <el-dialog v-model="isShowCreateProject" title="新建项目" width="400">
      <el-form :model="createProjectForm" label-position="left">
        <el-form-item label="项目编号">
          <el-input
            v-model="createProjectForm.id"
            placeholder="请输入项目编号"
            name="id"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            v-model="createProjectForm.name"
            placeholder="请输入项目名"
            name="name"
            tabindex="2"
          />
        </el-form-item>
        <el-form-item label="项目简介">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3 }"
            v-model="createProjectForm.description"
            placeholder="请输入项目内容简介"
            name="name"
            tabindex="3"
          />
        </el-form-item>
        <el-button type="primary" @click="submitCreateProject" style="width: 100%">创建</el-button>
      </el-form>
    </el-dialog>
    <el-dialog v-model="isShowEditProject" title="修改信息" width="400">
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
        <el-button type="primary" @click="submitCreateProject" style="width: 100%"
          >提交修改</el-button
        >
      </el-form>
    </el-dialog>
    <el-dialog v-model="isShowProjectMember" title="项目成员" width="75%">
      <ProjectMember :project="project2showMember" />
    </el-dialog>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import Topbar from '@/components/system/Topbar.vue'
import ProjectMember from './ProjectMember.vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const searchContent = ref('')
const isShowCreateProject = ref(false)
const isShowEditProject = ref(false)
const isShowProjectMember = ref(false)
const project2showMember = ref(null)
const createProjectForm = ref({
  id: '',
  name: ''
})
const editProjectForm = ref({
  phone: '',
  name: '',
  hospital: ''
})
const projectTable = ref([])
const allProjectTable = ref([
  { name: '项目A', id: 'XM001', leader: 'Bob', description: 'balabala' },
  { name: '项目B', id: 'XM002', leader: 'Alex', description: 'balabala' }
])
const handleEdit = (index, row) => {
  editProjectForm.value.id = row.id
  editProjectForm.value.name = row.name
  editProjectForm.value.leader = row.leader
  editProjectForm.value.description = row.description
  isShowEditProject.value = true
}
const showMember = (index, row) => {
  isShowProjectMember.value = true
  project2showMember.value = row
}
const gotoProject = (index, row) => {
  router.push({ path: '/project', query: { projectId: row.id } })
}
const handleDeleteProject = (index, row) => {
  ElMessageBox.confirm(`确认删除项目 ${row.id} ${row.name} ？`, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {})
}
const submitCreateProject = () => {
  console.log(createProjectForm.value)
  isShowCreateProject.value = false
}
const submitEditProject = (index, row) => {
  isShowEditProject.value = false
  editProjectForm.value = row
}
const searchCurProjectTable = (newS) => {
  const s = newS.toLowerCase()
  if (s) {
    projectTable.value = allProjectTable.value.filter((u) =>
      `${u.name}${u.id}${u.leader}`.toLowerCase().includes(s)
    )
  } else {
    projectTable.value = allProjectTable.value
  }
}
watch(searchContent, searchCurProjectTable, { deep: true, immediate: true })
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
