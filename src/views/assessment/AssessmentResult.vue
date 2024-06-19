<template>
  <div class="record-result">
    <Topbar />
    <div class="result-main">
      <el-descriptions title="评估记录" border :column="2">
        <template #extra>
          <el-button type="primary" @click="gotoRecordDetails(latestRecord.recordId)">查看详情</el-button>
        </template>
        <el-descriptions-item label="评估量表">{{ assessment.assessType }}</el-descriptions-item>
        <el-descriptions-item label="受试者">{{
          assessment.patientIdInProject + assessment.patientAlpha
        }}</el-descriptions-item>
        <el-descriptions-item label="评估时间">{{ assessment.assessTime }}</el-descriptions-item>
        <el-descriptions-item label="评估者">
          {{ `${assessment.assessorName} ${assessment.assessorPhone}` }}
        </el-descriptions-item>
        <template v-if="!latestRecord.isOriginal">
          <el-descriptions-item label="最近修改时间">{{
            latestRecord.recordTime
          }}</el-descriptions-item>
          <el-descriptions-item label="修改者">{{
            `${latestRecord.recorderName} ${latestRecord.recorderPhone}`
          }}</el-descriptions-item>
        </template>
      </el-descriptions>
    </div>
    <div class="result-main">
      <div class="result-main-title inner-center">谵妄评估：{{ assessResultSum }}</div>
      <div class="result-main-table-container">
        <el-table :data="assessResultList" border style="width: 100%">
          <el-table-column prop="positive" label="评估结果细则">
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
    <div class="result-btn">
      <el-button type="info" @click="historyVisible = true">查看历史版本</el-button>
    </div>

    <el-dialog v-model="historyVisible" title="评估记录历史版本" width="600">
      <el-table :data="recordList" style="width: 100%">
        <el-table-column label="修改时间" width="250">
          <template #default="scope">
            {{ scope.row.recordTime }}
            <el-tag v-if="scope.$index === 0">当前</el-tag>
            <el-tag type="info" v-if="scope.row.isOriginal">初始</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="recorderName" label="修改者"></el-table-column>
        <el-table-column prop="recorderPhone" label="电话"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="gotoRecordDetails(scope.row.recordId)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import moment from 'moment'
import HTTPAPI from '@/utils/http/api.js'
import { featureDescriptionMap, getFakeRecord } from './const.js'
import Topbar from '@/components/system/Topbar.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const assessment = ref({
  assessmentId: '',
  assessType: '',
  assessTime: '',
  patientId: '',
  patientIdInProject: '',
  patientAlpha: '',
  assessorPhone: '',
  assessorName: ''
})
const recordList = ref([])
const historyVisible = ref(false)
const latestRecord = computed(() => recordList.value[0] || {})
const assessResultSum = computed(() => {
  const lr = latestRecord.value
  return lr &&
    lr.feature1Positive &&
    lr.feature2Positive &&
    (lr.feature3Positive || lr.feature4Positive)
    ? '阳性'
    : '阴性'
})
const assessResultList = computed(() => {
  const lr = latestRecord.value
  return lr
    ? [
        { feature: 1, positive: lr.feature1Positive },
        { feature: 2, positive: lr.feature2Positive },
        { feature: 3, positive: lr.feature3Positive },
        { feature: 4, positive: lr.feature4Positive }
      ]
    : []
})
const gotoRecordDetails = (recordId) => {
  router.push({ path: '/recordDetails', query: { recordId } })
}
const getAssess = () => {
  assessment.value = {}
  recordList.value = []
  HTTPAPI.getAssess({ assessmentId: route.query.assessmentId }).then((res) => {
    if (!res || res.status !== 0) return
    const { data } = res
    assessment.value = data.assessment || {}
    assessment.value.assessTime = moment(assessment.value.assessTime).format('YYYY-MM-DD HH:mm:ss')
    recordList.value =
      data.records?.map((r) => ({
        ...r,
        recordTime: moment(r.recordTime).format('YYYY-MM-DD HH:mm:ss')
      })) || []
  })
}
onMounted(() => {
  getAssess()
})
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
    .result-main-title {
      font-size: 24px;
      font-weight: 500;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    .result-main-table-container {
      width: 100%;
    }
  }
  .result-btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
