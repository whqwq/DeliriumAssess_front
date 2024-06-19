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
      isHide: true
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

export const getTemplateAssessGuides = () => [
  {
    instruction: '定向力',
    guides: [
      {
        question: '1. 请告诉我现在是哪一年。',
        tips: ['正确答案必须准确（允许按照生肖/属相回答）']
      },
      {
        question: '2.	请告诉我今天是星期几。',
        tips: ['正确答案必须准确']
      },
      {
        question: '3.	请告诉我这是什么地方。',
        tips: [
          '正确答案必须准确，例如：医院，康复中心和/或养老院，或家。患者不需要说出此地方的实际名称。然而，如果病人主动给出错误的地方名称，则记录为“不正确”。'
        ]
      }
    ]
  },
  {
    instruction: '倒数/计算',
    guides: [
      {
        question: '4. 和5. 数字倒数',
        tips: [
          '进行眼神交流并引起患者的注意。每秒说一个数字。数字不能重复。如果被要求重复，说：“对不起，我只能说一次。让我们试试下一个”。解释也只能重复说一次。',
          '只有全部正确才能评为“正确”，如果不正确则为“错误”。 无论是否正确地完成前面的项目，请务必检查全部两个项目。'
        ]
      },
      {
        question: '6.	季节倒数',
        tips: [
          '如果在您提出问题后患者依据很茫然，您可以说：“您能告诉我冬季之前是什么季节吗？”。',
          '如果患者开始倒序说出季节后，中途停下来，鼓励他继续，如果无法继续，可以说“您能告诉我XX季节之前是什么季节吗？”，但只能提示一次。如果提示一次后，患者无法继续，不再提示，随后进入下一问题。',
          '任何一个季节的错误都被认为整个项目是不正确的。'
        ]
      },
      {
        question: '7.	计算',
        tips: [
          '向患者说明即将进行一项减法运算，从20开始，每次减3，直到测试者说停为止。',
          '当受试者停在X，可以提示患者X-3等于多少？只能提示1次。',
          '如果受试者漏掉1个计算步骤或者计算错误，则整个项目在评分结果上显示不正确。'
        ]
      }
    ]
  },
  {
    instruction: '主诉症状',
    guides: [
      {
        question: '8.	在过去的一天里您是否感到困惑？',
        tips: [
          '如果他们说：“不是今天，但我昨晚有” ，可以提示“是在过去的24小时内任何时间”。也可以改说“您是否觉得对某些事感到困惑而在正常时您不会这样？”',
          '只有当他们对于的基本信息（如他们在哪里，日期，或住院原因，而不是详细的医疗情况和/或治疗）感到困惑时，才编码。'
        ]
      },
      {
        question: '9.	在过去的一天里您是否有过想法认为您并不是真的在医院？',
        tips: [
          '举例：“您是否在半夜或早上醒来时，以为自己是在家里？”',
          '刚刚觉醒时的短暂定向障碍不应被计算在内（例如醒后15秒内）。'
        ]
      },
      {
        question: '10. 在过去的一天里您是否看见一些实际上并不存在的东西？',
        tips: [
          '如果患者没能理解这个问题，或者您觉得需要改变问题，说“有时在医院里，人们会感到混乱，觉得自己身上发生了奇怪的事情。我想知道这些事情是否发生在您身上。例如，您认为您看到有一个杯子在桌子上，当您去拿它时，它却不存在？”',
          '如果病人回答说没有感到混乱的情况，但是在评估过程中的另一个时点通过语言表达过困惑，改用合适的提问方式，确认病人实际经历了什么。比如说：“现在让我确定下，您刚才是说您以为您看到…？”，然后询问发生的时间，确认是否发生在最近24小时内。如果回答是肯定的，则更改相应的评估选项来反映此情况。'
        ]
      },
      {
        question:
          '21. 查询病例或者联系了解患者情况的家属、朋友或护理人员，了解患者是否有急性变化：“患者的记忆力或思维是否有急性改变？”',
        tips: [
          '这个问题是关于最近行为的改变。他/她相对比较困惑吗？他/她是不是有定向力障碍？例如，他/她的朋友或亲戚突然发现和他/她的谈话没有意义。如果这些改变是新出现的，并且主要发生在过去几小时到几天，则将该项目判定为“是”；如果他们几个月前就发现了这些问题，则不判定为是。如果答案是“是”，那么CAM特征1应判定为阳性。',
          '在医疗记录中，查找如“改变的精神状态”，“精神状态的变化”，“急性混乱”，“定向力失调”，“幻觉”或“定向力恢复”等记录。'
        ]
      }
    ]
  },
  {
    instruction: '观察评估',
    guides: [
      {
        question:
          '11. A.患者在访视期间是否出现困倦？（确认患者的确入睡，如点头、眼球回转、打鼾，但是容易唤醒）B. 患者在访视期间是否昏睡或昏迷？（难以唤醒）',
        tips: [
          '进入房间后，第一次叫醒病人，短暂的意识水平降低不应被判定为异常。即使您必须使劲地催促他们醒来，这第一次“醒来”也是正常的。只有当您在房间内且患者出现嗜睡时，才能判定为意识水平下降。',
          '评估意识水平：利用以下3个连续刺激进行唤醒：Ⅰ 响亮的声音；II 轻柔的触碰（手，然后手臂）；Ⅲ 响亮的声音和轻柔的摇动肩膀。',
          '例如：如果患者有其中任一情况，意识水平的改变判定为“是”：',
          '嗜睡：病人易被声音或轻柔的触碰唤醒。',
          '昏睡：病人需要响亮的声音和反复的摇动才能唤醒。',
          '昏迷：任何方法病人都无法唤醒。',
          '附加提示：',
          '如果病人在整个评估过程中闭上眼睛，但能正确地回答问题且不需上述的刺激，不能评为嗜睡。只有有实际睡着的证据才被评为嗜睡（见下文）。',
          '要确定患者是否真的睡着了，您需要有耐心。如果在您提问后受试者没有回复，而此时病人的眼睛是闭着，那么请等待至少20-25秒，看看他们是否有自发反应。如果他们不回应，则仔细寻找睡眠的其他征象（眼球回转、点头、打鼾、颤搐等）。',
          '如果患者眼睛闭着但是没有上述睡眠征象，说出他们的名字，问他们是否需要我们重复这个问题，还是他们只是在“思考”。'
        ]
      },
      {
        question:
          '12. 患者是否表现出过度警觉？（对环境中的普通事物或刺激出现过分强烈的反应、不适当的惊吓等）',
        tips: [
          '如果患者过度专注于某物，他可能是过度警觉。例如，患者在访视期间重复折叠床单，只有当患者持续专注于检查床单、盯着床单时，才被认为是过度警觉。过度警觉往往有一个先兆，就是病人表现得很害怕。这种先兆的一个例子是，患者似乎在盯着心电监护仪，并看起来畏缩或者很害怕。'
        ]
      },
      {
        question:
          '13. 患者的思维是否不清晰或没有逻辑？（无意义的语句、无法正确回答问题、矛盾的陈述或思维不可预测地从一个主题转移至另一个主题）',
        tips: [
          '无相关性的回答：您问病人他们吃饭时是否需要帮助，得到的回答是“所有的袋子都在这。”',
          '矛盾的陈述：病人说，他们睡了一夜，后来又表示整晚都有护士一直进来，把他们叫醒。',
          '逻辑异常时，会有一个持续的想法阻碍患者回答访视问题。',
          '注：要评估这项，病人必须有能力说话（例如，没有昏迷、气管插管）。'
        ]
      },
      {
        question:
          '14. 患者的谈话是否漫无边际、过度冗长或者无法围绕主题？（脱离谈话主题或者讲述与访视无关的故事）',
        tips: [
          '病人是否用漫无边际的谈话作为回答，例如在回答问题时讲述过度冗长的故事。有些患者只是唠叨（健谈）和需更长的时间来回答评估者的问题。过度冗长和无法围绕主题的回答（与问题相关性极小）才能被判定为漫无边际。',
          '一些患者只是唠叨（健谈），他们需要很长的时间来回答评估者的问题。病人的最初回答也许与问题无关，但是如果他所说的故事有关联的话，患者最终会回答问题，这不能判定为不相关联。不关联是指与问题毫无关联的叙述或是变换了主题。例如，评估者在问关于睡眠的问题，病人告诉他的家庭的情况，或者问你是否已经结婚了。',
          '注：要评估这项，病人必须有能力说话（例如，没有昏迷、气管插管）。'
        ]
      },
      {
        question: '15. 患者的谈话是否过于局限或话语极少？（过度简洁或刻板地回答）',
        tips: [
          '局限或话语极少的谈话是指病人不主动发起任何谈话，但是可以回答问题，一般只用是或否进行回答。在病人回答“是”或“不是”之前，评估者可能需要重复问几次问题。在严重的情况下，病人几乎没有任何交谈。'
        ]
      },
      {
        question: '16. 在访视过程中，患者是否难以专注于访视内容？（反复要求评估者重复问题）',
        tips: [
          '如果患者在回答问题之前反复要求评估者重复问题，那这就是患者没有专注。其他的不专注行为如下：a）在谈话过程中，患者根本不听我们在说什么，例如，他在回答一个问题时中途停止注视研究者或者停止回答； b）患者忘了自己正在接受访问。例如，病人开始和其他人说话，不回来继续做评估谈话；C）患者忘了自己在说什么。患者与评估者常常没有目光接触。患者使用同样的答案回答每一个问题，即使这些答案是错误的。'
        ]
      },

      {
        question: '17. 患者是否容易被周围环境刺激吸引？（比如电视、房间外的人、室友谈话）',
        tips: [
          '如果患者很容易被正常刺激分散注意力，则判定为阳性。这些患者通常无法分辨一些具有明显特征的声音或景象。例如，患者因为听到大厅里人们的谈话、流水声、对讲机的声音而暂停回答问题。他特别容易被这些声音分散注意力并且将头转离研究者。如果患者只是被偶发的声音分散注意力，例如门外掉东西或大声讲话，则不能判定阳性。例如，当患者出现注意力转移时，研究者的注意力也被这个声音而转移，则一定不能判定阳性。'
        ]
      },
      {
        question:
          '18. 访视期间患者的意识水平是否有波动？（访视中部分时间里频繁入睡，但部分时间里则完全清醒）',
        tips: [
          '例如：在访视中的一部分时间里患者思维活跃且回答问题，但在其他时间里则昏睡且难以唤醒。'
        ]
      },
      {
        question:
          '19. 访视期间患者的注意力水平是否有波动?（访视中部分时间里注意力很不集中，但部分时间里可以集中注意力。提示：仅根据回答问题时的对错不足以判断此特征阳性）',
        tips: [
          '注：只根据回答问题的正确与不正确不足以判定此特征阳性。',
          '病人在正式测试和非正式测试中是否表现出注意力水平的变化？正式测试（数字倒数、季节倒序、减法运算）：患者在此测试中有出现注意力的改变吗？患者是否能做更复杂的测试而难以完成简单的测试呢？',
          '例如：在访视一部分时间里，患者能够关注问题和对话；在其他时间里，患者无法恰当回答问题。'
        ]
      },
      {
        question:
          '20. 访视期间患者的言语或思维是否有波动？（访视的部分时间语速很慢，然后又很快；或者言语内容部分与访视有关，然后又无关）',
        tips: [
          '例如：在访视的一部分时间里，病人给出清晰的、连贯的回答，而在其他时间里，给出无意义的、不连贯的回答。'
        ]
      }
    ]
  }
]

export const getTemplateAssessTricks = () => [
  '1．当您进门开始观察病人时，评估就开始了，当您的视线离开患者时评估结束。',
  '2. 当接近患者时，首先观察到患者是否对您的靠近有反应。如果没有被看到，则想办法吸引患者的注意力：和患者说话，轻轻触摸，轻晃或轻敲，适当晃动患者唤醒他。',
  '3.语速要慢，发音要清晰，不要加速说话。',
  '4. 在评估行为的干扰因素时，记得要和正常人相比。不要增加任何解释的理由，例如：住院，生病，老年人，刚得到治疗等。',
  '5. 如果患者对访视表现出越来越不耐烦，看起来厌倦回答问题，向患者提供一些积极的信息，并告知患者就只剩一点点问题了。',
  '6. 访视结束后尽快完成评分部分。',
  '7. 在提交前审查每个项目，每个项目都应该有编码。',
  '8. 注意力的评估是检测谵妄的关键。仔细观察患者在非正式和正式测试项目中保持和适当转移注意力的能力。',
  '9. 即使患者未完成问题问卷，观察评分部分也要完成。',
  '10. 即使是关于患者的行为和表现的一点记录，也有助于我们的观察和编码。'
]


export const getTemplateAssessPagesWithAnswersJSON = () => '[{"part":"访视部分","instruction":"定向力","questionGroups":[{"title":"定向力","dialog":"","tips":"","QAs":[{"question":{"i":"1","content":"请告诉我现在是哪一年","answerTips":"2024年","choices":[{"text":"正确","value":true},{"text":"错误","value":false},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"正确","input":"","value":true}},{"question":{"i":"2","content":"请告诉我今天是星期几","answerTips":"星期三","choices":[{"text":"正确","value":true},{"text":"错误","value":false},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"错误","input":"","value":false}},{"question":{"i":"3","content":"请告诉我这是什么地方","answerTips":"答出“医院”即可","choices":[{"text":"正确","value":true},{"text":"错误","value":false},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"正确","input":"","value":true}}]}]},{"part":"访视部分","instruction":"倒数/计算","questionGroups":[{"title":"数字倒序","dialog":"现在我会读出一些数字，请您按照相反的顺序重复我所读出的数字，例如我说6-8，您就说8-6。","tips":"按照每秒1个数字的速度读出，数列最多重复一次。","QAs":[{"question":{"i":"4","content":"倒叙 7-5-1","answerTips":"逆序：1-5-7","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"正确","input":"","value":true}},{"question":{"i":"5","content":"倒叙 8-2-4-3","answerTips":"逆序：3-4-2-8","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"错误","input":"2-4-8-4","value":false,"needInput":true}}]},{"title":"季节倒数","dialog":"请从冬季开始，倒着说出四个季节。","tips":"可以提示：“冬季之前是哪个季节？；只能使用1次提示。注意：可以提示“再之前是哪个季节”，但是不要主动提示“冬/秋/夏季之前是哪个季节？”如果受试者按照正序说出季节，请再次进行说明","QAs":[{"question":{"i":"6A","content":"倒数季节 冬季","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}],"isExtra":false},"answer":{"choice":"正确","input":"","value":true}},{"question":{"i":"6B","content":"倒数季节 秋季","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}],"isExtra":false},"answer":{"choice":"正确","input":"","value":true}},{"question":{"i":"6C","content":"倒数季节 夏季","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}],"isExtra":false},"answer":{"choice":"错误","input":"春","value":false,"needInput":true}},{"question":{"i":"6D","content":"倒数季节 春季","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}],"isExtra":false},"answer":{"choice":"拒绝","input":"","value":false}}]},{"title":"计算","dialog":"下面做一项减法运算，从20开始，每次减去3，请连续计算，直到我说停为止。","tips":"注意：可以提示“再减去3等于多少”，而不要主动提示“17/14/11减去3等于多少？”；当受试者停在X，可以提示“X提减去3等于多少？，但只能提示1次。","QAs":[{"question":{"i":"7A","content":"计算 20-3","answerTips":"17","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"正确","input":"","value":true}},{"question":{"i":"7B","content":"计算 17-3","answerTips":"14","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"不知道/无回答","input":"","value":false}},{"question":{"i":"7C","content":"计算 14-3","answerTips":"11","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"错误","input":"2","value":false,"needInput":true}},{"question":{"i":"7D","content":"计算 11-3","answerTips":"8","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"正确","input":"","value":true}},{"question":{"i":"7E","content":"计算 8-3","answerTips":"5","choices":[{"text":"正确","value":true},{"text":"错误","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"正确","input":"","value":true}}]}]},{"part":"访视部分","instruction":"主诉症状","questionGroups":[{"title":"受试者主诉症状","dialog":"现在我会问几个问题，是关于您过去一天的情况。","tips":"如果受试者在以下任意一项问题中回答“是”或“无意义”，请询问细节（何时发生/具体内容/发生频率）并记录答案。","QAs":[{"question":{"i":"8","content":"在过去的一天里您是否感到困惑（疑惑、糊涂）？","answerTips":"关于基本信息，如定向力、住院原因等，而不是关于医疗和治疗的细节。","choices":[{"text":"否","value":true},{"text":"是","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"无意义","value":false,"needInput":true},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"否","input":"","value":true}},{"question":{"i":"9","content":"在过去的一天里您是否有并不是真的在医院的想法？","answerTips":"刚刚觉醒时的短暂定向障碍不应被计算在内，例如醒后15秒内。","choices":[{"text":"否","value":true},{"text":"是","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"无意义","value":false,"needInput":true},{"text":"不知道/无回答","value":false}]},"answer":{"choice":"否","input":"","value":true}},{"question":{"i":"10","content":"在过去的一天里您是否看见一些实际上并不存在的东西？","answerTips":"例如伸手去拿一个物品却发现它并不存在，或看到可怕/奇怪的物体，或觉得自己身上发生了奇怪的事情。","choices":[{"text":"否","value":true},{"text":"是","value":false,"needInput":true},{"text":"拒绝","value":false},{"text":"无意义","value":false,"needInput":true},{"text":"不知道/无回答","value":false},{"text":"盲人","value":true}]},"answer":{"choice":"否","input":"","value":true}},{"question":{"i":"21","content":"请查询病历或者联系了解受试者情况的家属、朋友或护理人员，了解：在过去24小时，受试者的记忆力或思维是否有急性改变？（如糊涂、幻觉、思维混乱）","choices":[{"text":"否","value":true},{"text":"是","value":false,"needInput":true}],"isExtra":true,"isHide":true},"answer":{"choice":"是","input":"有急性改变","value":false,"needInput":true}}]}]},{"part":"观察部分","instruction":"观察评估","questionGroups":[{"title":"观察评估","tips":"访视部分已结束，下面请完成评估者观察内容并选择相应选项。","choices":[{"text":"否","value":true},{"text":"是","value":false}],"QAs":[{"question":{"i":"11A","content":"受试者在访视期间是否出现困倦？","answerTips":"受试者实际入睡，但是容易唤醒","choices":[{"text":"否","value":true},{"text":"是","value":false}]},"answer":{"choice":"否","input":"","value":true}},{"question":{"i":"11B","content":"受试者在访视期间是否昏睡或昏迷？","answerTips":"难以唤醒","choices":[{"text":"否","value":true},{"text":"是","value":false}]},"answer":{"choice":"否","input":"","value":true}},{"question":{"i":"12","content":"受试者是否表现出过度警觉？","answerTips":"对环境中的普通事物或刺激出现过分强烈的反应、不适当的惊吓等","choices":[{"text":"否","value":true},{"text":"是","value":false}]},"answer":{"choice":"否","input":"","value":true}},{"question":{"i":"13","content":"受试者的思维是否不清晰或没有逻辑？","answerTips":"无意义的语句、无法正确回答问题、矛盾的陈述或思维不可预测地从一个主题转移至另一个主题","choices":[{"text":"否","value":true},{"text":"是","value":false}]},"answer":{"choice":"否","input":"","value":true}},{"question":{"i":"14","content":"受试者的谈话是否漫无边际、过度冗长或者无法围绕主题？","answerTips":"脱离谈话主题或者讲述与访视无关的故事","choices":[{"text":"否","value":true},{"text":"是","value":false}]},"answer":{"choice":"否","input":"","value":true}},{"question":{"i":"15","content":"受试者的谈话是否过于局限或话语极少？","answerTips":"过度简洁或刻板地回答。病人不主动发起任何谈话，但是可以回答问题，一般只用是或否进行回答。","choices":[{"text":"否","value":true},{"text":"是","value":false}]},"answer":{"choice":"是","input":"","value":false}},{"question":{"i":"16","content":"在访视过程中，受试者是否难以记住访视内容？","choices":[{"text":"否","value":true},{"text":"是","value":false}],"answerTips":"反复要求评估者重复问题"},"answer":{"choice":"是","input":"","value":false}},{"question":{"i":"17","content":"受试者是否容易被周围环境刺激吸引？","choices":[{"text":"否","value":true},{"text":"是","value":false}],"answerTips":"比如电视、房间外的人、室友谈话"},"answer":{"choice":"是","input":"","value":false}},{"question":{"i":"18","content":"访视期间受试者的意识水平是否有波动？","answerTips":"访视的部分时间里频繁入睡，但部分时间则完全清醒","choices":[{"text":"否","value":true},{"text":"是","value":false}]},"answer":{"choice":"否","input":"","value":true}},{"question":{"i":"19","content":"访视期间受试者的注意力水平是否有波动?","answerTips":"访视的部分时间注意力很不集中，但部分时间可以集中注意力。提示：仅根据正确回答一些问题，而错误回答另一些问题不足以判断此特征","choices":[{"text":"否","value":true},{"text":"是","value":false}]},"answer":{"choice":"是","input":"","value":false}},{"question":{"i":"20","content":"访视期间受试者的言语或思维在是否有波动？","answerTips":"访视的部分时间语速很慢，然后又很快；或者言语内容部分与访视有关然后又无关","choices":[{"text":"否","value":true},{"text":"是","value":false}]},"answer":{"choice":"否","input":"","value":true}}]}]}]'