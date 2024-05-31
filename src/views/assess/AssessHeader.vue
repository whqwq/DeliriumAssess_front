<template>
  <div class="assess-header-container">
    <div class="assess-header">
      <el-icon @click="goBack" style="cursor: pointer"><Back /></el-icon>
      <el-divider direction="vertical" />
      <div v-if="steps && steps.length" class="assess-header-steps-container">
        <template v-for="(s, i) in steps">
          <el-icon v-if="i"><ArrowRight /></el-icon>
          <div
            :class="['assess-step', { 'assess-step-finished': s.finished }]"
            @click="turnPage(i)"
          >
            <el-icon v-if="s.finished"><Checked /></el-icon>
            <el-icon v-else><List /></el-icon>
            <span :class="['assess-step-text', { 'assess-step-selected': i === curPageIndex }]">
              {{ s.text }}
            </span>
          </div>
        </template>
      </div>
      <el-icon style="cursor: pointer" @click="pageTipsVisible = true"><QuestionFilled /></el-icon>
      <!-- <el-button class="submit-btn" plain @click="trySubmit">提交量表</el-button> -->
    </div>
  </div>
  <el-dialog v-model="pageTipsVisible" title="3D-CAM指导手册" style="width: 90%; margin: 32px auto">
    <el-tabs :stretch="true" type="border-card" v-model="curTabIndex">
      <el-tab-pane v-for="(pageG, i) in templateGuides" :label="pageG.instruction" :name="i">
        <div class="page-guide-container">
          <div v-for="guide in pageG.guides">
            <div class="guide-question">{{ guide.question }}</div>
            <div class="guide-tip" v-for="tip in guide.tips">
              <span class="guide-tip-dot">· </span>{{ tip }}
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评估技巧" :name="templateGuides.length">
        <div class="page-guide-container">
          <div class="guide-tip" v-for="trick in templateTricks">{{ trick }}</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup>
import { getTemplateAssessGuides, getTemplateAssessTricks } from './3DCAM/const'
import { defineModel, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['steps']) //  steps: [{text:'stepA', finished:true}]
const emit = defineEmits(['trySubmit'])
const curPageIndex = defineModel()
const pageTipsVisible = ref(false)
const curTabIndex = ref(0)
const templateGuides = getTemplateAssessGuides()
const templateTricks = getTemplateAssessTricks()
const goBack = () => {
  router.go(-1)
}
const turnPage = (i) => {
  curPageIndex.value = i
}
// const trySubmit = () => emit('trySubmit')
const handleCurTabIndex = (pageIndex) => {
  curTabIndex.value = pageIndex
}
watch(curPageIndex, handleCurTabIndex, { immediate: true })
</script>

<style scoped lang="less">
.assess-header-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: var(--topbar-height);
}
.assess-header {
  width: 100vw;
  height: var(--topbar-height);
  background: linear-gradient(135deg, #404c70 0%, #1e253d 100%);
  font-size: calc(var(--topbar-height) / 2);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 8px;
  .assess-header-steps-container {
    width: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    .assess-step {
      margin: 0 16px;
      font-size: 16px;
      display: flex;
      align-items: center;
      color: #c6e2ff;
      cursor: pointer;
      .assess-step-text {
        margin-left: 8px;
      }
    }
    .assess-step-finished {
      color: #67c23a;
    }
    .assess-step-selected {
      color: white;
      font-size: 18px;
      font-weight: 500;
    }
  }
  .submit-btn {
    float: right;
  }
}
:deep(.el-dialog) {
  width: 90% !important;
  height: 90vh;
  overflow: auto;
}
.page-guide-container {
  height: 70vh;
  overflow: scroll;
  line-height: 32px;
  font-size: 16px;
  .guide-question {
    font-weight: 600;
    margin: 8px 0;
    color: #000;
  }
  .guide-tip {
    margin: 4px 0;
    color: #333;
    .guide-tip-dot {
      font-weight: 900;
    }
  }
}
</style>
