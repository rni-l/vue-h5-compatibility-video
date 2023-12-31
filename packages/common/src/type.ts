/*
 * @Author: Lu
 * @Date: 2023-11-09 16:43:34
 * @LastEditTime: 2023-12-27 17:07:22
 * @LastEditors: Lu
 * @Description: 
 */
export interface IScheduleParams {
  muted: boolean
  playsinline: boolean
  autoplay: boolean
  loop: boolean
  preload: 'none' | 'auto' | 'metadata'
  controls: boolean
  x5VideoPlayerType: 'none' | 'h5-page'
  x5VideoPlayerFullscreen: boolean
  orientation?: string
  hideContainer?: boolean
  hideVideo?: boolean
  translateVideo?: boolean
  displayHideVideo?: boolean
  insideFullscreen?: boolean
  playBeforeFullscreen?: boolean
  showPoster?: boolean
  src: string
  mode: 'inside' | 'fullscreen'
  poster?: string
  height?: number
  hide?: boolean
  isCanvas?: boolean
}

export interface IVideoSchedule {
  fullscreenParams: IScheduleParams
  insideParams: IScheduleParams
}

export interface ISchedule123 {
  // videoParams: IVideoParams
  height?: string
  src: string
  poster?: string
  orientation?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VueComponent = any

export type TGetWrapperComponents = (schedule?: IVideoSchedule) => ({
  InsideVideo: VueComponent
  FullscreenVideo: VueComponent
})

export type TWrapperVideoElement = HTMLVideoElement & {
  webkitRequestFullscreen: () => void
  webkitEnterFullscreen: () => void
}

export type TVideoFullScreenParams = {
  pause: () => void
  showError: () => void
  emitHide: () => void
}

export type THtmlVideoElement = HTMLVideoElement & {
  webkitRequestFullscreen?: () => void
  webkitEnterFullscreen?: () => void
  webkitExitFullscreen?: () => void
  webkitExitFullScreen?: () => void
}