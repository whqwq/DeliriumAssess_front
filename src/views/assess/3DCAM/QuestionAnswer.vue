<template>
  <div class="question-answer">
    <el-radio-group v-model="answerChoice">
      <div class="answer-radioline" v-for="c in choices">
        <el-radio :value="c.text">{{ c.text }}</el-radio>
        <el-input
          class="radio-input"
          type="textarea"
          :autosize="{ minRows: 1 }"
          v-if="c.needInput && answerChoice === c.text"
          v-model="answerInput"
        />
      </div>
    </el-radio-group>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue'
const props = defineProps(['choices', 'questionIndex'])
const emit = defineEmits(['choiceChange'])
const questionIndex = props.questionIndex
const choices = props.choices
const choiceTextValueMap = {}
choices.forEach((c) => {
  choiceTextValueMap[c.text] = c.value
})
const answerChoice = ref(null)
const answerInput = ref('')
const handleChoiceChange = (choice) => {
  const choiceValue = choiceTextValueMap[choice]
  emit('choiceChange', choiceValue, questionIndex)
}
watch(answerChoice, handleChoiceChange)
</script>

<style scoped lang="less">
:deep(.el-radio-group) {
  display: block;
}
.answer-radioline {
  display: flex;
}
.radio-input {
  max-width: 65%;
}
</style>
