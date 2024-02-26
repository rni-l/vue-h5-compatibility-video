<!--
 * @Author: Lu
 * @Date: 2023-11-09 16:26:06
 * @LastEditTime: 2024-02-26 11:21:16
 * @LastEditors: Lu
 * @Description: 
-->
<script setup lang="ts">
import { ref, computed, onMounted, defineExpose, onBeforeUnmount } from "vue";
import type { PropType } from "vue";
import { throttle } from "lodash-es";
import {
  getBrowserInfo,
  getEmitter,
  log,
  VideoFullScreen
} from "vue2-h5-compatibility-video-common";
import type {
  IScheduleParams,
} from "vue2-h5-compatibility-video-common";
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
  playBeforeFullscreen: {
    type: Boolean as PropType<IScheduleParams["playBeforeFullscreen"]>,
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
  mode: {
    default: "",
    type: String as PropType<IScheduleParams["mode"]>,
  },
  translateVideo: {
    default: false,
    type: Boolean as PropType<IScheduleParams["translateVideo"]>,
  },
  displayHideVideo: {
    default: false,
    type: Boolean as PropType<IScheduleParams["displayHideVideo"]>,
  },
});

const emit = defineEmits([
  "fullscreenHide",
  "end",
  "touchstart",
  "touchend",
  "click",
]);
const isCanPlay = ref(false);
const played = ref(false);
const isAndroidWechat = ref(false);
const isIosWechat = ref(false);
const isLoadJDK = ref(false);
const isInlineFullScreen = ref(false);
const isFullScreen = ref(false);
const isIos = ref(false);
const bindTouch = ref(() => {});
const checkFullScreenPlayNumber = ref(0);
const checkPlayTimer = ref<any>(null);
const checkFullScreenPlayTimer = ref<any>(null);

const pause = () => {
  try {
    played.value = false;
    clearTimeout(checkPlayTimer.value);
    clearTimeout(checkFullScreenPlayTimer.value);
    refVideo.value?.pause();
    log("stop success");
  } catch (e) {
    log("pause error", e);
  }
};

const refVideo = ref();
const refCanvas = ref();
const showCannotPlayVideo = () => {
  // Toast($t("cannotPlayVideo"));
  log("cannotPlayVideo");
};
const classVideoFullScreen = new VideoFullScreen({
  pause: pause,
  showError: showCannotPlayVideo,
  emitHide: () => emit("fullscreenHide"),
});

const isHaveVideo = computed(() => {
  return !!props.src;
});

const emitCommonEvent = (e: any, k: "touchstart" | "touchend" | "click") => {
  emit(k, e);
};

const isVideoPlaying = (video: HTMLVideoElement) =>
  !!(
    video &&
    video.currentTime > 0 &&
    !video.paused &&
    !video.ended &&
    video.readyState > 2
  );
const checkPlay = () => {
  clearTimeout(checkPlayTimer.value);
  played.value = isVideoPlaying(refVideo.value);
  log("check play", props.src, played.value);
  checkPlayTimer.value = setTimeout(() => {
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

const touch = (e?: Event) => {
  // cancelEvent(e);
  const stopNext =
    props.hideVideo ||
    props.showPoster ||
    props.insideFullscreen ||
    props.displayHideVideo ||
    props.translateVideo ||
    props.mode === "fullscreen";
  // log(
  //   "touch sdf",
  //   "stopNext",
  //   stopNext,
  //   "isCanPlay",
  //   isCanPlay,
  //   "played",
  //   played
  // );
  if (stopNext) return;
  if (!isCanPlay.value) return;
  if (played.value) return;
  play();
};
const handleError = (e: unknown) => {
  log("video error");
  log(e);
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
  classVideoFullScreen.video = video;
  log(
    video.requestFullscreen,
    video.webkitRequestFullscreen,
    video.webkitEnterFullscreen
  );
  if (props.playBeforeFullscreen) {
    log("before play");
    video.play();
  }
  isFullScreen.value = true;
  setTimeout(async () => {
    const next = await classVideoFullScreen.executeFullScreen(video);
    log("next", next);
    if (next) {
      checkFullScreenPlay();
    } else {
      isFullScreen.value = false;
    }
  }, 500);
};
const checkFullScreenPlay = () => {
  const video = refVideo.value;
  log("checkFullScreenPlay");
  refVideo.value.play();
  clearTimeout(checkFullScreenPlayTimer.value);
  checkFullScreenPlayTimer.value = setTimeout(() => {
    checkFullScreenPlayNumber.value += 1;
    if (isVideoPlaying(video)) return;
    if (checkFullScreenPlayNumber.value > 2) return;
    checkFullScreenPlay();
  }, 800);
};
const closeFullScreen = () => {
  log("closeFullScreen");
  classVideoFullScreen.removeExitFullScreenEvent();
  isInlineFullScreen.value = false;
  isFullScreen.value = false;
};

const cancelEvent = (e?: Event) => {
  e?.stopPropagation();
  e?.preventDefault();
};

onMounted(() => {
  log("onMounted 123");
  const browserInfo = getBrowserInfo();
  isIos.value = browserInfo.isIos;
  bindTouch.value = throttle(touch.bind(this), 300, {
    trailing: true,
  }) as () => void;
  getEmitter().on("docTouch", bindTouch.value);
  if (browserInfo.isWeixin && browserInfo.isAndroid) {
    log("安卓微信环境");
    isAndroidWechat.value = true;
  }
  if (browserInfo.isWeixin && browserInfo.isIos) {
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
  // if (props.isCanvas) {
  //   playByCanvas();
  // }
});
onBeforeUnmount(() => {
  log("before onUnmounted");
  classVideoFullScreen.removeExitFullScreenEvent();
  classVideoFullScreen.exitFullScreen(refVideo.value);
  classVideoFullScreen.destroyVideo();
});

defineExpose({
  showFullScreen,
});
</script>

<template>
  <div
    :class="{
      'compatibility-video': true,
      fullscreen: isInlineFullScreen,
      hide: hide || (!showPoster && (hideContainer || insideFullscreen)),
    }"
    :style="{
      height: `${height}px`,
    }"
    @click="(e) => emitCommonEvent(e, 'click')"
    @touchstart="(e) => emitCommonEvent(e, 'touchstart')"
    @touchend="(e) => emitCommonEvent(e, 'touchend')"
  >
    <div
      class="compatibility-video-close"
      v-if="isInlineFullScreen"
      @click.stop="closeFullScreen"
    >
      <slot name="close">关闭</slot>
    </div>

    <div
      :class="{
        'compatibility-video-wrap': true,
        fullscreen: isInlineFullScreen,
      }"
    >
      <img
        v-if="showPoster"
        v-show="!isInlineFullScreen"
        class="compatibility-video-img"
        :src="poster"
      />
      <canvas
        ref="refCanvas"
        v-if="isCanvas"
        class="compatibility-video-canvas"
      />
      <!-- (hideContainer && !isFullScreen) -->
      <video
        v-if="!hideVideo"
        ref="refVideo"
        :class="{
          'compatibility-video-media': true,
          hide: isCanvas || displayHideVideo || insideFullscreen,
          canvas: isCanvas,
          transformHide: translateVideo,
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
        :webkitPresentationMode="
          mode === 'fullscreen' ? 'fullscreen' : 'inline'
        "
        :x-webkit-airplay="true"
        :controls="controls"
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
.compatibility-video {
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
    height: 100%;
    &.fullscreen {
      position: absolute;
      width: 100vw;
      height: calc(100vh - #{$size} - #{$space} - #{$top}) !important;
      background: #000;
      box-sizing: border-box;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      .compatibility-video-media {
        display: block !important;
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
      display: none;
    }

    &.transformHide {
      transform: translateX(-99999px);
      opacity: 0;
      position: absolute;
      left: -9999px;
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
    color: #fff;
    width: calc($size * 0.8);
    height: calc($size * 0.8);
    z-index: 10;
    transform: translate3d(0);
    white-space: nowrap;
  }
}
</style>
