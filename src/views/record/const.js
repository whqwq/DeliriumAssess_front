export const templateRecord = {
  patient: {
    id: 1,
    idInProejct: '001W',
    alpha: 'W'
  },
  assessor: {
    name: '王医生',
    phone: '15161656577'
  },
  recordTime: '2024-05-22 13:20',
  assessType: '3D-CAM',
  assessResults: [
    { feature: 1, positive: true },
    { feature: 2, positive: true },
    { feature: 3, positive: false },
    { feature: 4, positive: true }
  ]
}

export const featureDescriptionMap = {
  1: '急性起病且病情呈现波动性',
  2: '注意力不能集中',
  3: '思维紊乱',
  4: '意识水平改变'
}

const choicesList = []
choicesList[0] = [
  { text: '正确', value: true },
  { text: '错误', value: false },
  { text: '拒绝', value: false },
  { text: '不知道/无回答', value: false }
]
choicesList[1] = [
  { text: '正确', value: true },
  { text: '错误', value: false, needInput: true },
  { text: '拒绝', value: false },
  { text: '不知道/无回答', value: false }
]
choicesList[2] = [
  { text: '否', value: true },
  { text: '是', value: false, needInput: true },
  { text: '拒绝', value: false },
  { text: '无意义', value: false, needInput: true },
  { text: '不知道/无回答', value: false }
]
choicesList[3] = [
  { text: '否', value: true },
  { text: '是', value: false, needInput: true },
  { text: '拒绝', value: false },
  { text: '无意义', value: false, needInput: true },
  { text: '不知道/无回答', value: false },
  { text: '盲人', value: true }
]
choicesList[4] = [
  { text: '否', value: true },
  { text: '是', value: false, needInput: true }
]
choicesList[5] = [
  { text: '否', value: true },
  { text: '是', value: false }
]

const templateQAs = [
  {
    question: {
      i: '1',
      content: '请告诉我现在是哪一年',
      choices: choicesList[0],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '2',
      content: '请告诉我今天是星期几',
      choices: choicesList[0],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '3',
      content: '请告诉我这是什么地方',
      choices: choicesList[0],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '4', content: '倒叙 7-5-1', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '5', content: '倒叙 8-2-4-3', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '6A', content: '倒数季节 冬季', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '6B', content: '倒数季节 秋季', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '6C', content: '倒数季节 夏季', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '6D', content: '倒数季节 春季', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '7A', content: '计算 20-3', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '7B', content: '计算 17-3', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '7C', content: '计算 14-3', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '7D', content: '计算 11-3', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: { i: '7E', content: '计算 8-3', choices: choicesList[1], isExtra: false },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '8',
      content: '在过去的一天里您是否感到困惑（疑惑、糊涂）？',
      choices: choicesList[2],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '9',
      content: '在过去的一天里您是否有并不是真的在医院的想法？',
      choices: choicesList[2],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '10',
      content: '在过去的一天里您是否看见一些实际上并不存在的东西？',
      choices: choicesList[3],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '21',
      content:
        '请查询病历或者联系了解患者情况的家属、朋友或护理人员，了解：在过去24小时，患者的记忆力或思维是否有急性改变？（如糊涂、幻觉、思维混乱）',
      choices: choicesList[4],
      isExtra: true
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '11A',
      content: '患者在访视期间是否出现困倦？',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '11B',
      content: '患者在访视期间是否昏睡或昏迷？',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '12',
      content: '患者是否表现出过度警觉？',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '13',
      content: '患者的思维是否不清晰或没有逻辑？',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },

  {
    question: {
      i: '14',
      content: '患者的谈话是否漫无边际、过度冗长或者无法围绕主题？',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '15',
      content: '患者的谈话是否过于局限或话语极少？',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '16',
      content: '在访视过程中，患者是否难以记住访视内容？',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '17',
      content: '患者是否容易被周围环境刺激吸引？',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '18',
      content: '访视期间患者的意识水平是否有波动？',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '19',
      content: '访视期间患者的注意力水平是否有波动?',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '20',
      content: '访视期间患者的言语或思维在是否有波动？',
      choices: choicesList[5],
      isExtra: false
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '22',
      content:
        '检查之前的3D-CAM评估结果(若有)，根据任何新发“阳性”症状，确定患者是否有急性改变，记录距离上次日期和改变特征)。',
      choices: choicesList[4],
      isExtra: true
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  }
]

export const templateRecordDetails = {
  ...templateRecord,
  QAs: templateQAs
}

export const getTemplateRecordDetails = () => ({ ...templateRecord, QAs: templateQAs })
