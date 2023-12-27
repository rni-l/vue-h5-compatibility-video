<!--
 * @Author: Lu
 * @Date: 2023-11-14 11:20:40
 * @LastEditTime: 2023-12-31 23:07:53
 * @LastEditors: Lu
 * @Description: 
-->
<template>
  <div class="p-p1">
    <div class="video-wrap">
      <!-- <video
        :src="videoUrl"
        autoplay
        muted
        style="width: 100%; height: 300px"
      /> -->
      <!-- <InsideVideo
        :src="videoUrl"
        :poster="poster"
        :height="400"
        :loop="false"
        :autoplay="true"
      /> -->
      <DVideo
        :src="videoUrl"
        :poster="poster"
        :height="400"
        :loop="false"
        :autoplay="true"
      />
      <div class="txt">sdfsdf</div>
    </div>
    <div>
      <div class="item" v-for="v in 30" :key="v">{{ v }}</div>
    </div>
    <div class="video-wrap">
      <!-- <InsideVideo :src="a2" :poster="poster" :height="400" :autoplay="true" /> -->
      <div class="txt">sdfsdf</div>
    </div>
  </div>
</template>

<script>
import flowerMp4 from "../flower.mp4";
import a2 from "../a2.mp4";
import poster from "../14fe13730673ea1a8fb06d77897eaa193d4cc60715d8e-GlLzcK_fw658.jpeg";
import DVideo from "../components/CustomVideo.vue";
export default {
  name: "PageP1",
  components: {
    DVideo,
  },
  data() {
    return {
      poster: poster,
      videoUrl: flowerMp4,
      a2,
    };
  },
  methods: {
    show() {
      console.log(this.$refs);
      this.$refs.refVideo.showFullScreen();
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
