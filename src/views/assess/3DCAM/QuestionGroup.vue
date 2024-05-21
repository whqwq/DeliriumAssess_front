<template>
  <div class="question-group">
    <div class="group-title" v-if="questionGroup.title">{{ questionGroup.title }}</div>
    <div class="group-dialog" v-if="questionGroup.dialog">{{ questionGroup.dialog }}</div>
    <div class="group-tips" v-if="questionGroup.tips">{{ questionGroup.tips }}</div>
    <div class="questions">
      <div v-for="(q, qi) in questionGroup.questions">
        <template v-if="!q.isExtra || isShowExtra">
          <div class="question-content">
            <template v-if="q.answerTips">
              <el-popover placement="top" trigger="click" :content="q.answerTips">
                <template #reference>
                  <span>{{ q.i + '. ' + q.content }}</span>
                </template>
              </el-popover>
            </template>
            <template v-else>
              <span>{{ q.i + '. ' + q.content }}</span>
            </template>
          </div>
          <div class="question-answer-container">
            <QuestionAnswer
              :questionIndex="qi"
              :choices="q.choices || questionGroup.choices"
              @choiceChange="choiceChange"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import QuestionAnswer from './QuestionAnswer.vue'
import { ref, computed } from 'vue'
const props = defineProps(['questionGroup'])
const questionGroup = props.questionGroup
const answerChoices = ref(new Array(questionGroup.questions.length).fill(null))
const choiceChange = (answerValue, i) => {
  answerChoices.value[i] = answerValue
	const questions = questionGroup.questions
	for (let j = 0; j < questions.length; j++) {
		if (!questions[j].isExtra && !answerChoices.value[j]) {
			isShowExtra.value = false
			return
		}
	}
	isShowExtra.value = true
}
const isShowExtra = ref(false)
</script>

<style scoped lang="less">
:deep(.el-radio-group) {
  display: block;
}
.radio-input {
  width: 300px;
}
.question-group {
  .group-title {
  }
  .group-dialog {
  }
  .group-tips {
  }
  .questions {
  }
  .question-content {
    cursor: default;
  }
  .question-answer-container {
  }
}
</style>
