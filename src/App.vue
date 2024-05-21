<template>
  <RouterView />
  <Loading v-show="commonStore.loading" />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Loading from '@/components/system/Loading.vue'
import { throttle } from 'lodash'
import { useCommonStore } from '@/stores/common.js'

const commonStore = useCommonStore()

const getPageSize = throttle(commonStore.updatePageSize, 1000, { isTrailing: true })
getPageSize()
window.addEventListener('resize', getPageSize)
</script>

<style>
* {
  /* font-size: 18px; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  margin: 0;
  box-sizing: border-box;
}
:root {
  --mobile-width: 830px;
  --topbar-height: 56px;
}
#app {
  margin: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: #f3f4f8;
  /* position: absolute;
  top: 0;
  left: 0;
  height: 100%; */
}
::-webkit-scrollbar {
  width: 0px;
  height: 7px;
}
::-webkit-scrollbar-thumb {
  background: #ababab;
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: padding-box;
  -webkit-transition: all 0.25s;
}
::-webkit-scrollbar-thumb:hover {
  border: 0;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
