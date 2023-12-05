/*
 * @Author: Lu
 * @Date: 2023-11-09 16:22:09
 * @LastEditTime: 2023-12-05 11:42:39
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
  TGetWrapperComponents,
} from "vue2-h5-compatibility-video-common";
import type { CreateElement } from "vue";

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

export const getVideoComponents: TGetWrapperComponents = (
  schedule = getSchedule()
) => {
  return {
    InsideVideo: {
      functional: true,
      props: getProps(schedule.insideParams),
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

export { getEmitter, getBrowserInfo, getDefaultSchedule };
