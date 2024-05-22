<template>
  <div class="record-result">
    <Topbar />
    <div class="result-main">
      <el-descriptions title="评估记录" border :column="2">
        <template #extra>
          <el-button type="primary" @click="gotoRecordDetails">查看详情</el-button>
        </template>
        <el-descriptions-item label="评估量表">{{ record.assessType }}</el-descriptions-item>
        <el-descriptions-item label="评估时间">{{ record.recordTime }}</el-descriptions-item>
        <el-descriptions-item label="评估者">{{
          record.assessor.name + ' ' + record.assessor.phone
        }}</el-descriptions-item>
        <el-descriptions-item label="受试者">{{ record.patient.idInProejct }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="result-main">
      <div class="result-main-table-container">
        <el-table :data="record.assessResults" border style="width: 100%">
          <el-table-column prop="positive" label="评估结果">
            <template #default="scope">
              <el-tag type="danger" v-if="scope.row.positive">阳性</el-tag>
              <el-tag type="success" v-else>阴性</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="feature" label="特征编码">
            <template #default="scope"> 特征{{ scope.row.feature }} </template>
          </el-table-column>
          <el-table-column prop="description" label="解释">
            <template #default="scope">
              {{ featureDescriptionMap[scope.row.feature] }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { featureDescriptionMap } from './const.js'
import Topbar from '@/components/system/Topbar.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const recordId = route.query.recordId
const record = ref({
  patient: {
    id: 1,
    idInProejct: '001W',
    alpha: 'W'
  },
  assessor: {
    name: '王医生',
    phone: '15161656577'
  },
  recordTime: '2024-05-22 13:20',
  assessType: '3D-CAM',
  assessResults: [
    { feature: 1, positive: true },
    { feature: 2, positive: true },
    { feature: 3, positive: false },
    { feature: 4, positive: true }
  ]
})
const gotoRecordDetails = () => {
  router.push({ path: '/recordDetails', query: { recordId } })
}
</script>

<style scoped lang="less">
.inner-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.record-result {
  padding: 32px;
  width: 100%;
  height: 100%;
  .result-main {
    padding: 16px 32px;
    margin-bottom: 32px;
    background-color: white;
    border-radius: 4px;
    .result-main-tabel-container {
      width: 100%;
    }
  }
}
</style>
