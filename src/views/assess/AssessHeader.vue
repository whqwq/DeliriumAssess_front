<template>
  <div class="assess-header-container">
    <div class="assess-header">
      <el-icon @click="goBack" style="cursor: pointer;"><Back /></el-icon>
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
      <el-icon style="cursor: pointer;" @click="showPageTips"><QuestionFilled/></el-icon>
      <!-- <el-button class="submit-btn" plain @click="trySubmit">提交量表</el-button> -->
    </div>
  </div>
</template>

<script setup>
import { defineModel, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['steps']) //  steps: [{text:'stepA', finished:true}]
const emit = defineEmits(['trySubmit'])
const curPageIndex = defineModel()
const goBack = () => {
  router.go(-1)
}
const turnPage = (i) => {
  curPageIndex.value = i
}
// const trySubmit = () => emit('trySubmit')
const showPageTips = () => {
  
}
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
</style>
