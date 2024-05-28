import QuestionGroup from './QuestionGroup.vue'

export const QUESTION_VISIT = 0
export const QUESTION_OBSERVE = 1

export const getChoiceMap = (choices, source, target) => {
  const map = {}
  for (let c of choices || []) {
    map[c[source]] = c[target]
  }
  return map
}

const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const getCurYear = () => new Date().getFullYear()
const getCurWeekDay = () => weekDays[new Date().getDay()]

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

export const getTemplateQAs = () => [
  {
    question: {
      i: '1',
      content: '请告诉我现在是哪一年',
      answerTips: getCurYear() + '年',
      choices: choicesList[0]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '2',
      content: '请告诉我今天是星期几',
      answerTips: getCurWeekDay(),
      choices: choicesList[0]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '3',
      content: '请告诉我这是什么地方',
      answerTips: '答出“医院”即可',
      choices: choicesList[0]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '4',
      content: '倒叙 7-5-1',
      answerTips: '逆序：1-5-7',
      choices: choicesList[1]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '5',
      content: '倒叙 8-2-4-3',
      answerTips: '逆序：3-4-2-8',
      choices: choicesList[1]
    },
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
    question: {
      i: '7A',
      content: '计算 20-3',
      answerTips: '17',
      choices: choicesList[1]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '7B',
      content: '计算 17-3',
      answerTips: '14',
      choices: choicesList[1]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '7C',
      content: '计算 14-3',
      answerTips: '11',
      choices: choicesList[1]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '7D',
      content: '计算 11-3',
      answerTips: '8',
      choices: choicesList[1]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '7E',
      content: '计算 8-3',
      answerTips: '5',
      choices: choicesList[1]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '8',
      content: '在过去的一天里您是否感到困惑（疑惑、糊涂）？',
      answerTips: '关于基本信息，如定向力、住院原因等，而不是关于医疗和治疗的细节。',
      choices: choicesList[2]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '9',
      content: '在过去的一天里您是否有并不是真的在医院的想法？',
      answerTips: '刚刚觉醒时的短暂定向障碍不应被计算在内，例如醒后15秒内。',
      choices: choicesList[2]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '10',
      content: '在过去的一天里您是否看见一些实际上并不存在的东西？',
      answerTips:
        '例如伸手去拿一个物品却发现它并不存在，或看到可怕/奇怪的物体，或觉得自己身上发生了奇怪的事情。',
      choices: choicesList[3]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '21',
      content:
        '请查询病历或者联系了解受试者情况的家属、朋友或护理人员，了解：在过去24小时，受试者的记忆力或思维是否有急性改变？（如糊涂、幻觉、思维混乱）',
      choices: choicesList[4],
      isExtra: true,
      isHide: true,
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '11A',
      content: '受试者在访视期间是否出现困倦？',
      answerTips: '受试者实际入睡，但是容易唤醒',
      choices: choicesList[5]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '11B',
      content: '受试者在访视期间是否昏睡或昏迷？',
      answerTips: '难以唤醒',
      choices: choicesList[5]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '12',
      content: '受试者是否表现出过度警觉？',
      answerTips: '对环境中的普通事物或刺激出现过分强烈的反应、不适当的惊吓等',
      choices: choicesList[5]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '13',
      content: '受试者的思维是否不清晰或没有逻辑？',
      answerTips:
        '无意义的语句、无法正确回答问题、矛盾的陈述或思维不可预测地从一个主题转移至另一个主题',
      choices: choicesList[5]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '14',
      content: '受试者的谈话是否漫无边际、过度冗长或者无法围绕主题？',
      answerTips: '脱离谈话主题或者讲述与访视无关的故事',
      choices: choicesList[5]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '15',
      content: '受试者的谈话是否过于局限或话语极少？',
      answerTips:
        '过度简洁或刻板地回答。病人不主动发起任何谈话，但是可以回答问题，一般只用是或否进行回答。',
      choices: choicesList[5]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '16',
      content: '在访视过程中，受试者是否难以记住访视内容？',
      choices: choicesList[5],
      answerTips: '反复要求评估者重复问题'
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '17',
      content: '受试者是否容易被周围环境刺激吸引？',
      choices: choicesList[5],
      answerTips: '比如电视、房间外的人、室友谈话'
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '18',
      content: '访视期间受试者的意识水平是否有波动？',
      answerTips: '访视的部分时间里频繁入睡，但部分时间则完全清醒',
      choices: choicesList[5]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '19',
      content: '访视期间受试者的注意力水平是否有波动?',
      answerTips:
        '访视的部分时间注意力很不集中，但部分时间可以集中注意力。提示：仅根据正确回答一些问题，而错误回答另一些问题不足以判断此特征',
      choices: choicesList[5]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '20',
      content: '访视期间受试者的言语或思维在是否有波动？',
      answerTips: '访视的部分时间语速很慢，然后又很快；或者言语内容部分与访视有关然后又无关',
      choices: choicesList[5]
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  },
  {
    question: {
      i: '22',
      content:
        '检查之前的3D-CAM评估结果(若有)，根据任何新发“阳性”症状，确定受试者是否有急性改变，记录距离上次日期和改变特征',
      choices: choicesList[4],
      isExtra: true
    },
    answer: { choice: '', input: '', value: false, needInput: false }
  }
]

export const getQAbyId = (QAs, id) => QAs.filter((qa) => qa.question.i === id)[0]
export const getQAsByIdList = (QAs, idList) => QAs.filter((qa) => idList.includes(qa.question.i))

const templateQAs = getTemplateQAs()
export const questionGroups = [
  {
    title: '定向力',
    dialog: '',
    tips: '',
    QAs: getQAsByIdList(templateQAs, ['1', '2', '3'])
  },
  {
    title: '数字倒序',
    dialog: '现在我会读出一些数字，请您按照相反的顺序重复我所读出的数字，例如我说6-8，您就说8-6。',
    tips: '按照每秒1个数字的速度读出，数列最多重复一次。',
    QAs: getQAsByIdList(templateQAs, ['4', '5'])
  },
  {
    title: '季节倒数',
    dialog: '请从冬季开始，倒着说出四个季节。',
    tips: '可以提示：“冬季之前是哪个季节？；只能使用1次提示。注意：可以提示“再之前是哪个季节”，但是不要主动提示“冬/秋/夏季之前是哪个季节？”如果受试者按照正序说出季节，请再次进行说明',
    QAs: getQAsByIdList(templateQAs, ['6A', '6B', '6C', '6D'])
  },
  {
    title: '计算',
    dialog: '下面做一项减法运算，从20开始，每次减去3，请连续计算，直到我说停为止。',
    tips: '注意：可以提示“再减去3等于多少”，而不要主动提示“17/14/11减去3等于多少？”；当受试者停在X，可以提示“X提减去3等于多少？，但只能提示1次。',
    QAs: getQAsByIdList(templateQAs, ['7A', '7B', '7C', '7D', '7E'])
  },
  {
    title: '受试者主诉症状',
    dialog: '现在我会问几个问题，是关于您过去一天的情况。',
    tips: '如果受试者在以下任意一项问题中回答“是”或“无意义”，请询问细节（何时发生/具体内容/发生频率）并记录答案。',
    QAs: getQAsByIdList(templateQAs, ['8', '9', '10', '21'])
  },
  {
    title: '观察评估',
    tips: '访视部分已结束，下面请完成评估者观察内容并选择相应选项。',
    choices: choicesList[5],
    QAs: getQAsByIdList(templateQAs, [
      '11A',
      '11B',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20'
    ])
  }
]

export const getTemplateAssessPages = () => [
  { part: '访视部分', instruction: '定向力', questionGroups: [questionGroups[0]] },
  { part: '访视部分', instruction: '倒数/计算', questionGroups: questionGroups.slice(1, 4) },
  { part: '访视部分', instruction: '主诉症状', questionGroups: [questionGroups[4]] },
  { part: '观察部分', instruction: '观察评估', questionGroups: [questionGroups[5]] }
]