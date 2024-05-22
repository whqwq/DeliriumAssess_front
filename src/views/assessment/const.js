import { getTemplateQAs } from '@/views/assess/3DCAM/const.js'

export const getFakeRecord = () => ({
  recordId: '',
  isRecent: true,
  patient: {
    id: 1,
    idInProejct: '001W',
    alpha: 'W'
  },
  assessor: {
    name: '王医生',
    phone: '15161656577'
  },
  assessTime: '2024-05-22 13:20',
  editTime: '2024-05-22 22:46',
  editor: {
    name: '王医生',
    phone: '15161656577'
  },
  assessType: '3D-CAM',
  assessResults: [
    { feature: 1, positive: true },
    { feature: 2, positive: true },
    { feature: 3, positive: false },
    { feature: 4, positive: true }
  ]
})

export const featureDescriptionMap = {
  1: '急性起病且病情呈现波动性',
  2: '注意力不能集中',
  3: '思维紊乱',
  4: '意识水平改变'
}

export const getFakeRecordDetails = () => ({ ...getFakeRecord(), QAs: getTemplateQAs() })
