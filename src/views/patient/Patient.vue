<template>
  <div class="patient-page">
    <Topbar />
    <div class="main">
      <el-descriptions title="患者信息" border :column="2">
        <template #extra>
          <el-button type="primary" @click="gotoAssess">进行谵妄评估</el-button>
        </template>
        <el-descriptions-item label="患者编号">{{
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
      <div class="main-title">患者历史评估记录</div>
      <el-table :data="allRecordList">
        <el-table-column prop="scale" label="评估量表"></el-table-column>
        <el-table-column prop="date" label="评估日期" sortable></el-table-column>
        <el-table-column prop="assessor" label="评估者"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button size="small" @click="gotoRecord(scope.$index, scope.row)"> 查看 </el-button>
          </template></el-table-column
        >
      </el-table>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import Topbar from '@/components/system/Topbar.vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

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
const allRecordList = ref([
  { id: '1', scale: '3D-CAM', date: '2024-05-15', assessor: '王医生' },
  { id: '2', scale: '3D-CAM', date: '2024-05-17', assessor: 'A医生' }
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
  for (const r of allRecordList.value) {
    matrixMap[r.date] = 1
  }
  const matrix = []
  for (var i = 1; i <= assessMatrixNum; i++) {
    const tmpDateString = moment(operateDateString).add(i, 'd').format('YYYY-MM-DD')
    matrix.push({ date: tmpDateString, flag: matrixMap[tmpDateString] })
  }
  return matrix
})
const gotoAssess = () => {
  router.push({ path: '/startAssess', query: { patientId: patient.value.id } })
}
const gotoRecord = (index, row) => {
  router.push({ path: '/recordResult', query: { recordId: row.id } })
}
</script>

<style scoped lang="less">
@matrix-unit-size: 20px;
.main {
  margin: 32px;
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
</style>
