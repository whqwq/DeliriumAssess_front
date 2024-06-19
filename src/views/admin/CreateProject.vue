<template>
  <div class="admin-create-project">
    <el-form :model="createProjectForm" label-position="left" label-width="auto">
      <el-form-item label="项目编号">
        <el-input
          v-model="createProjectForm.projectId"
          placeholder="请输入项目编号"
          name="projectId"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item label="项目完整名称">
        <el-input
          v-model="createProjectForm.projectName"
          placeholder="请输入项目的完整名称"
          name="projectName"
          tabindex="2"
        />
      </el-form-item>
      <el-form-item label="项目简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3 }"
          v-model="createProjectForm.description"
          placeholder="【非必须】请输入项目内容简介"
          name="description"
          tabindex="3"
        />
      </el-form-item>
      <el-form-item label="项目组长">
        <div class="form-tags">
          <el-tag
            class="tag"
            v-for="(leader, li) in createProjectForm.leaders"
            closable
            @close="handleDeleteLeaderInCreateProject(li)"
          >
            {{ `${leader.name}${leader.phone}(${leader.hospitalIdInProject})` }}
          </el-tag>
          <el-button class="tag" size="small" @click="addLeaderVisible = true">
            + 添加组长
          </el-button>
        </div>
      </el-form-item>
      <el-button type="primary" @click="submitCreateProject" style="width: 100%">创建</el-button>
    </el-form>
    <el-dialog v-model="addLeaderVisible" title="添加项目组长" width="450">
      <el-form :model="addLeaderForm" label-position="left" label-width="auto">
        <el-form-item label="组长">
          <el-autocomplete
            v-if="searchLeaderPhoneVisible"
            v-model="addLeaderForm.phone"
            :fetch-suggestions="leaderSearch"
            :trigger-on-focus="false"
            placeholder="请输入项目组长的手机号"
            @select="handleSelectLeader"
          >
            <template #default="{ item }">
              {{ `${item.phone} ${item.name} ${item.hospitalName}` }}
            </template>
          </el-autocomplete>
          <el-tag v-else closable @close="cancelTmpLeader">{{
            `${addLeaderForm.name} ${addLeaderForm.phone}`
          }}</el-tag>
        </el-form-item>
        <el-form-item label="医院名称">
          <el-input
            v-model="addLeaderForm.hospitalNameInProject"
            placeholder="请输入该组长所属医院（中心）名称"
            name="hospitalIdInProject"
          />
        </el-form-item>
        <el-form-item label="医院编号">
          <el-input
            v-model="addLeaderForm.hospitalIdInProject"
            placeholder="请输入项目内该医院（中心）的编号，二位数字"
            name="hospitalIdInProject"
          />
        </el-form-item>
        <el-button type="primary" @click="addLeaderIntoCreateProject" style="width: 100%"
          >创建</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import HTTPAPI from '@/utils/http/api.js'
import { ElMessage } from 'element-plus';
import { ref, watch, computed, onMounted } from 'vue'
const emit = defineEmits(['submitCreateClose'])
const allUserList = ref([])
const createProjectForm = ref({})
const addLeaderForm = ref({})
const addLeaderVisible = ref(false)
const searchLeaderPhoneVisible = ref(true)
const resetForm = (formName) => {
  switch (formName) {
    case 'createProjectForm':
      createProjectForm.value = { projectId: '', projectName: '', description: '', leaders: [] }
      break
    case 'addLeaderForm':
      addLeaderForm.value = { phone: '', name: '', hospitalNameInProject: '', hospitalIdInProject: '' }
      break
    default:
      resetForm('createProjectForm')
      resetForm('addLeaderForm')
      break
  }
}
resetForm()
const addLeaderIntoCreateProject = () => {
  let existed = false
  const tmpleader = addLeaderForm.value
  if (!tmpleader.phone || !tmpleader.hospitalIdInProject || !tmpleader.hospitalNameInProject) return
  const targetUser = allUserList.value.find((u) => u.phone === tmpleader.phone)
  if (!targetUser) {
    ElMessage.error('该手机号用户不存在，请先添加用户')
    return
  }
  tmpleader.id = targetUser.id
  const existedLeaders = createProjectForm.value.leaders
  for (let i = 0; i < existedLeaders.length; i++) {
    const el = existedLeaders[i]
    if (el.phone === tmpleader.phone) {
      existed = true
      existedLeaders.splice(i, 1, tmpleader)
      break
    }
  }
  if (!existed) existedLeaders.push(tmpleader)
  addLeaderVisible.value = false
  searchLeaderPhoneVisible.value = true
  resetForm('addLeaderForm')
}
const leaderSearch = (str, cb) => {
  const res = str ? allUserList.value.filter((u) => u.phone.includes(str)) : allUserList.value
  cb(res)
}
const handleSelectLeader = (leader) => {
  addLeaderForm.value.phone = leader.phone
  addLeaderForm.value.hospitalNameInProject = leader.hospitalName
  addLeaderForm.value.name = leader.name
  searchLeaderPhoneVisible.value = false
}
const cancelTmpLeader = () => {
  searchLeaderPhoneVisible.value = true
  resetForm('addLeaderForm')
}
const handleDeleteLeaderInCreateProject = (li) => {
  createProjectForm.value.leaders.splice(li, 1)
}
const submitCreateProject = () => {
  const form = createProjectForm.value
  if (!form.projectId || !form.projectName || !form.leaders || !form.leaders.length) return
  HTTPAPI.createProject(form).then((res) => {
    if (!res || res.status !== 0) return
    emit('submitCreateClose')
    resetForm('createProject')
  })
}

const getAllUsers = () => {
  allUserList.value = []
  HTTPAPI.getAllUsers().then((res) => {
    if (!res || res.status !== 0) return
    const data = res.data
    allUserList.value = data.users
  })
}
onMounted(() => {
  getAllUsers()
})
</script>

<style scoped lang="less">
.form-tags {
  .tag {
    margin-left: 4px;
  }
}
</style>
