<template>
  <div class="patient-page">
    <Topbar />
    <div class="main">
      <el-descriptions title="受试者信息" border :column="2">
        <template #extra>
          <el-button type="primary" @click="chooseAssessVisible = true">进行谵妄评估</el-button>
        </template>
        <el-descriptions-item label="受试者编号">
          {{ `${patient.patientIdInProject} ${patient.alpha}` }}
        </el-descriptions-item>
        <el-descriptions-item label="所属项目">
          {{ `${project.projectId} ${project.projectName}` }}
        </el-descriptions-item>
        <el-descriptions-item label="所属医院">
          {{ `${patient.hospitalIdInProject} ${patient.hospitalNameInProject}` }}
        </el-descriptions-item>
        <el-descriptions-item label="手术日期">{{ patient.operateDate }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="main">
      <div class="main-title">术后{{ assessMatrixNum }}天评估完成情况</div>
      <div class="matrix" v-for="(matrix, mi) in assessMatrixs">
        <el-tag type="info">{{ mi ? '晚' : '早' }}</el-tag>
        <div v-for="u in matrix">
          <el-popover
            placement="top"
            width="auto"
            trigger="click"
            :content="`${u.date}${mi ? '晚' : '早'}间评估${u.flag > 0 ? '已完成' : '未完成'}`"
          >
            <template #reference>
              <div
                class="matrix-unit"
                :style="{
                  backgroundColor: u.flag > 0 ? 'limegreen' : u.flag < 0 ? 'lightgray' : 'red'
                }"
              >
                <el-icon><Select v-if="u.flag > 0" /><CloseBold v-else /></el-icon>
              </div>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-title">受试者历史评估记录</div>
      <el-table :data="assessmentList">
        <el-table-column prop="assessType" label="评估量表"></el-table-column>
        <el-table-column prop="assessTime" label="评估时间" sortable>
          <template #default="scope">
            {{ scope.row.assessTime }}
            <el-tag size="small" type="success">
              {{ `Day${scope.row.daysNum} ${scope.row.isAM ? '早' : '晚'}` }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="assessorName" label="评估者"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="gotoAssessment(scope.$index, scope.row)">
              查看
            </el-button>
          </template></el-table-column
        >
      </el-table>
    </div>
    <el-dialog v-model="chooseAssessVisible" title="选择评估方法" width="300">
      <el-radio-group v-model="assessType">
        <el-radio value="3D-CAM">3D-CAM</el-radio>
        <el-radio value="CAM-ICU" disabled>CAM-ICU</el-radio>
      </el-radio-group>
      <div>
        <el-button class="gotoStartAssess-btn" type="primary" @click="gotoStartAssess"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import HTTPAPI from '@/utils/http/api.js'
import moment from 'moment'
import Topbar from '@/components/system/Topbar.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const assessType = ref('3D-CAM')
const chooseAssessVisible = ref(false)
const project = ref({
  projectId: 'XM001',
  projectName: '项目A'
})
const patient = ref({})
const resetPatient = () => {
  patient.value = {
    id: route.query.patientId,
    patientIdInProject: '',
    alpha: '',
    hospitalNameInProject: '',
    hospitalIdInProject: '',
    operateDate: '',
    assessmentList: []
  }
}
resetPatient()
const assessmentList = computed(() => patient.value.assessmentList)
const assessMatrixNum = 7
const assessMatrixs = ref([])
const genAssessMatrix = () => {
  assessMatrixs.value = []
  const matrixAM = []
  const matrixPM = []
  const mmt_curDate = moment(new Date())
  const operateData = patient.value.operateDate
  // 初始化矩阵,未到日期的-1，已到日期的0
  for (let i = 1; i <= assessMatrixNum; i++) {
    const mmt_tmpDate = moment(operateData).add(i, 'd')
    matrixAM.push({
      date: mmt_tmpDate.format('YYYY-MM-DD'),
      flag: mmt_tmpDate <= mmt_curDate ? 0 : -1
    })
    matrixPM.push({
      date: mmt_tmpDate.format('YYYY-MM-DD'),
      flag: mmt_tmpDate <= mmt_curDate ? 0 : -1
    })
  }
  // 遍历评估，把矩阵里对应位置设置为完成状态1
  for (let i = 0; i < assessmentList.value.length; i++) {
    const a = assessmentList.value[i]
    if (a.daysNum > 0 && a.daysNum <= assessMatrixNum) {
      if (a.isAM) matrixAM[a.daysNum-1].flag = 1
      else matrixPM[a.daysNum-1].flag = 1
    }
  }
  assessMatrixs.value = [matrixAM, matrixPM]
}
const gotoStartAssess = () => {
  router.push({
    path: '/startAssess',
    query: { assessType: assessType.value, patientId: patient.value.id }
  })
}
const gotoAssessment = (index, row) => {
  router.push({ path: '/assessmentResult', query: { assessmentId: row.id } })
}
const getPatientDetails = () => {
  resetPatient()
  HTTPAPI.getPatientDetails({ id: route.query.id }).then((res) => {
    if (!res || res.status !== 0) return
    const data = { ...(res.data?.patient || {}), assessmentList: res.data?.assessments || [] }
    const { operateDate } = data
    const mmt_operateData = moment(operateDate)
    for (let i = 0; i < data.assessmentList.length; i++) {
      const a = data.assessmentList[i]
      const mmt_time = moment(a.assessTime)
      a.assessTime = mmt_time.format("YY-MM-DD HH:mm:ss")
      a.daysNum = mmt_time.diff(mmt_operateData, 'days')
      a.isAM = mmt_time.hour() <= 12
    }
    patient.value = data
    genAssessMatrix()
  })
}
onMounted(() => {
  getPatientDetails()
})
</script>

<style scoped lang="less">
@matrix-unit-size: 26px;
@matrix-unit-gap: 8px;
.patient-page {
  padding: 32px;
}
.main {
  margin-bottom: 32px;
  background-color: white;
  padding: 16px 32px;
  border-radius: 4px;
  .main-title {
    line-height: 1.5;
    margin: 8px 0;
    font-weight: bolder;
  }
}
.matrix {
  display: flex;
  align-items: center;
  & + .matrix {
    margin-top: @matrix-unit-gap;
  }
  .matrix-unit {
    margin-left: @matrix-unit-gap;
    width: @matrix-unit-size;
    height: @matrix-unit-size;
    border-radius: calc(@matrix-unit-size / 6);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
}
.gotoStartAssess-btn {
  width: 100%;
  margin-top: 16px;
}
</style>
