<template>
  <div class="loading-layer">
    <div class="loading"></div>
  </div>
</template>

<style>
.loading-layer {
  z-index: 1;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
}
.loading {
  display: block;
  position: relative;
  width: 6px;
  height: 10px;
  animation: rectangle infinite 1s ease-in-out -0.2s;
  background-color: #000;
}

.loading:before,
.loading:after {
  position: absolute;
  width: 6px;
  height: 10px;
  content: "";
  background-color: #000;
}

.loading:before {
  left: -14px;
  animation: rectangle infinite 1s ease-in-out -0.4s;
}

.loading:after {
  right: -14px;
  animation: rectangle infinite 1s ease-in-out;
}

@keyframes rectangle {
  0%,
  80%,
  100% {
    height: 20px;
    box-shadow: 0 0 #000;
  }
  40% {
    height: 30px;
    box-shadow: 0 -20px #000;
  }
}
</style>
