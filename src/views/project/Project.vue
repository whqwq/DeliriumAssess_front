<template>
  <div class="project">
    <Topbar />
    <div class="project-main">
      <div class="project-title">
        <span>{{ project.projectName }}</span
        ><span style="margin-left: 24px">{{ project.projectName }}</span>
      </div>
      <div class="project-description">{{ project.description }}</div>
    </div>
    <div class="project-main">
      <PatientList :projectId="project.projectId" />
    </div>
  </div>
</template>

<script setup>
import HTTPAPI from '@/utils/http/api.js'
import PatientList from './PatientList.vue'
import Topbar from '@/components/system/Topbar.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const project = ref({
  projectId: route.query.projectId,
  projectName: '',
  description: ''
})
const getProjectInfo = () => {
  HTTPAPI.getProjectInfo({ projectId: route.query.projectId }).then((res) => {
    if (res.status !== 0) return
    project.value = res.data.project
  })
}
onMounted(() => {
  getProjectInfo()
})
</script>

<style scoped lang="less">
@title-font-size: 20px;
@description-font-size: 14px;
.project {
  padding: 32px;
}
.project-title {
  width: 100%;
  line-height: @title-font-size;
  font-size: @title-font-size;
}
.project-description {
  width: 100%;
  font-size: @description-font-size;
  line-height: 1.5;
  color: #666;
  margin-top: 16px;
}
.project-main {
  margin-bottom: 32px;
  background-color: white;
  padding: 16px 32px;
  border-radius: 4px;
}
</style>
