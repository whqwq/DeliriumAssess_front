<template>
  <div class="hospitalPatient">
    <div class="header-line">
      <el-button type="primary" plain @click="isShowAddPatient = true">添加患者</el-button>
      <el-input
        v-model="searchContent"
        placeholder="搜索患者"
        :prefix-icon="Search"
        class="search-input"
      />
    </div>
    <el-table :data="patientTable" class="patient-table">
      <el-table-column prop="id" label="患者编号"></el-table-column>
      <el-table-column prop="alpha" label="姓名首字母"></el-table-column>
      <el-table-column prop="operateDate" label="手术日期" sortable></el-table-column>
      <el-table-column
        prop="hospital"
        label="所属医院"
        :filters="hospitalFilters"
        :filter-method="hospitalFilterHandler"
      ></el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button size="small" @click="gotoPatient(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDeletePatient(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="isShowAddPatient" title="添加患者" width="300">
      <el-form :model="addPatientForm" label-width="auto" label-position="left">
        <el-form-item label="姓名首字母">
          <el-input v-model="addPatientForm.name" placeholder="请输入患者姓名首字母" name="alpha" />
        </el-form-item>
        <el-form-item label="手术日期">
          <el-date-picker
            v-model="addPatientForm.operateDate"
            type="date"
            placeholder="请选择患者手术日期"
          />
        </el-form-item>
        <el-button type="primary" @click="submitAddPatient" style="width: 100%">创建</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps(['project', 'hospital'])
const project = props.project
// const hospital = props.hospital

const searchContent = ref('')
const isShowAddPatient = ref(false)
const addPatientForm = ref({
  alpha: '',
  operateDate: ''
})
const patientTable = ref([])
const allPatientTable = ref([
  { id: '001', alpha: 'W', operateDate: '2024-05-16', hospital: '北医一院' },
  { id: '002', alpha: 'L', operateDate: '2024-05-17', hospital: '北医三院' }
])
const hospitalList = computed(() =>
  allPatientTable.value.reduce((pre, cur) => {
    if (!pre.includes(cur.hospital)) pre.push(cur.hospital)
    return pre
  }, [])
)
const hospitalFilters = computed(() => hospitalList.value.map((h) => ({ text: h, value: h })))
const hospitalFilterHandler = (value, row, column) => row.hospital === value
const gotoPatient = (index, row) => {
  router.push({ path: '/patient', query: { patientId: row.id } })
}
const handleDeletePatient = (index, row) => {
  ElMessageBox.confirm(`确认删除患者 ${row.id}${row.alpha} ？`, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {})
}
const submitAddPatient = () => {
  isShowAddPatient.value = false
}
const searchCurPatientTable = (newS) => {
  const s = newS.toLowerCase()
  if (s) {
    patientTable.value = allPatientTable.value.filter((u) =>
      `${u.alpha}${u.id}${u.operateDate}${u.hospital}`.toLowerCase().includes(s)
    )
  } else {
    patientTable.value = allPatientTable.value
  }
}
watch(searchContent, searchCurPatientTable, { deep: true, immediate: true })
</script>

<style scoped lang="less">
.header-line {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  .search-input {
    width: 300px;
  }
}
</style>
