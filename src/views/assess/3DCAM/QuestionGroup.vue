<template>
  <div class="question-group">
    <div class="group-title" v-if="questionGroup.title">
      {{ questionGroup.title }}
    </div>
    <div class="group-dialog" v-if="questionGroup.dialog">对话：{{ questionGroup.dialog }}</div>
    <div class="group-tips" v-if="questionGroup.tips">提示：{{ questionGroup.tips }}</div>
    <div class="questions">
      <div v-for="qa in questionGroup.QAs">
        <div v-show="!qa.question.isExtra || isShowExtra">
          <el-divider />
          <div class="question-content">
            <!-- <template v-if="qa.question.answerTips">
              <el-popover placement="top" trigger="click" :content="qa.question.answerTips">
                <template #reference>
                  <span>
                    <span class="question-content-number">{{ qa.question.i + '. ' }}</span>
                    {{ qa.question.content }}
                  </span>
                </template>
              </el-popover>
            </template>
            <template v-else> -->
            <span>
              <span class="question-content-number">{{ qa.question.i + '. ' }}</span>
              {{ qa.question.content }}
            </span>
            <!-- </template> -->
          </div>
          <div class="question-answer-container">
            <QuestionAnswer v-model="qa.answer" :choices="qa.question.choices" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import QuestionAnswer from './QuestionAnswer.vue'
import { computed, defineModel } from 'vue'
const props = defineProps(['questionGroup'])

const QAs = defineModel()
const isShowExtra = computed(() => {
  let showFlag = true
  const qas = props.questionGroup.QAs
  for (let i = 0; i < qas.length; i++) {
    if (!qas[i].question.isExtra && !qas[i].answer.value) {
      showFlag = false
      break
    }
  }
  QAs.value.forEach((qa) => {
    if (qa.question.i === '21' && qa.isHide === showFlag) qa.isHide = !showFlag
  })
  return showFlag
})
</script>

<style scoped lang="less">
:deep(.el-radio-group) {
  display: block;
}
.radio-input {
  width: 300px;
}
.question-group {
  line-height: 2;
  .group-title {
    font-size: 22px;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
  .group-dialog {
    width: 100%;
  }
  .group-tips {
    color: #666;
    font-size: 14px;
  }
  .questions {
    width: 100%;
    .question-content {
      font-size: 18px;
      margin: 8px 0;
      cursor: default;
      font-weight: 500;
      &-number {
        font-size: 15px;
        margin-right: 4px;
      }
    }
    .question-answer-container {
      width: 100%;
    }
  }
}
</style>
