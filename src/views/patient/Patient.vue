<template>
  <div class="patient-page">
    <Topbar />
    <div class="main">
      <el-descriptions title="患者信息" border :column="2">
        <el-descriptions-item label="患者编号">{{
          patient.id + ' ' + patient.alpha
        }}</el-descriptions-item>
        <el-descriptions-item label="所属项目">{{
          project.id + ' ' + project.name
        }}</el-descriptions-item>
      <el-descriptions-item label="所属医院">{{ patient.hospital }}</el-descriptions-item>
      <el-descriptions-item label="手术时间">{{ patient.operateTime }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="main">
      <div class="main-title">患者术后7天评估情况</div>
    </div>
    <div class="main">
      <div class="main-title">患者历史评估记录</div>
      <el-table :data="allRecordList">
        <el-table-column fixed prop="scale" label="评估量表"></el-table-column>
        <el-table-column fixed prop="time" label="评估时间" sortable></el-table-column>
        <el-table-column prop="assessor" label="评估者"></el-table-column>
        <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="gotoRecord(scope.$index, scope.row)"
          >
            查看
          </el-button>
        </template></el-table-column
      >
      </el-table>
    </div>
  </div>
</template>

<script setup>
import Topbar from '@/components/system/Topbar.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const project = ref({
  id: route.query.projectId,
  name: '项目A'
})
const patient = ref({
  id: route.query.patientId,
  alpha: 'W',
  hospital: '北医一院',
  operateTime: '2024-05-17'
})
const allRecordList = ref([
  {scale: '3D-CAM', time:'2024-05-18', assessor: '王医生'},
  {scale: '3D-CAM', time:'2024-05-12', assessor: 'A医生'},
  {scale: '3D-CAM', time:'2024-05-15', assessor: 'B医生'},
])
const gotoRecord = (index, row) => {}
</script>

<style scoped lang="less">
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
</style>
