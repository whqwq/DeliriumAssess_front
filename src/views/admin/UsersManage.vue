<template>
  <div class="admin-users">
    <div class="header-line">
      <div>
        <el-button type="primary" @click="addUserVisible = true">新增用户</el-button>
      </div>
      <el-input
        v-model="searchUserText"
        placeholder="搜索用户"
        :prefix-icon="Search"
        class="search-input"
      />
    </div>
    <el-table :data="curUserList" class="admin-table">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="hospitalName" label="医院"></el-table-column>
      <el-table-column prop="createDate" label="创建日期"></el-table-column>
      <el-table-column label="操作" width="240">
        <template #default="scope">
          <el-button size="small" @click="handleEditUser(scope.$index, scope.row)"
            >修改信息</el-button
          >
          <el-button size="small" @click="handleResetPwd(scope.$index, scope.row)"
            >重置密码</el-button
          >
          <el-button size="small" type="danger" @click="handleDeleteUser(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="addUserVisible" title="新增用户" width="400">
    <el-form :model="addUserForm" label-width="auto" label-position="left">
      <el-form-item label="手机号">
        <el-input
          v-model="addUserForm.phone"
          placeholder="请输入手机号"
          name="phone"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="addUserForm.name" placeholder="请输入姓名" name="name" tabindex="2" />
      </el-form-item>
      <el-form-item label="医院">
        <el-input
          v-model="addUserForm.hospital"
          placeholder="请输入所属医院名称"
          name="hospital"
          tabindex="3"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2 }"
          v-model="addUserForm.remark"
          placeholder="【非必须】输入对该用户的备注"
          name="remark"
          tabindex="4"
        />
      </el-form-item>
      <el-button type="primary" @click="submitAddUser" style="width: 100%">提交</el-button>
    </el-form>
  </el-dialog>
  <el-dialog v-model="editUserVisible" title="修改用户信息" width="400">
    <el-form :model="editUserForm" label-width="auto" label-position="left">
      <el-form-item label="手机号">
        <el-input
          v-model="editUserForm.phone"
          placeholder="请输入手机号"
          name="phone"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="editUserForm.name" placeholder="请输入姓名" name="name" tabindex="2" />
      </el-form-item>
      <el-form-item label="医院">
        <el-input
          v-model="editUserForm.hospital"
          placeholder="请输入医院名称"
          name="hospital"
          tabindex="3"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2 }"
          v-model="editUserForm.remark"
          placeholder="【非必须】输入对该用户的备注"
          name="remark"
          tabindex="4"
        />
      </el-form-item>
      <el-button type="primary" @click="submitEditUser" style="width: 100%">提交修改</el-button>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { debounce } from 'lodash'
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { ref, watch, computed } from 'vue'
const props = defineProps(['userList'])
const searchUserText = ref('')
const addUserVisible = ref(false)
const addUserForm = ref({})
const editUserVisible = ref(false)
const editUserForm = ref({})
const curUserList = ref([])
const allUserList = computed(() => props.userList)
const resetForm = (formName) => {
  switch (formName) {
    case 'addUserForm':
      addUserForm.value = { phone: '', name: '', hospital: '', remark: '' }
      break
    case 'editUserForm':
      editUserForm.value = { phone: '', name: '', hospital: '', remark: '' }
      break
    default:
      resetForm('addUserForm')
      resetForm('editUserForm')
      break
  }
}
resetForm()
const handleEditUser = (index, row) => {
  editUserForm.value.phone = row.phone
  editUserForm.value.name = row.name
  editUserForm.value.hospital = row.hospital
  editUserForm.value.remark = row.remark
  editUserVisible.value = true
}
const handleResetPwd = (index, row) => {
  ElMessageBox.confirm(
    `确认重置用户 ${row.name}（${row.phone}，${row.hospital}）的密码？`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {})
}
const handleDeleteUser = (index, row) => {
  ElMessageBox.confirm(`确认删除用户 ${row.name}（${row.phone}，${row.hospital}）？`, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {})
}
const submitAddUser = () => {
  const form = addUserForm.value
  if (!form.name || !form.phone || !form.hospital) return
  console.log(addUserForm.value)
  addUserVisible.value = false
  resetForm('addUserForm')
}
const submitEditUser = () => {
  const form = editUserForm.value
  if (!form.name || !form.phone || !form.hospital) return
  editUserVisible.value = false
  resetForm('editUserForm')
}
const searchCurUserList = (newS) => {
  const s = newS.toLowerCase()
  if (s) {
    curUserList.value = allUserList.value.filter((u) =>
      `${u.name}${u.phone}${u.hospital}`.toLowerCase().includes(s)
    )
  } else {
    curUserList.value = allUserList.value
  }
}
watch(searchUserText, debounce(searchCurUserList, 500), { deep: true, immediate: true })
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
