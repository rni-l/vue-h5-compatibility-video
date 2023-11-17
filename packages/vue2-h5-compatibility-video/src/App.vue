<template>
  <div id="app" @touchstart="touch" @touchmove="touch">
    <div class="app-header">
      <router-link to="/p1">p1</router-link>
      <router-link to="/p2">p2</router-link>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import { throttle } from "lodash-es";
import { getEmitter } from "vue2-h5-compatibility-video-common";

const touch = throttle(() => getEmitter().emit("docTouch"), 900, {
  trailing: true,
  leading: true,
});
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  padding-top: 30px;
}
.app-header {
  height: 30px;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
}
.app-header a {
  flex: 1;
  line-height: 30px;
  height: 100%;
}
</style>
