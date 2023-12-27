/*
 * @Author: Lu
 * @Date: 2023-12-11 11:04:07
 * @LastEditTime: 2023-12-11 11:06:00
 * @LastEditors: Lu
 * @Description:
 */

import Vue from "vue";
const bus = new Vue();

const baseWidth = 750;
const currentWidth = document.documentElement.clientWidth;

export const getBus = () => bus;

export const getBrowserInfo = () => ({
  isAndroid: Boolean(navigator.userAgent.match(/android/gi)),
  isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/gi)),
  isIpad: Boolean(navigator.userAgent.match(/ipad/gi)),
  isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/gi)),
  isAli: Boolean(navigator.userAgent.match(/AlipayClient/gi)),
  isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)),
});

function pxToRem(pxValue, baseFontSize = 75) {
  return pxValue / baseFontSize;
}
function remToPx(rem) {
  return (rem * 75) / (baseWidth / currentWidth);
}
export const getCurrentPx = (px) => {
  const rem = pxToRem(px);
  const currentPx = remToPx(rem);
  return currentPx;
};

export const checkIsBaiduBrowser = () => {
  if (
    navigator.userAgent.includes("baiduboxapp") ||
    navigator.userAgent.includes("Baidu")
  ) {
    return true;
  }
};

export const checkIsQuarkBrowser = () => {
  if (navigator.userAgent.includes("Quark")) {
    return true;
  }
  return false;
};
export const checkIsUCBrowser = () => {
  if (navigator.userAgent.includes("UCBrowser")) {
    return true;
  }
  return false;
};

export const checkIsHideVideo = () => {
  return checkIsBaiduBrowser() || checkIsQuarkBrowser();
};
