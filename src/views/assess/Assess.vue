<template>
  <div class="assess-page">
    <Assess3DCAM v-if="assessType='3D-CAM'" />
  </div>
</template>

<script setup>
import Assess3DCAM from './3DCAM/Assess3DCAM.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const assessType = route.query.assessType
</script>

<style scoped lang="less">
.inner-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
