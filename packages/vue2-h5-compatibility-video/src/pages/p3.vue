<!--
 * @Author: Lu
 * @Date: 2023-11-27 17:37:03
 * @LastEditTime: 2024-01-02 00:18:43
 * @LastEditors: Lu
 * @Description: 
-->
<template>
  <div class="p-p3">
    <div class="top">
      <!-- <custom-img :src="imgAboutBg" class="bg" /> -->
      <img
        src="https://cdn3-banquan.ituchong.com/weili/image/ml/1466201916813344786.webp"
        class="bg"
      />
      <div class="t0">{{ t0 }}</div>
    </div>

    <div class="t1">{{ t2 }}</div>
    <div class="wrap">
      <div class="t2">{{ t1 }}</div>
      <div class="t3">{{ t3 }}</div>
      <div class="t4" @click="go">{{ t4 }}</div>
    </div>
    <fullscreen-video
      ref="refVideo"
      :src="videoUrl"
      :poster="poster"
      :autoplay="false"
      :height="250"
      :muted="false"
    />

    <div class="t1">{{ t2 }}</div>
    <div class="wrap">
      <div class="t2">{{ t1 }}</div>
      <div class="t3">{{ t3 }}</div>
    </div>

    <div class="t1">{{ t2 }}</div>
    <div class="wrap">
      <div class="t2">{{ t1 }}</div>
      <div class="t3">{{ t3 }}</div>
    </div>

    <div class="t1">{{ t2 }}</div>
    <div class="wrap">
      <div class="t2">{{ t1 }}</div>
      <div class="t3">{{ t3 }}</div>
    </div>
  </div>
</template>

<script>
import flowerMp4 from "../flower.mp4";
import oceansMp4 from "../oceans.mp4";
import poster from "../14fe13730673ea1a8fb06d77897eaa193d4cc60715d8e-GlLzcK_fw658.jpeg";
export default {
  name: "PageP3",

  data() {
    return {
      poster,
      // videoUrl: flowerMp4,
      videoUrl: oceansMp4,
      t0: "4Deeersdf",
      t1: "Deeer",
      t2: "Dee",
      t3: "sdfsdfxzcvzxcvassa df asd fasd fsd fsd f",
      t4: " sdfqwe e asd sfqwe ew ",
    };
  },

  methods: {
    go() {
      this.$refs.refVideo.showFullScreen();
    },
  },
};
</script>

<style lang="scss" scoped>
.p-p3 {
  position: relative;
  $font-space: 12px;
  padding-bottom: 80px;

  .top {
    position: relative;
    .t0 {
      font-size: 54px;
      line-height: 64px;
      color: #fff;
      position: absolute;
      left: 80px;
      bottom: 180px;
    }
  }

  .t1 {
    position: absolute;
    top: 1022px;
    left: 24px;
    color: #fff;
    font-size: 130px;
    line-height: 1;
  }

  .bg {
    width: 100%;
    object-fit: cover;
  }

  .wrap {
    // padding: 32px - $font-space 0 0 174px;
    padding: 32px 0;
  }

  .t2 {
    font-size: 130px;
    color: #000000;
    line-height: 1;
  }

  .t3 {
    font-size: 36px;
    color: #000000;
    line-height: 52px;
  }

  .t4 {
    font-size: 20px;
    color: rgba(#000000, 0.7);
    line-height: 44px;
    hyphens: auto;
    text-align: justify;
  }

  .poster {
    width: 690px;
    margin: 0 auto;
    object-fit: cover;
  }

  .bottom-wrap {
    display: flex;
    align-items: center;
  }

  .t5 {
    font-size: 36px;
    color: #000000;
    line-height: 1;
    margin-right: 38px;
  }

  .more {
    width: 34px;
    height: 24px;
  }
}
</style>
