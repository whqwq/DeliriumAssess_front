<template>
  <div class="assess-3DCAM">
    <!-- Header -->
    <AssessHeader v-model="curPageIndex" :steps="steps" @trySubmit="trySubmit" />
    <!-- assess pages -->
    <template v-for="(ap, api) in assessPages">
      <div class="assess-page" v-show="curPageIndex === api">
        <div class="assess-page-part">{{ ap.part }}</div>
        <div class="assess-page-quesitonGroups">
          <QuestionGroup v-for="qg in ap.questionGroups" :questionGroup="qg" v-model="qg.QAs" />
        </div>
        <div class="assess-page-btn-container inner-center">
          <!-- <el-button class="assess-page-btn" type="info" plain round size="large" @click="tmpSave()"
            >暂存</el-button
          > -->
          <el-button
            class="assess-page-btn"
            type="primary"
            round
            size="large"
            v-if="api === 3"
            @click="trySubmit"
            >提交
          </el-button>
        </div>
      </div>
    </template>
    <!-- turn page btn -->
    <div class="turn-btn turn-btn-left" @click="turnPage(curPageIndex - 1)" v-if="curPageIndex > 0">
      <el-icon><ArrowLeftBold /></el-icon>
    </div>
    <div
      class="turn-btn turn-btn-right"
      @click="turnPage(curPageIndex + 1)"
      v-if="curPageIndex < assessPages.length - 1"
    >
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <!-- dialog where assess begin -->
    <el-dialog
      class="beginning"
      style="min-width: 250px"
      v-model="isShowBeginning"
      title="开场对话"
      :show-close="false"
      :before-close="() => {}"
    >
      <div class="beginning-text">
        告知受试者：现在我会问您几个问题来检测您的记忆力，如果您不知道答案也不用担心。
      </div>
      <div class="beginning-text">
        请围绕某一主题（例如近期睡眠、疼痛、恶心呕吐、活动情况等）和受试者进行3-5句简短对话。从中观察受试者反应。
      </div>
      <div class="beginning-btn-container inner-center">
        <el-button
          class="beginning-btn"
          size="large"
          type="primary"
          @click="isShowBeginning = false"
        >
          已完成
        </el-button>
      </div>
    </el-dialog>
    <!-- dialog after submit -->
    <el-dialog
      v-model="isShowEnding"
      style="min-width: 250px"
      :show-close="false"
      :before-close="() => {}"
    >
      <el-result icon="success" title="评估已完成" sub-title="谢谢配合">
        <template #extra>
          <el-button @click="goBack" class="end-btn">返回</el-button>
          <el-button type="primary" class="end-btn" @click="gotoAssessmentResult"
            >查看评估结果</el-button
          >
        </template>
      </el-result>
    </el-dialog>
  </div>
</template>

<script setup>
import Cookie from '@/utils/cookie.js'
import HTTPAPI from '@/utils/http/api.js'
import { debounce } from 'lodash'
import { ElMessageBox } from 'element-plus'
import AssessHeader from '../AssessHeader.vue'
import QuestionGroup from './QuestionGroup.vue'
import { getTemplateAssessPages, getTemplateAssessPagesWithAnswersJSON } from './const.js'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonStore } from '@/stores/common.js'

const commonStore = useCommonStore()
const route = useRoute()
const router = useRouter()

const isShowBeginning = ref(false)
const isShowEnding = ref(false)
const submitedAssessId = ref()
const assessPages = ref(getTemplateAssessPages())
const steps = ref(assessPages.value.map((ap) => ({ text: ap.instruction, finished: false })))
const curPageIndex = ref(0)

const curPage = computed(() => assessPages.value[curPageIndex.value])
const curPageQAs = computed(() => {
  const qGroups = curPage.value.questionGroups || []
  return qGroups.map((qg) => qg.QAs).flat()
})

const checkCurQAsFinished = (newCurQAs) => {
  for (let i = 0; i < newCurQAs.length; i++) {
    const qa = newCurQAs[i]
    if (qa.isHide) continue
    const answer = qa.answer
    if (!answer.choice || (!answer.input && answer.needInput)) {
      steps.value[curPageIndex.value].unFinishedQuestionId = qa.question.i
      steps.value[curPageIndex.value].finished = false
      return
    }
  }
  steps.value[curPageIndex.value].finished = true
}
watch(curPageQAs, debounce(checkCurQAsFinished, 500), { deep: true, immediate: true })

const turnPage = (i) => {
  curPageIndex.value = i
}

const tmpSave = () => {
  console.log(newCurQAs.filter((qa) => !qa.isHide))
}

const submitAssess = () => {
  const questionAnswers = []
  assessPages.value.forEach((ap) => {
    ap.questionGroups.forEach((qg) => {
      qg.QAs.forEach((qa) => {
        if (!qa.isHide) {
          questionAnswers.push({
            questionNo: qa.question.i,
            questionContent: qa.question.content,
            answerJudgement: qa.answer.choice,
            answerContent: qa.answer.input,
            answerCorrect: qa.answer.value
          })
        }
      })
    })
  })
  HTTPAPI.submitAssess({
    patientId: route.query.patientId,
    assessTime: route.query.assessTime,
    assessType: route.query.assessType,
    assessorPhone: Cookie.getCookie('phone'),
    questionAnswers: questionAnswers
  }).then((res) => {
    commonStore.loading = false
    if (!res || res.status !== 0) return
    submitedAssessId.value = res.data.assessmentId
    isShowEnding.value = true
  })
}
const trySubmit = () => {
  commonStore.loading = true
  for (let i = 0; i < steps.value.length; i++) {
    const st = steps.value[i]
    if (!st.finished) {
      commonStore.loading = false
      curPageIndex.value = i
      ElMessageBox.alert(`量表【${st.text}】页中，题目【${st.unFinishedQuestionId}】未填写完整`, {
        confirmButtonText: '我知道了'
      })
      return
    }
  }
  submitAssess()
}

const goBack = () => {
  router.go(-1)
}
const gotoAssessmentResult = () => {
  router.push({ path: '/assessmentResult', query: { assessmentId: submitedAssessId.value } })
}
onMounted(() => {
  isShowBeginning.value = true
  // assessPages.value = JSON.parse(getTemplateAssessPagesWithAnswersJSON())
})
</script>

<style scoped lang="less">
@turn-icon-space: 14px;
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
.end-btn {
  width: 100px;
}
.assess-3DCAM {
  padding: 32px;
  padding-top: calc(32px + var(--topbar-height));
}
.assess-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: linear-gradient(135deg, #404c70 0%, #1e253d 100%);
  width: 100%;
  height: var(--topbar-height);
  font-size: calc(var(--topbar-height) / 1.8);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 8px;
  .assess-header-steps-container {
    width: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
}
.assess-page {
  margin: 8px;
  padding: 32px;
  border-radius: 4px;
  background-color: white;
  line-height: 1.5;
  .assess-page-part {
    color: #666;
    display: flex;
    justify-content: right;
    cursor: default;
  }
  .assess-page-btn-container {
    width: 100%;
    margin: 16px 0;
    .assess-page-btn {
      max-width: 100%;
      width: 260px;
      font-weight: 600;
      border-width: 2px;
    }
  }
  .turn-btn {
    position: fixed;
    top: 50%;
    translate: 0 -50%;
    scale: 1 1.6;
    font-size: 22px;
    color: #666;
    cursor: pointer;
    transition: all 0.25s linear;
    &:hover {
      color: #409eef;
    }
  }
  .turn-btn-left {
    left: @turn-icon-space;
    &:hover {
      translate: -5px -50%;
    }
  }
  .turn-btn-right {
    right: @turn-icon-space;
    &:hover {
      translate: 5px -50%;
    }
  }
}
</style>
