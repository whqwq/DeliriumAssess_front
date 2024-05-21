<template>
  <div class="assess-3DCAM">
    <div class="assess-content">
			<QuestionGroup v-for="qg in visitQuestionGroups" :questionGroup="qg" />
		</div>
    <el-dialog
      class="beginning"
      style="min-width: 250px"
      v-model="isShowBeginning"
      title="开场对话"
      :show-close="false"
      :before-close="() => {}"
    >
      <div class="beginning-text">
        告知患者：现在我会问您几个问题来检测您的记忆力，如果您不知道答案也不用担心。
      </div>
      <div class="beginning-text">
        请围绕某一主题（例如近期睡眠、疼痛、恶心呕吐、活动情况等）和患者进行3-5句简短对话。从中观察患者反应。
      </div>
      <div class="beginning-btn-container inner-center">
        <el-button class="beginning-btn" size="large" type="primary" @click="finishBeginning">
          已完成
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import QuestionGroup from './QuestionGroup.vue'
import { visitQuestionGroups, observeQuestionGroups } from './3DCAM.js'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const patient = ref({
  id: route.query.patientId,
  idInProject: '001',
  alpha: 'W'
})
const assessType = ref(route.query.assessType)
const isShowBeginning = ref(false)
const finishBeginning = () => {
  isShowBeginning.value = false
}

onMounted(() => {
  // isShowBeginning.value = true
})
</script>

<style scoped lang="less">
.inner-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.beginning {
  min-width: 250px;
  .beginning-text {
    margin-bottom: 16px;
  }
  .beginning-btn-container {
    width: 100%;
    .beginning-btn {
      max-width: 100%;
      width: 250px;
    }
  }
}
</style>
