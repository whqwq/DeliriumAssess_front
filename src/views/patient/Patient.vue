<template>
  <div class="patient-page">
    <Topbar />
    <div class="main">
      <el-descriptions title="受试者信息" border :column="2">
        <template #extra>
          <el-button type="primary" @click="isShowChooseAssess = true">进行谵妄评估</el-button>
        </template>
        <el-descriptions-item label="受试者编号">{{
          patient.idInProject + ' ' + patient.alpha
        }}</el-descriptions-item>
        <el-descriptions-item label="所属项目">{{
          project.id + ' ' + project.name
        }}</el-descriptions-item>
        <el-descriptions-item label="所属医院">{{ patient.hospital }}</el-descriptions-item>
        <el-descriptions-item label="手术日期">{{ patient.operateDate }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="main">
      <div class="main-title">术后{{ assessMatrixNum }}天评估完成情况</div>
      <div class="matrix">
        <div v-for="u in assessMatrix">
          <el-popover
            placement="top"
            width="auto"
            trigger="click"
            :content="`${u.date} ${u.flag > 0 ? '已完成' : '未完成'}评估`"
          >
            <template #reference>
              <div
                class="matrix-unit"
                :style="{
                  backgroundColor: u.flag < 0 ? 'lightgray' : u.flag > 0 ? 'limegreen' : 'red'
                }"
              ></div>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-title">受试者历史评估记录</div>
      <el-table :data="allAssessmentList">
        <el-table-column prop="scale" label="评估量表"></el-table-column>
        <el-table-column prop="time" label="评估时间" sortable>
          <template #default="scope">
            {{ scope.row.time }}
            <el-tag size="small" type="success">Day1早</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="assessor" label="评估者"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="gotoAssessment(scope.$index, scope.row)"> 查看 </el-button>
          </template></el-table-column
        >
      </el-table>
    </div>
    <el-dialog v-model="isShowChooseAssess" title="选择评估方法" width="300">
      <el-radio-group v-model="assessType">
        <el-radio value="3D-CAM">3D-CAM</el-radio>
        <el-radio value="CAM-ICU" disabled>CAM-ICU</el-radio>
      </el-radio-group>
      <div>
        <el-button class="gotoStartAssess-btn" type="primary" @click="gotoStartAssess">确定</el-button>
      </div>
      
    </el-dialog>
  </div>
</template>

<script setup>
import moment from 'moment'
import Topbar from '@/components/system/Topbar.vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const assessType = ref('3D-CAM')
const isShowChooseAssess = ref(false)
const project = ref({
  id: 'XM001',
  name: '项目A'
})
const patient = ref({
  id: route.query.patientId,
  idInProject: '001',
  alpha: 'W',
  hospital: '北医一院',
  operateDate: '2024-05-14'
})
const allAssessmentList = ref([
  { id: '1', scale: '3D-CAM', time: '2024-05-15 08:00', assessor: '王医生' },
  { id: '2', scale: '3D-CAM', time: '2024-05-17 17:32', assessor: 'A医生' }
])
const assessMatrixNum = 7
const assessMatrix = computed(() => {
  const curDate = moment(new Date())
  const operateDateString = patient.value.operateDate
  const matrixMap = {}
  for (var i = 1; i <= assessMatrixNum; i++) {
    const tmpDate = moment(operateDateString).add(i, 'd')
    const tmpDateString = tmpDate.format('YYYY-MM-DD')
    if (tmpDate <= curDate) matrixMap[tmpDateString] = 0
    else matrixMap[tmpDateString] = -1
  }
  for (const r of allAssessmentList.value) {
    matrixMap[r.date] = 1
  }
  const matrix = []
  for (var i = 1; i <= assessMatrixNum; i++) {
    const tmpDateString = moment(operateDateString).add(i, 'd').format('YYYY-MM-DD')
    matrix.push({ date: tmpDateString, flag: matrixMap[tmpDateString] })
  }
  return matrix
})
const gotoStartAssess = () => {
  router.push({
    path: '/startAssess',
    query: { assessType: assessType.value, patientId: patient.value.id }
  })
}
const gotoAssessment = (index, row) => {
  router.push({ path: '/assessmentResult', query: { assessmentId: row.id } })
}
</script>

<style scoped lang="less">
@matrix-unit-size: 20px;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, @matrix-unit-size);
  gap: 8px;
  .matrix-unit {
    width: @matrix-unit-size;
    height: @matrix-unit-size;
    cursor: pointer;
  }
}
.gotoStartAssess-btn {
  width: 100%;
  margin-top: 16px;
}
</style>
