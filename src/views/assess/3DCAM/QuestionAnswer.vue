<template>
  <div class="question-answer">
    <el-radio-group v-model="answerChoice">
      <div class="answer-radioline" v-for="c in choices">
        <el-radio size="large" :value="c.text" :disabled="locked">{{ c.text }}</el-radio>
        <el-input
          class="radio-input"
          type="textarea"
          :autosize="{ minRows: 1 }"
          v-if="c.needInput && answerChoice === c.text"
          v-model="answer.input"
          placeholder="请按提示将具体内容填写完整"
          :disabled="locked"
        />
      </div>
    </el-radio-group>
  </div>
</template>

<script setup>
import { getChoiceMap } from './const.js'
import { ref, watch, defineModel, watchEffect } from 'vue'
const props = defineProps(['choices', 'locked'])

const choiceTextValueMap = getChoiceMap(props.choices, 'text', 'value')
const choiceTextNeedInputMap = getChoiceMap(props.choices, 'text', 'needInput')

const answer = defineModel()
const answerChoice = ref(answer.value.choice)

const handleChoiceChange = (choice, choiceOld) => {
  if (choice === choiceOld) return
  answer.value.input = ''
  answer.value.choice = choice
  answer.value.value = choiceTextValueMap[choice]
  answer.value.needInput = choiceTextNeedInputMap[choice]
}
watch(answerChoice, handleChoiceChange)
watchEffect(() => {
  answerChoice.value = answer.value.choice
})
</script>

<style scoped lang="less">
:deep(.el-radio-group) {
  display: block;
}
.answer-radioline {
  display: flex;
  align-items: center;
}
.radio-input {
  max-width: 65%;
}
</style>
