<template>
  <div class="startAssess">
    <Topbar />
    <div class="start-main">
      <div class="startAssess-header">
        <div class="inner-center assess-type">{{ assessType }}谵妄评估</div>
        <div class="inner-center assess-target">适用于{{ assessTarget }}</div>
        <div class="inner-center assess-people">
          <div>
            <div>评估者：{{ 'username' }}</div>
            <div>受试者：{{ patient.idInProject + patient.alpha }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="start-main">
      <div class="main-title">请阅读并勾选以下每一条注意事项：</div>
      <div class="startAssess-checkList">
        <el-checkbox @change="changeAllCheck">
          <span style="font-weight: bold;">全选</span>
        </el-checkbox>
        <el-checkbox-group v-model="assessTipsChecks">
          <div v-for="(t, idx) in assessTips">
            <el-checkbox :label="t" :value="idx" />
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="assess-btn-container" v-if="isShowBtn">
      <el-button class="assess-btn" type="primary" size="large" @click="gotoAssess"
        >开始评估</el-button
      >
    </div>
  </div>
</template>

<script setup>
import Topbar from '@/components/system/Topbar.vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const patient = ref({
  id: route.query.patientId,
  idInProject: '001',
  alpha: 'W'
})
const assessType = ref(route.query.assessType)
const assessTarget = computed(() => (assessType === '3D-CAM' ? '机械通气受试者' : '非机械通气受试者'))
const assessTips = ref([
  '3D-CAM量表分为受试者访视和评估者观察两部分。',
  '每个问题仅可重复1次，请记录每个答案，并在相应的选项上进行标记。',
  '点击题目，系统会提示该题的正确答案',
  '每个问题都需要完成，不要跳过进行。',
  '每组问题可以随时进行暂存；但最终提交时不得有空题。',
  '对受试者多加鼓励，不可批评。'
])
const assessTipsChecks = ref([])
const isShowBtn = computed(() => assessTips.value.length === assessTipsChecks.value.length)
const changeAllCheck = (val) => {
  const len = assessTips.value.length
  if (val) {
    assessTipsChecks.value = []
    for (let i = 0; i < len; i++) assessTipsChecks.value.push(i)
    return
  }
  assessTipsChecks.value = []
}
const gotoAssess = () => {
  router.push({
    path: '/assess',
    query: { assessType: assessType.value, patientId: patient.value.id }
  })
}
</script>

<style scoped lang="less">
.startAssess {
  margin: 0;
  padding: 32px;
  width: 100%;
  height: 100%;
}
.startAssess-header {
  width: 100%;
  height: 100%;
  line-height: 1.5;
  .assess-type {
    font-size: 24px;
    font-weight: bolder;
  }
  .assess-target {
    color: #666;
    font-size: 14px;
  }
  .assess-people {
    margin-top: 12px;
  }
}
.startAssess-checkList {
  max-width: 100%;
  :deep(.el-checkbox) {
    white-space: unset;
    // .el-checkbox__label {
    //   line-height: 1.5;
    // }
  }
}
.assess-btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
  .assess-btn {
    width: 300px;
    max-width: 100%;
  }
}

.start-main {
  padding: 16px 32px;
  margin-bottom: 32px;
  background-color: white;
  border-radius: 4px;
  .main-title {
    line-height: 1.5;
    margin: 8px 0;
    font-weight: bolder;
  }
}
.inner-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
