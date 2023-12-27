<!--
 * @Author: Lu
 * @Date: 2023-12-11 11:06:51
 * @LastEditTime: 2024-01-01 00:55:50
 * @LastEditors: Lu
 * @Description: 
-->
<template>
  <div class="p-p4">
    <div class="btn" @click="showVideo">show2</div>
    <div class="btn" @click="toother">to other</div>
    <!-- <video
      :src="videoUrl"
      ref="refFullScreenVideo"
      :controls="false"
      muted
      style="width: 100%; height: 300px; object-fit: contain"
    /> -->
    <!-- <d-video
      ref="refFullScreenVideo"
      :src="videoUrl"
      :playsinline="false"
      orientation="landscape"
      :is-use-adapt="false"
      :hide-container="true"
      :muted="false"
      class="contain-video"
      :height="300"
      :autoplay="false"
      :only-full-screen="true"
    /> -->
    <div class="space"></div>
    <fullscreen-video
      ref="refFullScreenVideo"
      :src="videoUrl"
      @fullscreenHide="hide"
    />
  </div>
</template>

<script>
export default { name: "PageP4" };
</script>
<script setup>
import { ref } from "vue";
// import FullScreenVideo from "../components/FullScreenVideo.vue";
import DVideo from "../components/CustomVideo.vue";
import { getBus } from "../utils";
import { videoTest } from "../constants";
const refFullScreenVideo = ref();
const videoUrl = ref(videoTest);
const showVideo = () => {
  // getBus().$emit("stop");
  // console.log(
  //   "refFullScreenVideo.value.showFullScreen",
  //   refFullScreenVideo.value.showFullScreen
  // );
  refFullScreenVideo.value.showFullScreen();
  // const v = refFullScreenVideo.value;
  // console.log(
  //   "showVideo",
  //   v,
  //   v.webkitDisplayingFullscreen,
  //   v.webkitSupportsFullscreen
  // );
  // refFullScreenVideo.value.play();
  // setTimeout(() => {
  //   refFullScreenVideo.value.webkitEnterFullscreen();
  // }, 900);
  // setTimeout(() => {
  //   console.log(
  //     "showVideo",
  //     v,
  //     v.webkitDisplayingFullscreen,
  //     v.webkitSupportsFullscreen
  //   );
  //   // v.play();
  // }, 1000);
};
const hide = () => {
  console.log("hidde");
  getBus().$emit("cancelStop");
};

const toother = () => {
  window.location.href = ``;
};
</script>

<style lang="scss" scoped>
.p-p4 {
  padding: 120px 0 0;
  .space {
    height: 600px;
    width: 100%;
  }
  .btn {
    font-size: 20px;
    color: #fff;
    border-width: 2px;
    border-color: rgb(255, 255, 255);
    border-style: solid;
    background-color: rgb(0, 0, 0);
    width: 205px;
    height: 53px;
    margin-top: 60px;
    margin: 0 auto 0;
  }
}
</style>
