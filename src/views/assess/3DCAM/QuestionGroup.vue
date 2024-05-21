<template>
  <div class="question-group">
    <div class="group-title" v-if="questionGroup.title">
      {{ questionGroup.title }}
    </div>
    <div class="group-dialog" v-if="questionGroup.dialog">对话：{{ questionGroup.dialog }}</div>
    <div class="group-tips" v-if="questionGroup.tips">提示：{{ questionGroup.tips }}</div>
    <div class="questions">
      <div v-for="q in questionGroup.questions">
        <div v-show="!q.isExtra || isShowExtra">
          <el-divider />
          <div class="question-content">
            <template v-if="q.answerTips">
              <el-popover placement="top" trigger="click" :content="q.answerTips">
                <template #reference>
                  <span>
                    <span class="question-content-number">{{ q.i + '. ' }}</span>
                    {{ q.content }}
                  </span>
                </template>
              </el-popover>
            </template>
            <template v-else>
              <span>
                <span class="question-content-number">{{ q.i + '. ' }}</span>
                {{ q.content }}
              </span>
            </template>
          </div>
          <div class="question-answer-container">
            <QuestionAnswer v-model="q.answer" :choices="q.choices" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { debounce } from 'lodash'
import QuestionAnswer from './QuestionAnswer.vue'
import { ref, computed, defineModel, watch } from 'vue'
const props = defineProps(['questionGroup'])

const isShowExtra = computed(() => {
  const q = props.questionGroup.questions
  for (let i = 0; i < q.length; i++) {
    if (!q[i].isExtra && !q[i].answer.value) {
      return false
    }
  }
  return true
})

const answers = defineModel()
const questionsAnswers = computed(() => {
  const qas = []
  for (const q of props.questionGroup.questions) {
    if (!q.isExtra || (q.isExtra && isShowExtra.value))
      qas.push({ ...q.answer, i: q.i, content: q.content })
  }
  return qas
})
const handleQuestionsAnswersChange = () => {
  answers.value = questionsAnswers.value
}
watch(questionsAnswers, debounce(handleQuestionsAnswersChange, 1000), {
  deep: true,
  immediate: true
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
  }
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
</style>
