<template>
  <div class="record-details">
    <el-backtop class="backtop" />
    <Topbar />
    <div class="main">
      <div class="main-title-box">
        <div class="title">{{ record.assessType }}评估记录详情</div>
        <div class="subtitle">
          <span>受试者：{{ record.patient.idInProejct }}</span>
          <span>{{ record.recordTime }}</span>
        </div>
      </div>
      <div class="QAs">
        <div v-for="(qa, qai) in record.QAs">
          <el-divider />
          <div class="question-container">
            <div class="question">
              <span>
                <span class="question-number">{{ qa.question.i + '. ' }}</span>
                {{ qa.question.content }}
              </span>
              <span>
                <el-button
                  class="change-btn"
                  plain
                  @click="unLockAnswer(qai)"
                  :disabled="!qa.locked"
                >
                  <span v-if="qa.locked">修改该题记录</span>
                  <span v-else>正在修改该题</span>
                </el-button>
              </span>
            </div>
          </div>
          <div class="answer-container">
            <QuestionAnswer
              v-model="qa.answer"
              :choices="qa.question.choices"
              :locked="qa.locked"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="submit-btns">
      <el-button class="submit-btn" size="large" round v-if="showSubmitBtn" @click="reset"
        >撤销修改</el-button
      >
      <el-button
        class="submit-btn"
        type="primary"
        size="large"
        round
        v-if="showSubmitBtn"
        @click="trySubmit"
        >提交修改</el-button
      >
    </div>
  </div>
</template>

<script setup>
import QuestionAnswer from '../assess/3DCAM/QuestionAnswer.vue'
import Topbar from '@/components/system/Topbar.vue'
import { useRoute, useRouter } from 'vue-router'
import { templateRecordDetails } from './const.js'
import { ref } from 'vue'
const route = useRoute()
const router = useRouter()
const recordRaw = ref(templateRecordDetails)
recordRaw.value.QAs.forEach((qa) => {
  qa.locked = true
})
const record = ref(templateRecordDetails)
const showSubmitBtn = ref(false)
const unLockAnswer = (idx) => {
  showSubmitBtn.value = true
  record.value.QAs[idx].locked = false
}
const reset = () => {
	console.log(recordRaw.value);
  record.value = recordRaw.value
}
const trySubmit = () => {}
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
.QAs {
  width: 100%;
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
