/*
 * @Author: Lu
 * @Date: 2023-11-09 16:41:14
 * @LastEditTime: 2024-01-02 00:23:22
 * @LastEditors: Lu
 * @Description: 
 */
import mitt from 'mitt'
const emitter = mitt()
let isLog = false

export const setLog = (val: boolean) => isLog = val

export const log = (...args: unknown[]) => isLog ? window['console'].log(...args) : undefined;

export const getEmitter = () => emitter

export const getBrowserInfo = () => ({
  isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
  isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
  isIos: Boolean(navigator.userAgent.match(/ipad|iphone/ig)),
  isSafari: /CriOS/i.test(navigator.userAgent) && /iphone|ipod|ipad/i.test(navigator.userAgent),
  isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
  isAli: Boolean(navigator.userAgent.match(/AlipayClient/ig)),
  isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)),
  isBaidu: (navigator.userAgent.includes('baiduboxapp') || navigator.userAgent.includes('Baidu')),
  isQuark: navigator.userAgent.includes('Quark'),
  isUC: navigator.userAgent.includes('UCBrowser'),
  isQQ: navigator.userAgent.includes('MQQBrowser')
})

