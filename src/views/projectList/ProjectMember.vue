<template>
  <div class="projectMember-container">
    <!-- <div class="projectTitle">
      <span>{{ project.projectId }}</span
      ><span style="margin-left: 24px">{{ project.projectName }}</span>
    </div> -->
    <div class="header-line">
      <el-button v-if="isUserLeader" type="primary" plain @click="addMemberVisible = true">添加成员</el-button>
      <el-input
        v-model="searchContent"
        placeholder="搜索组内成员"
        :prefix-icon="Search"
        class="search-input"
      />
    </div>
    <el-table :data="memberList" class="projectMember-table">
      <el-table-column label="姓名">
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
          <el-tag class="memberNameTag" v-if="scope.row.isLeader" type="success">组长</el-tag>
          <el-tag class="memberNameTag" v-else>成员</el-tag>
          <el-tag class="memberNameTag" v-if="scope.row.phone === userPhone" type="info">我</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="hospitalNameInProject" label="医院"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDeleteMember(scope.$index, scope.row)"
            v-if="!scope.row.isLeader && scope.row.phone !== userPhone && isUserLeader"
          >
            移除
          </el-button>
        </template></el-table-column
      >
    </el-table>
    <el-dialog v-model="addMemberVisible" title="添加成员" width="350">
      <el-form :model="addMemberForm" label-width="auto" label-position="left">
        <el-form-item label="手机号">
          <el-input
            v-model="addMemberForm.phone"
            placeholder="请输入被添加者的手机号"
            name="phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="医院名称">
          <el-input
            v-model="addMemberForm.hospitalNameInProject"
            placeholder="请输入被添加者的医院名称"
            name="hospitalNameInProject"
          ></el-input>
        </el-form-item>
        <el-form-item label="医院编号">
          <el-input
            v-model="addMemberForm.hospitalIdInProject"
            placeholder="请输入该医院在项目内的编号"
            name="hospitalIdInProject"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitAddMember" style="width: 100%">添加</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import Cookie from '@/utils/cookie.js'
import HTTPAPI from '@/utils/http/api.js'
import { debounce } from 'lodash'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, watch, computed, onMounted } from 'vue'
const userPhone = Cookie.getCookie('phone')
const props = defineProps(['project'])
const project = props.project

const addMemberVisible = ref(false)
const addMemberForm = ref({
  phone: '',
  hospitalNameInProject: '',
  hospitalIdInProject: ''
})
const searchContent = ref('')
const memberList = ref([])
const allMemberList = ref([])
const isUserLeader = computed(() => {
  return allMemberList.value.some((m) => m.phone === userPhone && m.isLeader)
})
const searchCurMemberList = (newS) => {
  const s = newS?.toLowerCase()
  if (s) {
    memberList.value = allMemberList.value.filter((m) =>
      `${m.name}${m.phone}${m.hospitalNameInProject}`.toLowerCase().includes(s)
    )
  } else {
    memberList.value = allMemberList.value
  }
}
const submitAddMember = () => {
  const form = addMemberForm.value
  if (!form.phone || !form.hospitalIdInProject || !form.hospitalNameInProject) return
  HTTPAPI.addProjectMember({
    projectId: project.projectId,
    phone: form.phone,
    hospitalIdInProject: form.hospitalIdInProject,
    hospitalNameInProject: form.hospitalNameInProject
  }).then((res) => {
    if (res.status !== 0) return
    ElMessage.success('添加成功')
    addMemberVisible.value = false
    getAllMemberList()
  })
}
const handleDeleteMember = (index, row) => {
  ElMessageBox.confirm(`确认移除成员 ${row.name} ${row.phone} ？`, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    HTTPAPI.deleteProjectMember({ projectId: project.projectId, doctorId: row.id }).then((res) => {
      if (res.status !== 0) return
      ElMessage.success('移除成功')
      getAllMemberList()
    })
  })
}
watch(searchContent, debounce(searchCurMemberList, 500), { deep: true, immediate: true })
const getAllMemberList = () => {
  HTTPAPI.getProjectMembers({ projectId: project.projectId }).then((res) => {
    allMemberList.value = res.data.members
    searchCurMemberList()
  })
}
onMounted(() => {
  getAllMemberList()
})
</script>

<style scoped lang="less">
.projectTitle {
  display: flex;
  justify-content: center;
  font-size: 26px;
  margin: 12px 0;
  line-height: 1.5;
}

.header-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  .search-input {
    width: 250px;
  }
}
.memberNameTag {
  margin-left: 4px;
}
</style>
