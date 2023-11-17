/*
 * @Author: Lu
 * @Date: 2023-11-09 16:41:06
 * @LastEditTime: 2023-11-17 11:04:46
 * @LastEditors: Lu
 * @Description: 
 */
import { IScheduleParams, IVideoSchedule } from './type'
import { getBrowserInfo, log,  } from './utils'

export const getDefaultSchedule = (): IVideoSchedule => {
  const {
    isAndroid,
    isIos,
    isBaidu,
    isQuark,
    isUC,
  } = getBrowserInfo()
  log('getBrowserInfo', getBrowserInfo());
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
    showPoster: false,
    src: '',
    mode: 'fullscreen',
    poster: '',
    height: 1,
    hide: false,
    isCanvas: false
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
    showPoster: false,
    src: '',
    mode: 'inside',
    poster: '',
    height: 1,
    hide: false,
    isCanvas: false
  }

  if (isIos) {
    if (isQuark || isBaidu || isUC) {
      insideParams.showPoster = true
      insideParams.hideVideo = true
      fullscreenParams.hideContainer = true
      fullscreenParams.showPoster = true
    }
    if (isQuark || isUC) {
      fullscreenParams.insideFullscreen = true
    }
  } else if (isAndroid) {
    if (isBaidu) {
      fullscreenParams.hideContainer = true
      fullscreenParams.showPoster = true
      insideParams.showPoster = true
      insideParams.hideVideo = true
    }
    // if (isWeixin) {
    //   insideParams.isCanvas = true
    // }
  }

  return {
    fullscreenParams,
    insideParams
  }
}
