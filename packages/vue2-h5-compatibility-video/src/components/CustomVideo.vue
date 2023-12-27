<!--
 * @Author: Lu
 * @Date: 2023-12-11 11:02:50
 * @LastEditTime: 2023-12-11 17:40:41
 * @LastEditors: Lu
 * @Description: 
-->
<template>
  <div
    :class="{
      'c-customVideo': true,
      fullscreen: isInlineFullScreen,
      hide: hideContainer || insideFullScreen,
    }"
    :style="{
      height: `${height}px`,
    }"
  >
    <div
      v-if="isInlineFullScreen"
      class="c-customVideo-close"
      @click="closeFullScreen"
    >
      关闭
    </div>
    <div
      :class="{ 'c-customVideo-wrap': true, fullscreen: isInlineFullScreen }"
      :style="{
        height: `${height}px`,
      }"
    >
      <img
        v-if="!src || (isHideVideo && isUseAdapt)"
        :src="poster"
        class="c-customVideo-img"
      />
      <video
        v-else
        ref="refVideo"
        :class="{
          'c-customVideo-media': true,
          hide: hideVideo,
        }"
        :poster="poster"
        :muted="muted"
        preload
        loop
        :autoplay="autoplay"
        :controls="controls"
        x5-video-player-type="h5"
        :x5-video-player-fullscreen="onlyFullScreen"
        :x5-playsinline="playsinline"
        :x-video-orientation="orientation"
        :playsinline="playsinline"
        :webkit-playsinline="playsinline"
        :x-webkit-airplay="true"
        @canplay="handleCanPlay"
        @ended="handleVideoEnded"
        @touchstart="touch"
        @touchend="touch"
        @error="handleError"
      >
        <source :src="src" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
import { throttle } from "lodash-es";
import {
  getBrowserInfo,
  checkIsHideVideo,
  checkIsBaiduBrowser,
  getBus,
} from "../utils";
const Toast = () => {};

const isVideoPlaying = (video) =>
  !!(
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2
  );

export default {
  name: "CustomVideo",

  props: {
    lazy: {
      default: false,
      type: Boolean,
    },
    src: {
      default: "",
      type: String,
    },
    height: {
      default: 100,
      type: Number,
    },
    videoKey: {
      default: "",
      type: String,
    },
    poster: {
      default: "",
      type: String,
    },
    autoplay: {
      default: true,
      type: Boolean,
    },
    playsinline: {
      // 是否会内联
      default: true,
      type: Boolean,
    },
    onlyFullScreen: {
      default: false,
      type: Boolean,
    },
    orientation: {
      default: "",
      type: String,
    },
    isUseAdapt: {
      default: true,
      type: Boolean,
    },
    hideContainer: {
      default: false,
      type: Boolean,
    },
    hideVideo: {
      default: false,
      type: Boolean,
    },
    muted: {
      default: true,
      type: Boolean,
    },
    insideFullScreen: {
      default: false,
      type: Boolean,
    },
    controls: {
      default: false,
      type: Boolean,
    },
    isListenStop: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      isCanPlay: false,
      isTouchedVideo: false,
      played: false,
      isAndroidWechat: false,
      isIosWechat: false,
      isLoadJDK: false,
      isHideVideo: false,
      isInlineFullScreen: false, // 是否在使用内置的全屏
      isIos: false,
      isBaidu: false,
      browserInfo: {},
      bindCancelFullScreen: () => {},
      bindCancelWebkitFullScreen: () => {},
      bindTouch: () => {},
      checkFullScreenPlayNumber: 0,
      isTriggerListenStop: false,
      checkFullScreenPlayTimer: null,
    };
  },

  computed: {
    isHaveVideo() {
      return this.src;
    },
  },

  created() {
    this.isHideVideo = checkIsHideVideo();
  },

  mounted() {
    this.isIos = this.browserInfo.isIphone;
    this.isBaidu = checkIsBaiduBrowser();
    this.bindTouch = throttle(this.touch.bind(this), 300, { tailing: true });
    this.bindCancelFullScreen = this.cancelFullScreen.bind(this);
    this.bindCancelWebkitFullScreen = this.cancelWebkitFullScreen.bind(this);
    getBus().$on("docTouch", () => {
      if (this.isTriggerListenStop) return;
      this.bindTouch();
    });
    if (this.isListenStop) {
      getBus().$on("stop", () => {
        console.log("stop");
        this.pause();
        this.isTriggerListenStop = true;
      });
      getBus().$on("cancelStop", () => {
        console.log("cancelStop");
        this.isTriggerListenStop = false;
        this.touch();
      });
    }
    const browserInfo = getBrowserInfo();
    if (browserInfo.isWeixin && browserInfo.isAndroid) {
      console.log("安卓微信环境");
      this.isAndroidWechat = true;
    }
    if (browserInfo.isWeixin && browserInfo.isIphone) {
      console.log("ios微信环境");
      this.isIosWechat = true;
    }
    document.addEventListener(
      "WeixinJSBridgeReady",
      () => {
        console.log("WeixinJSBridgeReady");
        this.isLoadJDK = true;
        if (!this.autoplay) return;
        if (this.isIosWechat) {
          this.play();
        }
      },
      false
    );
  },

  methods: {
    checkPlay() {
      setTimeout(() => {
        this.played = isVideoPlaying(this.$refs.refVideo);
        console.log("check play", this.src, this.played);
      }, 500);
    },
    play() {
      console.log("will play video", this.played, this.src);
      if (this.played || !this.isHaveVideo) return;
      try {
        this.$refs.refVideo.play();
        this.played = true;
        this.checkPlay();
        console.log("play video success", this.src);
      } catch (error) {
        this.isTouchedVideo = false;
        console.log("video play error", error);
        console.log(error);
      }
    },
    handleCanPlay() {
      if (this.isCanPlay) return;
      this.isCanPlay = true;
      console.log("custom handleCanPlay", this.src);
      // this.$root.$emit('canplay', this.videoKey, this.$refs.refVideo)
      // this.$emit('canplay', this.$refs.refVideo)
    },
    handleVideoEnded() {
      console.log("custom handleVideoEnded");
      this.$root.$emit("end", this.videoKey);
      this.$emit("end");
    },

    touch() {
      const stopNext =
        this.onlyFullScreen || (this.isHideVideo && this.isUseAdapt);
      console.log(
        "touch sdf",
        "stopNext",
        stopNext,
        "isCanPlay",
        this.isCanPlay,
        "played",
        this.played
      );
      if (stopNext) {
        // this.showFullScreen()
        return;
      }
      if (!this.isCanPlay) return;
      if (this.played) return;
      this.isTouchedVideo = true;
      // 如果是安卓微信，需要重新播放
      if (this.isAndroidWechat) {
        this.played = false;
      }
      this.play();
    },
    handleError(e) {
      console.log("video error");
      console.log(e);
    },
    pause() {
      try {
        console.log("this.$refs.refVideo", this.$refs.refVideo);
        this.$refs.refVideo && this.$refs.refVideo.pause();
        clearTimeout(this.checkFullScreenPlayTimer);
        console.log("stop success");
      } catch (e) {
        console.log("pause error", e);
      }
    },
    removeExitFullScreenEvent(e) {
      if (document.fullscreenElement) {
        console.log(
          `Element: ${document.fullscreenElement.id} entered fullscreen mode.`
        );
        return;
      } else {
        console.log("Leaving fullscreen mode.");
      }
      this.pause();
      document.removeEventListener(
        "fullscreenchange",
        this.bindCancelFullScreen
      );
      window.removeEventListener("resize", this.bindCancelWebkitFullScreen);
      this.$emit("fullscreenHide");
    },
    cancelFullScreen(e) {
      console.log("cancelFullScreen", e);
      this.removeExitFullScreenEvent(e);
    },
    cancelWebkitFullScreen(e) {
      console.log("cancelWebkitFullScreen", e);
      this.removeExitFullScreenEvent(e);
    },
    cancelX5FullScreen() {
      console.log("cancelX5FullScreen", this);
      this.pause();
      window.removeEventListener(
        "x5videoexitfullscreen",
        this.bindCancelWebkitFullScreen
      );
      this.$emit("fullscreenHide");
    },
    showCannotPlayVideo() {
      Toast(this.$t("cannotPlayVideo"));
    },

    addExitFullScreenEvent() {
      document.addEventListener("fullscreenchange", this.bindCancelFullScreen);
      window.addEventListener("resize", this.bindCancelWebkitFullScreen);
    },
    async useFullScreen(video) {
      if (video.requestFullscreen) {
        // 最新标准
        try {
          console.log("useFullScreen");
          video.requestFullscreen();
          this.addExitFullScreenEvent();
          return true;
        } catch (e) {
          console.log(e);
          this.showCannotPlayVideo();
          return false;
        }
      }
      return false;
    },
    async useWebkitFullScreen(video) {
      if (video.webkitRequestFullscreen) {
        try {
          console.log("useWebkitFullScreen");
          video.webkitRequestFullscreen();
          this.addExitFullScreenEvent();
          return true;
        } catch (e) {
          console.log(e);
          console.log(e.message);
          this.showCannotPlayVideo();
          return false;
        }
      }
      return false;
    },
    async useEnterFullScreen(video) {
      if (video.webkitEnterFullscreen) {
        try {
          console.log("webkitEnterFullscreen");
          video.webkitEnterFullscreen();
          this.addExitFullScreenEvent();
          return true;
        } catch (e) {
          console.log(e);
          console.log(e.message);
          this.showCannotPlayVideo();
          return false;
        }
      }
      return false;
    },
    async executeFullScreen(video) {
      const task = [
        this.useFullScreen,
        this.useWebkitFullScreen,
        this.useEnterFullScreen,
      ];
      let isOk = false;
      while (task.length) {
        const t = task.shift();
        const ok = await t(video);
        if (ok) {
          isOk = true;
          break;
        }
      }
      if (!isOk) {
        console.log("all fail");
        this.showCannotPlayVideo();
      }
      return isOk;
    },
    async showFullScreen() {
      if (!this.isHaveVideo) return;
      this.checkFullScreenPlayNumber = 0;
      const video = this.$refs.refVideo;
      console.log("click showFullScreen", !!video);
      if (!video) {
        this.showCannotPlayVideo();
        return;
      }
      if (this.insideFullScreen) {
        this.isInlineFullScreen = true;
        try {
          video.play();
        } catch (e) {
          console.log("e", e);
        }
        console.log("video play");
        return;
      }
      console.log(
        video.requestFullscreen,
        video.webkitRequestFullscreen,
        video.webkitEnterFullscreen
      );
      const next = await this.executeFullScreen(video);
      if (next) {
        console.log("next");
        video.play();
        this.checkFullScreenPlay();
      }
    },
    checkFullScreenPlay() {
      clearTimeout(this.checkFullScreenPlayTimer);
      this.checkFullScreenPlayTimer = setTimeout(() => {
        const video = this.$refs.refVideo;
        console.log("checkFullScreenPlay", isVideoPlaying(video));
        if (isVideoPlaying(video)) return;
        video.play();
        if (this.checkFullScreenPlayNumber > 2) return;
        this.checkFullScreenPlay();
      }, 1000);
    },
    closeFullScreen() {
      console.log("closeFullScreen");
      this.pause();
      document.removeEventListener(
        "fullscreenchange",
        this.bindCancelFullScreen
      );
      window.removeEventListener("resize", this.bindCancelWebkitFullScreen);
      this.isInlineFullScreen = false;
      this.$emit("fullscreenHide");
    },
  },
};
</script>

<style lang="scss" scoped>
.c-customVideo {
  position: relative;
  overflow: hidden;
  width: 100%;
  transform: translate3d(0, 0, 0);
  $size: 40px;
  $space: 60px;
  $top: 20px;
  $left: 20px;

  &.hide {
    transform: translateX(-20000px);
    position: absolute;
    object-fit: contain;
    top: -20000px;
  }

  &.fullscreen {
    position: fixed;
    width: 100vw;
    height: 100vh !important;
    background: #000;
    box-sizing: border-box;
    transform: translate3d(0, 0, 0);
    top: 0;
    left: 0;
    z-index: 99999;
  }

  &-wrap {
    &.fullscreen {
      position: absolute;
      // width: calc(100vw - #{$size} - #{$space} - #{$left});
      width: 100vw;
      height: calc(100vh - #{$size} - #{$space} - #{$top}) !important;
      background: #000;
      box-sizing: border-box;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      .c-customVideo-media {
        opacity: 1;
        display: block;
        opacity: 1;
        transform: translate(0, 0);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  &-media {
    display: block;
    width: 100%;
    border: 0;
    outline: 0;
    object-fit: cover;
    object-position: center center;
    // @include f-absoluteCenter;
    height: 100%;
    user-select: none;

    &.hide {
      opacity: 0;
      transform: translate(99999px, 99999px);
      display: none;
      top: 999999px;
      // width: 1px;
      // height: 0px;
    }
  }

  &-img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center center;
  }

  &-close {
    position: absolute;
    top: $top;
    right: $left;
    color: red;
    width: calc($size * 0.8);
    height: calc($size * 0.8);
    z-index: 10;
    transform: translate3d(0);
  }

  .c-customVideo {
    &.hide {
      opacity: 0;
    }
  }
}
</style>
