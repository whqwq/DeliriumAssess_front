<template>
  <div class="admin-page">
    <Topbar />
    <div class="admin-main">
      <div class="header-line">
        <el-button type="primary" plain @click="isShowAddUser = true">新增用户</el-button>
        <el-input
          v-model="searchContent"
          placeholder="搜索用户"
          :prefix-icon="Search"
          class="search-input"
        />
      </div>
      <el-table :data="userTable" class="admin-table">
        <el-table-column fixed prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="hospital" label="医院"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >修改信息</el-button
            >
            <el-button size="small" @click="handleResetPwd(scope.$index, scope.row)"
              >重置密码</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDeleteUser(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="isShowAddUser" title="新增用户" width="400">
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
        <el-button type="primary" @click="submitAddUser" style="width: 100%">提交</el-button>
      </el-form>
    </el-dialog>
    <el-dialog v-model="isShowEditUser" title="修改用户信息" width="400">
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
        <el-button type="primary" @click="submitAddUser" style="width: 100%">提交修改</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import Topbar from '@/components/system/Topbar.vue'
import { ref, watch } from 'vue'
const searchContent = ref('')
const isShowAddUser = ref(false)
const isShowEditUser = ref(false)
const addUserForm = ref({
  phone: '',
  name: '',
  hospital: ''
})
const editUserForm = ref({
  phone: '',
  name: '',
  hospital: ''
})
const userTable = ref([])
const allUserTable = ref([
  { name: 'a', phone: '111', hospital: 'abc' },
  { name: 'b', phone: '112', hospital: 'abc' }
])
const handleEdit = (index, row) => {
  editUserForm.value = row
  isShowEditUser.value = true
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
  console.log(addUserForm.value)
  isShowAddUser.value = false
}
const submitEditUser = () => {
  isShowEditUser.value = false
}
const searchCurUserTable = (newS) => {
  const s = newS.toLowerCase()
  if (s) {
    userTable.value = allUserTable.value.filter((u) =>
      `${u.name}${u.phone}${u.hospital}`.toLowerCase().includes(s)
    )
  } else {
    userTable.value = allUserTable.value
  }
}
watch(searchContent, searchCurUserTable, { deep: true, immediate: true })
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
