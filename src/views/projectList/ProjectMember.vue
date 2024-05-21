<template>
  <div class="projectMember-container">
    <div class="projectTitle">
      <span>{{ project.id }}</span
      ><span style="margin-left: 24px">{{ project.name }}</span>
    </div>
    <div class="header-line">
      <el-button type="primary" plain @click="isShowAddMember = true">添加成员</el-button>
      <el-input
        v-model="searchContent"
        placeholder="搜索组内成员"
        :prefix-icon="Search"
        class="search-input"
      />
    </div>
    <el-table :data="memberTable" class="projectMember-table">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="hospital" label="医院"></el-table-column>
      <el-table-column prop="status" label="权限"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDeleteMember(scope.$index, scope.row)"
            v-if="scope.row.status !== '组长'"
          >
            移除
          </el-button>
        </template></el-table-column
      >
    </el-table>
    <el-dialog v-model="isShowAddMember" title="添加成员" width="300">
      <el-form :model="addMemberForm" label-width="auto" label-position="left">
        <el-form-item title="手机号">
          <el-input
            v-model="addMemberForm.phone"
            placeholder="请输入被添加者的手机号"
            name="phone"
            tabindex="1"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitAddMember" style="width: 100%">添加</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { ref, watch, computed } from 'vue'
const props = defineProps(['project'])
const project = props.project

const isShowAddMember = ref(false)
const addMemberForm = ref({
  phone: ''
})
const searchContent = ref('')
const memberTable = ref([])
const allMemberTabel = ref([
  { name: 'Alex', phone: '151', hospital: 'Yi', status: '组长' },
  { name: 'Caroel', phone: '122', hospital: 'Yi2', status: '组员' }
])
const searchCurMemberTable = (newS) => {
  const s = newS.toLowerCase()
  if (s) {
    memberTable.value = allMemberTabel.value.filter((m) =>
      `${m.name}${m.phone}${m.hospital}`.toLowerCase().includes(s)
    )
  } else {
    memberTable.value = allMemberTabel.value
  }
}
const submitAddMember = () => {
  isShowAddMember.value = false
}
const handleDeleteMember = (index, row) => {
  ElMessageBox.confirm(`确认移除成员 ${row.name} ${row.phone} ？`, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {})
}
watch(searchContent, searchCurMemberTable, { deep: true, immediate: true })
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
</style>
