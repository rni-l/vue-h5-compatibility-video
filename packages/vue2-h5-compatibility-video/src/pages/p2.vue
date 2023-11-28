<!--
 * @Author: Lu
 * @Date: 2023-11-14 11:21:22
 * @LastEditTime: 2023-11-24 16:45:09
 * @LastEditors: Lu
 * @Description: 
-->
<template>
  <div class="p-p2" ref="refRoot">
    <div @click="show">全屏1</div>
    <div class="item" v-for="v in 15" :key="v">{{ v }}</div>
    <div class="video-wrap">
      <fullscreen-video
        ref="refVideo"
        :src="videoUrl"
        :poster="poster"
        :autoplay="false"
        :height="500"
      />
      <div class="txt">sdfsdf</div>
    </div>
    <div class="video-wrap">
      <!-- <fullscreen-video
        ref="refVideo2"
        :src="a2"
        :poster="poster"
        :autoplay="false"
        :height="500"
      /> -->
      <div class="txt">sdfsdf</div>
    </div>

    <div @click="show2">全屏2</div>
    <div class="item" v-for="v in 30" :key="`i_${v}`">{{ v }}</div>
  </div>
</template>

<script>
import flowerMp4 from "../flower.mp4";
import a2 from "../a2.mp4";
import poster from "../14fe13730673ea1a8fb06d77897eaa193d4cc60715d8e-GlLzcK_fw658.jpeg";
export default {
  name: "PageP2",
  data() {
    return {
      poster: poster,
      videoUrl: flowerMp4,
      a2,
    };
  },
  methods: {
    show() {
      this.$refs.refVideo.showFullScreen();
    },
    show2() {
      this.$refs.refVideo2.showFullScreen();
    },
  },
};
</script>
<style scoped>
.video-wrap {
  position: relative;
  padding: 0 36px;
}

.txt {
  color: #333;
  background-color: #fff;
  padding: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
