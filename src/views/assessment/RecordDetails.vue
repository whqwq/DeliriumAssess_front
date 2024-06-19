<template>
  <div class="record-details">
    <el-backtop class="backtop" />
    <Topbar />
    <div class="main">
      <div class="main-title-box">
        <div class="title">{{ record.assessType }}评估记录详情</div>
        <div class="subtitle">
          <span>受试者：{{ record.patientIdInProject + record.patientAlpha }}</span>
          <span>记录生成时间：{{ record.recordTime }}</span>
        </div>
        <div class="subtitle" v-if="record.changeReason">
          <span>记录修改理由：{{ record.changeReason }}</span>
        </div>
      </div>
      <div v-for="(qa, qai) in record.QAs">
        <div class="QA" v-if="!qa.isHide">
          <el-divider />
          <div class="question-container">
            <div class="question">
              <span>
                <span class="question-number">{{ qa.question.i + '. ' }}</span>
                {{ qa.question.content }}
              </span>
              <span v-if="record.isLatest">
                <el-button
                  class="change-btn"
                  plain
                  @click="unLockAnswer(qai)"
                  :disabled="!recordLockList[qai]"
                >
                  <span v-if="recordLockList[qai]">修改该题记录</span>
                  <span v-else>正在修改该题</span>
                </el-button>
              </span>
            </div>
          </div>
          <div class="answer-container">
            <QuestionAnswer
              v-model="qa.answer"
              :choices="qa.question.choices"
              :locked="recordLockList[qai]"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="submit-btns">
      <el-button class="submit-btn" size="large" round v-if="showSubmitBtn" @click="resetChange"
        >撤销修改</el-button
      >
      <el-button
        class="submit-btn"
        type="primary"
        size="large"
        round
        v-if="showSubmitBtn"
        @click="trySubmitChange"
        >提交修改</el-button
      >
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import HTTPAPI from '@/utils/http/api.js'
import QuestionAnswer from '@/views/assess/3DCAM/QuestionAnswer.vue'
import Topbar from '@/components/system/Topbar.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { getFakeRecordDetails } from './const.js'
import { getTemplateQAs, getQAbyId } from '@/views/assess/3DCAM/const.js'
import { ref, watch, onMounted, computed } from 'vue'
import { debounce } from 'lodash'

const route = useRoute()
const router = useRouter()
const showSubmitBtn = ref(false)

const recordRawJSON = ref('')
const record = ref({})
const initRecord = () => {
  recordRawJSON.value = ''
  record.value = {
    QAs: [],
    recordId: route.query.recordId,
    isLatest: false,
    assessType: '',
    patientId: '',
    patientIdInProejct: '',
    patientAlpha: '',
    recordTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    changeReason: ''
  }
}

const recordLockList = ref([])

const recordQAs = computed(() => record.value.QAs || [])

const checkQAHide3DCAM = (newQAs) => {
  const tmpQAs = newQAs.filter((qa) => ['8', '9', '10'].includes(qa.question.i))
  const isHide = tmpQAs.some((qa) => !qa.answer.value)
  record.value.QAs.forEach((qa) => {
    if (qa.question.i === '21' && qa.isHide !== isHide) qa.isHide = isHide
  })
}

const unLockAnswer = (idx) => {
  showSubmitBtn.value = true
  recordLockList.value[idx] = false
}
const resetChange = () => {
  const recordRaw = JSON.parse(recordRawJSON.value)
  record.value = recordRaw
  recordLockList.value = new Array(recordRaw.QAs.length).fill(true)
  showSubmitBtn.value = false
}
const trySubmitChange = () => {
  ElMessageBox.prompt('请输入修改理由', '提交修改记录', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /.+/,
    inputErrorMessage: '修改理由不能为空',
  }).then(({ value }) => {
    const questionAnswers = []
    recordQAs.value.forEach((qa) => {
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
    HTTPAPI.changeAssessRecord({
      recordId: record.value.recordId,
      changeReason: value,
      questionAnswers
    }).then((res) => {
      if (!res || res.status !== 0) return
      ElMessage.success('修改成功')
      setTimeout(() => {
        router.go(-1)
        // router.push({ path: '/recordDetails', query: { recordId: res.data.recordId } })
      }, 1000)
    })
  }).catch(() => {})
}
const getRecord = () => {
  const handleQAs = (recordQuestions) => {
    const templateQAs = getTemplateQAs()
    return recordQuestions.map((qa) => {
      const templateQA = getQAbyId(templateQAs, qa.questionNo)
      const question = {
        i: templateQA.question.i,
        content: templateQA.question.content,
        choices: templateQA.question.choices,
        isHide: templateQA.question.isHide,
        isExtra: templateQA.question.isExtra
      }
      const answer = {
        choice: qa.answerJudgement,
        input: qa.answerContent,
        value: qa.answerCorrect,
        needInput: false
      }
      return { question, answer }
    })
  }

  initRecord()
  HTTPAPI.getAssessRecordDetails({ recordId: route.query.recordId }).then((res) => {
    if (!res || res.status !== 0) return
    const { data } = res || {}
    const recordRaw = data.record || {}
    recordRaw.recordTime = moment(recordRaw.recordTime).format('YYYY-MM-DD HH:mm:ss')
    recordRaw.QAs = handleQAs(recordRaw.recordQuestions)
    recordRawJSON.value = JSON.stringify(recordRaw)
    resetChange()
  })
}
onMounted(() => {
  getRecord()
  if (record.value.assessType === '3D-CAM') {
    watch(recordQAs, debounce(checkQAHide3DCAM, 1000), { deep: true })
  }
})
</script>

<style scoped lang="less">
.record-details {
  padding: 32px;
  width: 100%;
  height: 100%;
  .main {
    padding: 16px 32px;
    margin-bottom: 32px;
    background-color: white;
    border-radius: 4px;
    .main-title-box {
      line-height: 1.5;
      .title {
        display: flex;
        justify-content: center;
        font-size: 22px;
        font-weight: 500;
      }
      .subtitle {
        color: #444;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
.QA {
  .question-container {
    width: 100%;
    font-size: 18px;
    margin: 8px 0;
    cursor: default;
    font-weight: 500;
    .question {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .question-number {
        font-size: 15px;
        margin-right: 4px;
      }
    }
    .change-btn {
      margin-left: 20px;
    }
  }
  .answer-container {
    width: 100%;
  }
}
.backtop {
  @marginspace: 40px;
  right: @marginspace;
  bottom: @marginspace;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
}
.submit-btns {
  width: 100%;
  padding: 0 10%;
  display: flex;
  justify-content: space-between;
  .submit-btn {
    width: 40%;
  }
}
</style>
