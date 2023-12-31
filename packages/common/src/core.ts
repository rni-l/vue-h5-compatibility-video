/*
 * @Author: Lu
 * @Date: 2023-11-09 16:41:06
 * @LastEditTime: 2024-01-02 11:05:41
 * @LastEditors: Lu
 * @Description: 
 */
import { IScheduleParams, IVideoSchedule } from './type'
import { getBrowserInfo, log,  } from './utils'



export const getDefaultSchedule = (): IVideoSchedule => {
  const fullscreenParams: IScheduleParams = {
    muted: true,
    playsinline: true,
    autoplay: false,
    loop: false,
    preload: 'auto',
    controls: false,
    x5VideoPlayerFullscreen: true,
    x5VideoPlayerType: 'h5-page',
    orientation: '',
    hideContainer: false,
    hideVideo: false,
    insideFullscreen: false,
    playBeforeFullscreen: false,
    showPoster: false,
    src: '',
    mode: 'fullscreen',
    poster: '',
    height: 1,
    hide: false,
    isCanvas: false,
    translateVideo: false,
    displayHideVideo: false,
  }
  const insideParams: IScheduleParams = {
    muted: true,
    playsinline: true,
    autoplay: false,
    loop: true,
    preload: 'auto',
    controls: false,
    x5VideoPlayerFullscreen: false,
    x5VideoPlayerType: 'h5-page',
    orientation: '',
    hideContainer: false,
    hideVideo: false,
    insideFullscreen: false,
    playBeforeFullscreen: false,
    showPoster: false,
    src: '',
    mode: 'inside',
    poster: '',
    height: 1,
    hide: false,
    isCanvas: false,
    translateVideo: false,
    displayHideVideo: false,
  }

  return {
    fullscreenParams,
    insideParams
  }
}


export const getSchedule = (): IVideoSchedule => {
  const {
    isAndroid,
    isIos,
    isBaidu,
    isQuark,
    isUC,
    isQQ,
    isWeixin,
    isSafari,
  } = getBrowserInfo()
  log('getBrowserInfo', getBrowserInfo());
  const {
    fullscreenParams, insideParams
  } = getDefaultSchedule()

  if (isIos) {
    if (isQuark || isBaidu || isUC) {
      insideParams.showPoster = true
      insideParams.hideVideo = true
      fullscreenParams.hideContainer = true
      fullscreenParams.showPoster = true
      fullscreenParams.playsinline = false
    }
    if (isQuark || isUC) {
      fullscreenParams.insideFullscreen = true
      fullscreenParams.displayHideVideo = true
    }
    if (isBaidu) {
      fullscreenParams.translateVideo = true
    }
    if (isWeixin || isSafari) {
      fullscreenParams.playsinline = false
      fullscreenParams.controls = true
    }

  } else if (isAndroid) {
    if (isBaidu) {
      fullscreenParams.hideContainer = true
      fullscreenParams.showPoster = true
      fullscreenParams.displayHideVideo = true
      insideParams.showPoster = true
      insideParams.hideVideo = true
    }
    if (isQuark || isUC) {
      // fullscreenParams.hideContainer = true
      // fullscreenParams.showPoster = true
      // fullscreenParams.translateVideo = true
      fullscreenParams.insideFullscreen = true
      fullscreenParams.displayHideVideo = true
      fullscreenParams.hideContainer = true
      fullscreenParams.showPoster = true
      fullscreenParams.playsinline = false
    }
    if (isQQ) {
      console.log('is qq', true);
      fullscreenParams.playBeforeFullscreen = true
    }
  }

  return {
    fullscreenParams,
    insideParams
  }
}
