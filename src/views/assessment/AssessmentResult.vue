<template>
  <div class="record-result">
    <Topbar />
    <div class="result-main">
      <el-descriptions title="评估记录" border :column="2">
        <template #extra>
          <el-button type="primary" @click="gotoRecordDetails(record.recordId)">查看详情</el-button>
        </template>
        <el-descriptions-item label="评估量表">{{ record.assessType }}</el-descriptions-item>
        <el-descriptions-item label="受试者">{{ record.patient.idInProejct }}</el-descriptions-item>
        <el-descriptions-item label="评估时间">{{ record.assessTime }}</el-descriptions-item>
        <el-descriptions-item label="评估者">
          {{ `${record.assessor.name} ${record.assessor.phone}` }}
        </el-descriptions-item>
        <template v-if="record.editTime">
          <el-descriptions-item label="最近修改时间">{{ record.editTime }}</el-descriptions-item>
          <el-descriptions-item label="修改者">{{
            `${record.editor.name} ${record.editor.phone}`
          }}</el-descriptions-item>
        </template>
      </el-descriptions>
    </div>
    <div class="result-main">
      <div class="result-main-table-container">
        <el-table :data="record.assessResults" border style="width: 100%">
          <el-table-column prop="positive" label="当前评估结果">
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
      <el-table :data="recordHistory" style="width: 100%">
        <el-table-column prop="time" label="修改时间" width="250">
          <template #default="scope">
            {{ scope.row.time }}
            <el-tag v-if="scope.row.status === 1">当前</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === -1">初始</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="editorName" label="修改者"></el-table-column>
        <el-table-column prop="editorPhone" label="电话"></el-table-column>
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
import { featureDescriptionMap, getFakeRecord } from './const.js'
import Topbar from '@/components/system/Topbar.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const assessmentId = route.query.assessmentId

const historyVisible = ref(false)
const record = ref(getFakeRecord())
const recordHistory = ref([
  {
    time: '2024-05-22 11:39',
    editorName: '李医生',
    editorPhone: '19768970',
    recordId: 2,
    status: 1
  },
  {
    time: '2024-05-22 11:39',
    editorName: '李医生',
    editorPhone: '19768970',
    recordId: 3,
    status: 0
  },
  {
    time: '2024-05-22 11:39',
    editorName: '李医生',
    editorPhone: '19768970',
    recordId: 1,
    status: -1
  }
])
const gotoRecordDetails = (recordId) => {
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
  .result-btn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
