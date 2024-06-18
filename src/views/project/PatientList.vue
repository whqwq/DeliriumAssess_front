<template>
  <div class="hospitalPatient">
    <div class="header-line">
      <el-button type="primary" plain @click="addPatientVisible = true">添加受试者</el-button>
      <el-input
        v-model="searchContent"
        placeholder="搜索受试者"
        :prefix-icon="Search"
        class="search-input"
      />
    </div>
    <el-table :data="patientTable" class="patient-table">
      <el-table-column prop="id" label="受试者编号"></el-table-column>
      <el-table-column prop="alpha" label="姓名首字母"></el-table-column>
      <el-table-column prop="operateDate" label="手术日期" sortable></el-table-column>
      <el-table-column
        prop="hospitalNo"
        label="医院编号"
        :filters="hospitalNoFilters"
        :filter-method="hospitalNoFilterHandler"
      ></el-table-column>
      <el-table-column prop="hospital" label="医院名"></el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button size="small" @click="gotoPatient(scope.$index, scope.row)">进入评估</el-button>
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
    <el-dialog v-model="addPatientVisible" title="添加受试者" width="400">
      <el-form :model="addPatientForm" label-width="auto" label-position="left">
        <el-form-item label="受试者编号">
          <el-input
            v-model="addPatientForm.id"
            placeholder="请输入受试者的编号，三位数字"
            name="id"
          />
        </el-form-item>
        <el-form-item label="姓名首字母">
          <el-input
            v-model="addPatientForm.alpha"
            placeholder="请输入受试者姓名首字母"
            name="alpha"
          />
        </el-form-item>
        <el-form-item label="手术日期">
          <el-date-picker
            v-model="addPatientForm.operateDate"
            type="date"
            placeholder="请选择受试者手术日期"
          />
        </el-form-item>
        <el-button type="primary" @click="submitAddPatient" style="width: 100%">创建</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { debounce } from 'lodash'
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps(['project', 'hospital'])
const project = props.project
// const hospital = props.hospital

const searchContent = ref('')
const addPatientVisible = ref(false)
const addPatientForm = ref({
  id: '',
  alpha: '',
  operateDate: ''
})
const patientTable = ref([])
const allPatientTable = ref([
  { id: '001', alpha: 'W', operateDate: '2024-05-16', hospital: '北医一院', hospitalNo: '01' },
  { id: '002', alpha: 'L', operateDate: '2024-05-17', hospital: '北医三院', hospitalNo: '02' }
])
const hospitalNoList = computed(() =>
  allPatientTable.value.reduce((pre, cur) => {
    if (!pre.includes(cur.hospitalNo)) pre.push(cur.hospitalNo)
    return pre
  }, [])
)
const hospitalNoFilters = computed(() => hospitalNoList.value.map((h) => ({ text: h, value: h })))
const hospitalNoFilterHandler = (value, row, column) => row.hospitalNo === value
const gotoPatient = (index, row) => {
  router.push({ path: '/patient', query: { patientId: row.id } })
}
const handleDeletePatient = (index, row) => {
  ElMessageBox.confirm(`确认删除受试者 ${row.id}${row.alpha} ？`, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {})
}
const submitAddPatient = () => {
  const form = addPatientForm.value
  console.log(form)
  if (!form.id || !form.alpha || !form.operateDate) return
  addPatientVisible.value = false
  addPatientForm.value = { id: '', alpha: '', operateDate: '' }
}
const searchCurPatientTable = (newS) => {
  const s = newS?.toLowerCase()
  if (s) {
    patientTable.value = allPatientTable.value.filter((u) =>
      `${u.alpha}${u.id}${u.operateDate}${u.hospital}`.toLowerCase().includes(s)
    )
  } else {
    patientTable.value = allPatientTable.value
  }
}
watch(searchContent, debounce(searchCurPatientTable, 500), { deep: true, immediate: true })
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
