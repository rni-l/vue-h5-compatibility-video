/*
 * @Author: Lu
 * @Date: 2023-11-09 16:22:09
 * @LastEditTime: 2024-02-26 11:12:51
 * @LastEditors: Lu
 * @Description:
 */

import {
  getDefaultSchedule,
  getSchedule,
  getEmitter,
  getBrowserInfo,
  setLog,
} from "vue2-h5-compatibility-video-common";
import type {
  IScheduleParams,
  TGetWrapperComponents,
} from "vue2-h5-compatibility-video-common";
import type { CreateElement } from "vue";
import CustomVideo from "./CustomVideo.vue";

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
  playBeforeFullscreen: { default: schedule.playBeforeFullscreen },
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

export const getVideoComponents: TGetWrapperComponents = (
  schedule = getSchedule()
) => {
  return {
    InsideVideo: {
      functional: true,
      props: getProps(schedule.insideParams),
      render: (h: CreateElement, context: any) => {
        console.log(context.props);
        return h(
          // @ts-ignore
          CustomVideo,
          {
            ...context.data,
            props: context.props,
          },
          context.children
        );
      },
    },
    FullscreenVideo: {
      functional: true,
      props: getProps(schedule.fullscreenParams),
      render: (h: CreateElement, context: any) => {
        return h(
          // @ts-ignore
          CustomVideo,
          {
            ...context.data,
            props: context.props,
          },
          context.children
        );
      },
    },
  };
};

export { getEmitter, getBrowserInfo, getDefaultSchedule, setLog };
