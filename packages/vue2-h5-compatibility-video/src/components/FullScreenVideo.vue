<!--
 * @Author: Lu
 * @Date: 2023-12-11 11:07:25
 * @LastEditTime: 2023-12-11 17:45:15
 * @LastEditors: Lu
 * @Description: 
-->
<template>
  <div class="c-fullScreen-Video">
    <div class="c-aboutVideo-top">
      <!-- <custom-img :src="imgAboutBg" class="bg" /> -->
      <custom-video
        v-if="isBaidu"
        :src="videoUrl"
        :height="0"
        class="hide-video"
        :muted="false"
      />
      <video :src="videoUrl" class="ddd" />
    </div>
    <custom-video
      v-if="isIos && isWeixin"
      ref="refVideo"
      class="video2 contain-video"
      :playsinline="false"
      orientation="landscape"
      :is-use-adapt="false"
      :hide-container="true"
      :hide-video="false"
      :muted="false"
      :controls="false"
      :src="videoUrl"
      :height="height"
      :autoplay="false"
      :only-full-screen="false"
      @fullscreenHide="fullscreenHide"
    />
    <custom-video
      v-if="!isHideVideo && !(isIos && isWeixin) && !isUC"
      ref="refVideo"
      :playsinline="false"
      orientation="landscape"
      :is-use-adapt="false"
      :hide-container="true"
      :muted="false"
      class="contain-video"
      :height="height"
      :src="videoUrl"
      :autoplay="false"
      :only-full-screen="true"
      @fullscreenHide="fullscreenHide"
    />
    <custom-video
      v-if="isBaidu"
      ref="refVideo"
      :playsinline="false"
      orientation="landscape"
      :is-use-adapt="false"
      :hide-container="true"
      :hide-video="isIos ? false : true"
      :muted="false"
      :autoplay="false"
      :only-full-screen="true"
      :src="videoUrl"
      class="contain-video translate"
      :height="height"
      @fullscreenHide="fullscreenHide"
    />
    <custom-video
      v-if="isQuark || isUC"
      ref="refVideo"
      :playsinline="true"
      orientation="landscape"
      :is-use-adapt="false"
      :hide-container="true"
      :hide-video="true"
      :muted="false"
      :autoplay="false"
      :only-full-screen="false"
      :inside-full-screen="true"
      :src="videoUrl"
      :height="height"
      :controls="false"
      class="contain-video"
      @fullscreenHide="fullscreenHide"
    />
  </div>
</template>

<script>
import CustomVideo from "./CustomVideo.vue";
import {
  checkIsHideVideo,
  checkIsBaiduBrowser,
  checkIsQuarkBrowser,
  checkIsUCBrowser,
  getBrowserInfo,
} from "../utils";
import { videoTest } from "../constants";
export default {
  name: "FullScreenVideo",

  components: {
    CustomVideo,
  },

  data() {
    return {
      videoUrl: videoTest,
      isHideVideo: false,
      isIos: false,
      isBaidu: false,
      isQuark: false,
      isWeixin: false,
      isUC: false,
      height: 768,
    };
  },

  mounted() {
    const browserInfo = getBrowserInfo();
    console.log(browserInfo);
    this.isWeixin = browserInfo.isWeixin;
    this.isIos = browserInfo.isIphone || browserInfo.isIpad;
    this.isBaidu = checkIsBaiduBrowser();
    this.isQuark = checkIsQuarkBrowser();
    this.isHideVideo = checkIsHideVideo();
    this.isUC = checkIsUCBrowser();
  },

  methods: {
    showFullScreen() {
      this.$refs.refVideo.showFullScreen();
    },

    fullscreenHide() {
      console.log("fullscreenHide");
      this.$emit("fullscreenHide");
    },
  },
};
</script>

<style lang="scss" scoped>
.c-fullScreen-Video {
  position: relative;
  .ddd {
    position: absolute;
    top: -9999px;
    opacity: 0;
    display: none;
  }

  .video2 {
    width: 100%;
    object-fit: contain;
    height: 448px !important;
    object-position: center center;
    :deep(.c-customVideo-wrap) {
      height: 448px !important;
    }
  }

  .contain-video {
    object-fit: contain;
    :deep(.c-customVideo-media) {
      object-fit: contain;
    }
  }
  .hide-video {
    width: 100%;
  }
}
</style>
