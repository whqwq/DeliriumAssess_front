<template>
  <div class="project">
    <Topbar />
    <div class="project-main">
      <div class="project-title">
        <span>{{ project.id }}</span
        ><span style="margin-left: 24px">{{ project.name }}</span>
      </div>
      <div class="project-description">{{ project.description }}</div>
    </div>
    <div class="project-main">
      <PatientList :project="project" />
    </div>
  </div>
</template>

<script setup>
import PatientList from './PatientList.vue'
import Topbar from '@/components/system/Topbar.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const project = ref({
  id: route.query.projectId,
  name: '项目A',
  description:
    '这是XXX医院的XXX项目，编号为XXX，项目内容为ABCDEFGHIJKLMN，持续时间为XXXX-XXXX，预期达到XXXXX等效果'
})
</script>

<style scoped lang="less">
@title-font-size: 20px;
@description-font-size: 14px;
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
  margin: 32px;
  background-color: white;
  padding: 16px 32px;
  border-radius: 4px;
}
</style>
