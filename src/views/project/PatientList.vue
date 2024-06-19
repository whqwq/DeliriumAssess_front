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
    <el-table :data="patientList" class="patient-table">
      <el-table-column prop="patientIdInProject" label="受试者编号"></el-table-column>
      <el-table-column prop="alpha" label="姓名首字母"></el-table-column>
      <el-table-column prop="operateDate" label="手术日期" sortable></el-table-column>
      <el-table-column
        prop="hospitalIdInProject"
        label="医院编号"
        :filters="hospitalNoFilters"
        :filter-method="hospitalNoFilterHandler"
      ></el-table-column>
      <el-table-column prop="hospitalNameInProject" label="医院名"></el-table-column>
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
            v-model="addPatientForm.patientIdInProject"
            placeholder="请输入受试者的编号，三位数字"
            name="patientIdInProject"
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
import HTTPAPI from '@/utils/http/api.js'
import { debounce } from 'lodash'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps(['projectId'])
const projectId = props.projectId

const searchContent = ref('')
const addPatientVisible = ref(false)
const addPatientForm = ref({
  patientIdInProject: '',
  alpha: '',
  operateDate: ''
})
const patientList = ref([])
const allPatientList = ref([])
const hospitalNoList = computed(() =>
  allPatientList.value.reduce((pre, cur) => {
    if (!pre.includes(cur.hospitalIdInProject)) pre.push(cur.hospitalIdInProject)
    return pre
  }, [])
)
const hospitalNoFilters = computed(() => hospitalNoList.value.map((h) => ({ text: h, value: h })))
const hospitalNoFilterHandler = (value, row, column) => row.hospitalIdInProject === value
const gotoPatient = (index, row) => {
  router.push({ path: '/patient', query: { id: row.id } })
}
const handleDeletePatient = (index, row) => {
  ElMessageBox.confirm(`确认删除受试者 ${row.patientIdInProject}${row.alpha} ？`, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    HTTPAPI.deletePatient({ id: row.id }).then((res) => {
      if (res.status !== 0) return
      ElMessage.success('删除成功')
      getProjectPatients()
    })
  })
}
const submitAddPatient = () => {
  const form = addPatientForm.value
  console.log(form)
  if (!form.patientIdInProject || !form.alpha || !form.operateDate) return
  HTTPAPI.addPatient({ projectId, ...form }).then((res) => {
    if (res.status !== 0) return
    ElMessage.success('添加成功')
    getProjectPatients()
    addPatientVisible.value = false
    addPatientForm.value = { patientIdInProject: '', alpha: '', operateDate: '' }
  })
}
const searchCurPatientList = (newS) => {
  const s = newS?.toLowerCase()
  if (s) {
    patientList.value = allPatientList.value.filter((u) =>
      `${u.alpha}${u.patientIdInProject}${u.operateDate}${u.hospitalNameInProject}`.toLowerCase().includes(s)
    )
  } else {
    patientList.value = allPatientList.value
  }
}
watch(searchContent, debounce(searchCurPatientList, 500), { deep: true, immediate: true })
const getProjectPatients = () => {
  allPatientList.value = []
  HTTPAPI.getProjectPatients({ projectId }).then((res) => {
    if (res.status !== 0) return
    allPatientList.value = res.data.patients
    searchCurPatientList()
  })
}
onMounted(() => {
  getProjectPatients()
})
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
