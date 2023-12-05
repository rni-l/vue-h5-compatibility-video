/*
 * @Author: Lu
 * @Date: 2023-11-09 16:22:09
 * @LastEditTime: 2023-12-05 10:54:42
 * @LastEditors: Lu
 * @Description:
 */

import {
  getDefaultSchedule,
  getSchedule,
  getEmitter,
  getBrowserInfo,
  CustomVideo,
} from "vue2-h5-compatibility-video-common";
import type {
  IScheduleParams,
  IVideoSchedule,
  TGetWrapperComponents,
} from "vue2-h5-compatibility-video-common";
import type { ExtractPropTypes, SetupContext } from 'vue'
import { h, ref } from 'vue'


const getProps = (schedule: IScheduleParams) => ({
  muted: { default: schedule.muted },
  playsinline: { default: schedule.playsinline },
  autoplay: { default: schedule.autoplay },
  loop: { default: schedule.loop },
  preload: { default: schedule.preload },
  controls: { default: schedule.controls },
  x5VideoPlayerFullscreen: {
    default: schedule.x5VideoPlayerFullscreen,
  },
  x5VideoPlayerType: {
    default: schedule.x5VideoPlayerType,
  },
  orientation: { default: schedule.orientation },
  hideContainer: { default: schedule.hideContainer },
  hideVideo: { default: schedule.hideVideo },
  insideFullscreen: {
    default: schedule.insideFullscreen,
  },
  showPoster: { default: schedule.showPoster },
  isCanvas: { default: schedule.isCanvas },
  hide: { default: schedule.hide },
  src: {
    default: schedule.src,
  },
  mode: {
    default: schedule.mode,
  },
  poster: {
    default: schedule.poster,
  },
  height: {
    default: schedule.height,
  },
  translateVideo: {
    default: schedule.translateVideo,
  },
  displayHideVideo: {
    default: schedule.displayHideVideo,
  },
});

type TEmits = [ 'fullscreenHide',
  'end',
  'touchstart',
  'touchend',
  'click',
]

const getCom = (params: IScheduleParams) => {
  return {
    props: getProps(params),
    setup(props: ExtractPropTypes<ReturnType<typeof getProps>>, context: SetupContext<TEmits>) {
      const refVideo = ref()
      context.expose({
        showFullScreen: () => refVideo.value?.showFullScreen()
      })
      return () => h(
        CustomVideo,
        {
          ...props,
          ref: refVideo,
          onFullscreenHide: () => context.emit('fullscreenHide'),
          onEnd: () => context.emit('end'),
          onTouchstart: () => context.emit('touchstart'),
          onTouchend: () => context.emit('touchend'),
          onClick: () => context.emit('click'),
        },
        context.slots
      )
    }
  }
}

export const getVideoComponents: TGetWrapperComponents = (
  schedule = getSchedule()
) => {
  return {
    InsideVideo: getCom(schedule.insideParams),
    FullscreenVideo: getCom(schedule.fullscreenParams),
  };
};

export { getEmitter, getBrowserInfo, getDefaultSchedule };
