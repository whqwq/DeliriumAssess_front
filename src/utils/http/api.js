import { post } from '@/utils/http/http.js'

const getAllUsers = (data) => post('/user/getAllUsers', data)

const login = (data) => post('/user/login', data)

const changePassword = (data) => post('/user/changePassword', data)

const resetPassword = (data) => post('/user/resetPassword', data)

const changeUserInfo = (data) => post('/user/changeUserInfo', data)

const deleteUser = (data) => post('/user/deleteUser', data)

const createUser = (data) => post('/user/createUser', data)

const getAllProjects = (data) => post('/project/getAllProjects', data)

const getProjectInfo = (data) => post('/project/getProjectInfo', data)

const createProject = (data) => post('/project/createProject', data)

const changeProjectInfo = (data) => post('/project/changeProjectInfo', data)

const deleteProject = (data) => post('/project/deleteProject', data)

const getProjectMembers = (data) => post('/project/getProjectMembers', data)

const deleteProjectMember = (data) => post('/project/deleteProjectMember', data)

const addProjectMember = (data) => post('/project/addProjectMember', data)

const getProjectPatients = (data) => post('/patient/getProjectPatients', data)

const addPatient = (data) => post('/patient/addPatient', data)

const deletePatient = (data) => post('/patient/deletePatient', data)

const getPatientDetails = (data) => post('/patient/getPatientDetails', data)

const getAssess = (data) => post('/assess/getAssess', data)

const getAssessRecordDetails = (data) => post('/assess/getAssessRecordDetails', data)

const submitAssess = (data) => post('/assess/submitAssess', data)

const changeAssessRecord = (data) => post('/assess/changeAssessRecord', data)

export default {
  getAllUsers,
  login,
  changePassword,
  resetPassword,
  changeUserInfo,
  deleteUser,
  createUser,
  getAllProjects,
  getProjectInfo,
  createProject,
  changeProjectInfo,
  deleteProject,
  getProjectMembers,
  deleteProjectMember,
  addProjectMember,
  getProjectPatients,
  addPatient,
  deletePatient,
  getPatientDetails,
  getAssess,
  getAssessRecordDetails,
  submitAssess,
  changeAssessRecord
}