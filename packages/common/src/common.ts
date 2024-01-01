/*
 * @Author: Lu
 * @Date: 2023-12-15 00:23:44
 * @LastEditTime: 2024-01-01 23:35:12
 * @LastEditors: Lu
 * @Description: 
 */
import { PropType } from 'vue'
import type { IScheduleParams, TVideoFullScreenParams, THtmlVideoElement } from './type'
import { log } from './utils'

export const getProps = () => ({
  muted: {
    type: Boolean as PropType<IScheduleParams["muted"]>,
  },
  hide: {
    type: Boolean as PropType<IScheduleParams["hide"]>,
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
})



export class VideoFullScreen {

  pause: TVideoFullScreenParams['pause']
  showError: TVideoFullScreenParams['showError']
  emitHide: TVideoFullScreenParams['emitHide']

  video?: THtmlVideoElement

  bindCancelFullScreen: () => void = () => {}
  bindCancelWebkitFullScreen: () => void = () => {}

  constructor(obj: TVideoFullScreenParams) {
    this.pause = obj.pause
    this.showError = obj.showError
    this.emitHide = obj.emitHide
    this.bindCancelFullScreen = this.cancelFullScreen.bind(this)
    this.bindCancelWebkitFullScreen = this.cancelWebkitFullScreen.bind(this)
  }

  removeEventListener() {
    log('removeEventListener')
    document.removeEventListener(
      "fullscreenchange",
      this.bindCancelFullScreen
    );
    document.removeEventListener("webkitfullscreenchange", this.bindCancelFullScreen);
    window.removeEventListener("resize", this.bindCancelWebkitFullScreen);
    const video = this.video
    if (!video) return
    video.removeEventListener("fullscreenchange", this.bindCancelFullScreen);
    video.removeEventListener("webkitfullscreenchange", this.bindCancelFullScreen);
    video.removeEventListener("webkitendfullscreen", this.bindCancelFullScreen);
  }

  removeExitFullScreenEvent() {
    if (this.checkIsFullScreen()) {
      log(
        `Entered fullscreen mode.`
      );
      return;
    } else {
      if (this.video) {
        this.exitFullScreen(this.video)
      }
      log("Leaving fullscreen mode.");
    }
    this.pause();
    this.removeEventListener()
    this.emitHide()
  }
  cancelFullScreen() {
    log("cancelFullScreen");
    this.removeExitFullScreenEvent();
  }
  cancelWebkitFullScreen() {
    log("cancelWebkitFullScreen");
    this.removeExitFullScreenEvent();
  }
  addExitFullScreenEvent(video: THtmlVideoElement) {
    document.addEventListener("fullscreenchange", this.bindCancelFullScreen);
    video.addEventListener("fullscreenchange", this.bindCancelFullScreen);
    document.addEventListener("webkitfullscreenchange", this.bindCancelFullScreen);
    video.addEventListener("webkitfullscreenchange", this.bindCancelFullScreen);
    video.addEventListener("webkitendfullscreen", this.bindCancelFullScreen);
    window.addEventListener("resize", this.bindCancelWebkitFullScreen);
    log('addExitFullScreenEvent')
  }
  async useFullScreen(video: THtmlVideoElement) {
    if (video.requestFullscreen) {
      // 最新标准
      try {
        log('useFullScreen');
        video.requestFullscreen()
        this.addExitFullScreenEvent(video);
        return true
      } catch (e) {
        log(e);
        this.showError()
        return false
      }
    }
    return false
  }
  async useWebkitFullScreen(video: THtmlVideoElement) {
    if (video.webkitRequestFullscreen) {
      try {
        log('useWebkitFullScreen');
        video.webkitRequestFullscreen();
        this.addExitFullScreenEvent(video);
        return true
      } catch (e: unknown) {
        log(e);
        this.showError()
        return false
      }
    }
    return false
  }
  async useEnterFullScreen(video: THtmlVideoElement) {
    if (video.webkitEnterFullscreen) {
      try {
        log('webkitEnterFullscreen');
        video.webkitEnterFullscreen();
        this.addExitFullScreenEvent(video);
        return true
      } catch (e: unknown) {
        log(e);
        this.showError()
        return false
      }
    }
    return false
  }
  async executeFullScreen(video: THtmlVideoElement) {
    const task = [
      this.useFullScreen.bind(this),
      this.useWebkitFullScreen.bind(this),
      this.useEnterFullScreen.bind(this),
    ]
    let isOk = false
    while (task.length) {
      const t = task.shift()
      if (t) {
        const ok = await t(video)
        if (ok) {
          isOk = true
          break
        }
      } else {
        break
      }
    }
    if (!isOk) {
      log('executeFullScreen fail');
      this.showError()
    }
    return isOk
  }

  checkIsFullScreen() {
    // @ts-ignore
    // return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled
    return document.fullscreenElement || document.webkitFullscreenElement
  }

  exitFullScreen(video?: THtmlVideoElement) {
    log('exitFullScreen', video);
    try {
      if (video && video.webkitExitFullscreen) return video.webkitExitFullscreen()
      // @ts-ignore
      if (video && video.exitFullscreen) return video.exitFullscreen()
      // @ts-ignore
      if (document.webkitExitFullscreen) return  document.webkitExitFullscreen()
      if (document.exitFullscreen) return  document.exitFullscreen()
      // @ts-ignore
      if (document.mozCancelFullScreen) return  document.mozCancelFullScreen()
    } catch(e) {
      log('exit fullscreen error', e)
    }
  }

  destroyVideo(video?: THtmlVideoElement) {
    const target = video || this.video
    if (target) {
      const source = target.querySelector('source')
      if (source) {
        log('remove source')
        source.removeAttribute('src')
        target.removeChild(source)
      }
      log('destroyVideo')
      target.pause()
      target.load()
    }
  }
}