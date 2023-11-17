<!--
 * @Author: Lu
 * @Date: 2023-11-09 16:26:06
 * @LastEditTime: 2023-11-17 11:00:02
 * @LastEditors: Lu
 * @Description: 
-->
<script setup lang="ts">
import { ref, computed, onMounted, defineExpose } from "vue";
import type { PropType } from "vue";
import { throttle } from "lodash-es";
import { getBrowserInfo, getEmitter, log } from "common";
import type { IScheduleParams, TWrapperVideoElement } from "common";
const props = defineProps({
  hide: {
    type: Boolean as PropType<IScheduleParams["hide"]>,
  },
  muted: {
    type: Boolean as PropType<IScheduleParams["muted"]>,
  },
  playsinline: {
    type: Boolean as PropType<IScheduleParams["playsinline"]>,
  },
  autoplay: {
    type: Boolean as PropType<IScheduleParams["autoplay"]>,
  },
  loop: {
    type: Boolean as PropType<IScheduleParams["loop"]>,
  },
  hideVideo: {
    type: Boolean as PropType<IScheduleParams["hideVideo"]>,
  },
  preload: {
    type: String as PropType<IScheduleParams["preload"]>,
  },
  controls: {
    type: Boolean as PropType<IScheduleParams["controls"]>,
  },
  x5VideoPlayerType: {
    type: String as PropType<IScheduleParams["x5VideoPlayerType"]>,
  },
  x5VideoPlayerFullscreen: {
    type: Boolean as PropType<IScheduleParams["x5VideoPlayerFullscreen"]>,
  },
  orientation: {
    type: String as PropType<IScheduleParams["orientation"]>,
  },
  hideContainer: {
    type: Boolean as PropType<IScheduleParams["hideContainer"]>,
  },
  isCanvas: {
    type: Boolean as PropType<IScheduleParams["isCanvas"]>,
  },
  insideFullscreen: {
    type: Boolean as PropType<IScheduleParams["insideFullscreen"]>,
  },
  showPoster: {
    type: Boolean as PropType<IScheduleParams["showPoster"]>,
  },
  src: {
    default: "",
    type: String as PropType<IScheduleParams["src"]>,
  },
  height: {
    default: 100,
    type: Number as PropType<IScheduleParams["height"]>,
  },
  poster: {
    default: "",
    type: String as PropType<IScheduleParams["poster"]>,
  },
});

const emit = defineEmits(["fullscreenHide", "end"]);

const isCanPlay = ref(false);
const isTouchedVideo = ref(false);
const played = ref(false);
const isAndroidWechat = ref(false);
const isIosWechat = ref(false);
const isLoadJDK = ref(false);
const isInlineFullScreen = ref(false);
const isIos = ref(false);
const bindCancelFullScreen = ref(() => {});
const bindCancelWebkitFullScreen = ref(() => {});
const bindTouch = ref(() => {});
const checkFullScreenPlayNumber = ref(0);

const refVideo = ref();
const refCanvas = ref();

const isHaveVideo = computed(() => {
  return !!props.src;
});

const isVideoPlaying = (video: HTMLVideoElement) =>
  !!(
    video &&
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2
  );
const checkPlay = () => {
  played.value = isVideoPlaying(refVideo.value);
  log("check play", props.src, played.value);
  setTimeout(() => {
    played.value = isVideoPlaying(refVideo.value);
    log("check play", props.src, played.value);
  }, 500);
};
const play = () => {
  log("will play video", played.value, props.src);
  if (played.value || !isHaveVideo.value) return;
  try {
    refVideo.value?.play();
    played.value = true;
    checkPlay();
    log("play video success", props.src);
  } catch (error) {
    isTouchedVideo.value = false;
    log("video play error", error);
    log(error);
  }
};
const handleCanPlay = () => {
  if (isCanPlay.value) return;
  isCanPlay.value = true;
  log("custom handleCanPlay", props.src);
  // $emit('canplay', $refs.refVideo)
};
const handleVideoEnded = () => {
  log("custom handleVideoEnded");
  emit("end");
};

const touch = () => {
  const stopNext =
    // props.onlyFullScreen || (props.hideVideo || props.showPoster);
    props.hideVideo || props.showPoster;
  log(
    "touch sdf",
    "stopNext",
    stopNext,
    "isCanPlay",
    isCanPlay,
    "played",
    played
  );
  if (stopNext) {
    // showFullScreen()
    return;
  }
  if (!isCanPlay.value) return;
  if (played.value) return;
  isTouchedVideo.value = true;
  // // 如果是安卓微信，需要重新播放
  // if (isAndroidWechat.value) {
  //   played.value = false;
  // }
  play();
};
const handleError = (e: unknown) => {
  log("video error");
  log(e);
};
const pause = () => {
  try {
    refVideo.value?.pause();
    log("stop success");
  } catch (e) {
    log("pause error", e);
  }
};
const cancelFullScreen = () => {
  log("cancelFullScreen", this);
  if (!document.fullscreenElement) {
    pause();
    document.removeEventListener(
      "fullscreenchange",
      bindCancelFullScreen.value
    );
  }
};
const cancelWebkitFullScreen = () => {
  log("cancelWebkitFullScreen", this);
  window.removeEventListener("resize", bindCancelWebkitFullScreen.value);

  pause();
};
const showCannotPlayVideo = () => {
  // Toast($t("cannotPlayVideo"));
  log("cannotPlayVideo");
};
const useFullScreen = async (video: HTMLVideoElement) => {
  if (video.requestFullscreen) {
    // 最新标准
    try {
      log("requestFullscreen");
      video.requestFullscreen();
      document.addEventListener("fullscreenchange", bindCancelFullScreen.value);
      return true;
    } catch (e) {
      log(e);
      showCannotPlayVideo();
      return false;
    }
  }
  return false;
};
const useWebkitFullScreen = async (video: TWrapperVideoElement) => {
  if (video.webkitRequestFullscreen) {
    try {
      log("useWebkitFullScreen");
      video.webkitRequestFullscreen();
      document.addEventListener("fullscreenchange", bindCancelFullScreen.value);
      window.addEventListener("resize", bindCancelWebkitFullScreen.value);
      return true;
    } catch (e) {
      log(e);
      showCannotPlayVideo();
      return false;
    }
  }
  return false;
};
const useEnterFullScreen = (video: TWrapperVideoElement) => {
  if (video.webkitEnterFullscreen) {
    try {
      log("webkitEnterFullscreen");
      video.webkitEnterFullscreen();
      document.addEventListener("fullscreenchange", bindCancelFullScreen.value);
      window.addEventListener("resize", bindCancelWebkitFullScreen.value);
      return true;
    } catch (e) {
      log(e);
      showCannotPlayVideo();
      return false;
    }
  }
  return false;
};
const executeFullScreen = async (video: TWrapperVideoElement) => {
  const task = [useFullScreen, useWebkitFullScreen, useEnterFullScreen];
  let isOk = false;
  while (task.length) {
    const t = task.shift();
    if (!t) {
      return true;
    }
    const ok = await t(video);
    if (ok) {
      isOk = true;
      break;
    }
  }
  if (!isOk) {
    log("all fail");
    showCannotPlayVideo();
  }
  return isOk;
};
const showFullScreen = async () => {
  if (!isHaveVideo.value) return;
  checkFullScreenPlayNumber.value = 0;
  const video = refVideo.value;
  log("click showFullScreen", !!video);
  if (!video) {
    showCannotPlayVideo();
    return;
  }
  if (props.insideFullscreen) {
    isInlineFullScreen.value = true;
    try {
      video.play();
    } catch (e) {
      log("e", e);
    }
    log("video play");
    return;
  }
  log(
    video.requestFullscreen,
    video.webkitRequestFullscreen,
    video.webkitEnterFullscreen
  );
  const next = await executeFullScreen(video);
  if (next) {
    log("next");
    video.play();
    checkFullScreenPlay();
  }
};
const checkFullScreenPlay = () => {
  setTimeout(() => {
    const video = refVideo.value;
    log("checkFullScreenPlay", isVideoPlaying(video));
    if (isVideoPlaying(video)) return;
    video.play();
    if (checkFullScreenPlayNumber.value > 2) return;
    checkFullScreenPlay();
  }, 1000);
};
const closeFullScreen = () => {
  log("closeFullScreen");
  pause();
  document.removeEventListener("fullscreenchange", bindCancelFullScreen.value);
  window.removeEventListener("resize", bindCancelWebkitFullScreen.value);
  isInlineFullScreen.value = false;
  emit("fullscreenHide");
};

const playByCanvas = () => {
  const video = refVideo.value;
  const canvas = refCanvas.value;
  console.log(video, canvas);
  if (!video || !canvas) return;
  const context = canvas.getContext("2d");

  // 当视频准备好播放时执行
  video.addEventListener("canplay", function () {
    console.log("play");
    // 开始绘制视频帧到Canvas
    drawVideo();
    video.play();
  });

  function drawVideo() {
    // 检查视频是否准备好
    if (video.paused || video.ended) {
      return;
    }

    // 计算视频帧在Canvas中的实际尺寸
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const canvasAspectRatio = canvas.width / canvas.height;

    let renderWidth, renderHeight, x, y;

    if (videoAspectRatio > canvasAspectRatio) {
      renderWidth = canvas.width;
      renderHeight = renderWidth / videoAspectRatio;
      x = 0;
      y = (canvas.height - renderHeight) / 2;
    } else {
      renderHeight = canvas.height;
      renderWidth = renderHeight * videoAspectRatio;
      x = (canvas.width - renderWidth) / 2;
      y = 0;
    }

    // 清除Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 在Canvas上绘制视频帧，保持等比例缩放
    context.drawImage(video, x, y, renderWidth, renderHeight);

    // 递归调用，以便绘制下一帧
    requestAnimationFrame(drawVideo);
  }

  // 监听视频播放事件，以便在播放时执行绘制
  video.addEventListener("play", function () {
    console.log("play2");
    drawVideo();
  });
};

onMounted(() => {
  const browserInfo = getBrowserInfo();
  isIos.value = browserInfo.isIphone;
  bindTouch.value = throttle(touch.bind(this), 300, {
    trailing: true,
  }) as () => void;
  bindCancelFullScreen.value = cancelFullScreen.bind(this);
  bindCancelWebkitFullScreen.value = cancelWebkitFullScreen.bind(this);
  getEmitter().on("docTouch", bindTouch.value);
  if (browserInfo.isWeixin && browserInfo.isAndroid) {
    log("安卓微信环境");
    isAndroidWechat.value = true;
  }
  if (browserInfo.isWeixin && browserInfo.isIphone) {
    log("ios微信环境");
    isIosWechat.value = true;
  }
  document.addEventListener(
    "WeixinJSBridgeReady",
    () => {
      log("WeixinJSBridgeReady");
      isLoadJDK.value = true;
      if (!props.autoplay) return;
      // if (isIosWechat.value) {
      //   play();
      // }
      play();
    },
    false
  );
  if (props.isCanvas) {
    playByCanvas();
  }
});

defineExpose({
  showFullScreen,
});
</script>

<template>
  <div
    :class="{
      'c-customVideo': true,
      fullscreen: isInlineFullScreen,
      hide: hide || (!showPoster && (hideContainer || insideFullscreen)),
    }"
    :style="{
      height: `${height}px`,
    }"
  >
    <div
      class="c-customVideo-close"
      v-if="isInlineFullScreen"
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
        v-if="showPoster"
        v-show="!isInlineFullScreen"
        class="c-customVideo-img"
        :src="poster"
      />
      <canvas ref="refCanvas" v-if="isCanvas" class="c-customVideo-canvas" />
      <video
        v-if="!hideVideo"
        ref="refVideo"
        :class="{
          'c-customVideo-media': true,
          hide: isCanvas || hideContainer || insideFullscreen,
          canvas: isCanvas,
        }"
        :poster="poster"
        :muted="muted"
        :preload="preload"
        :loop="loop"
        :autoplay="autoplay"
        :x5-video-player-type="x5VideoPlayerType"
        :x5-video-player-fullscreen="x5VideoPlayerFullscreen"
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

<style scoped lang="scss">
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
    z-index: 9999;
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
      // width: 1px;
      // height: 0px;
    }
    &.canvas {
      display: block;
      width: 1px;
      height: 1px;
    }
  }

  &-img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center center;
  }

  &-canvas {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
}
</style>
