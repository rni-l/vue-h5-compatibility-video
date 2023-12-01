# vue-h5-compatibility-video

> 使用 vue 封装 Video 的组件，用于处理 video 在移动端兼容性的问题。组件内部已经包含了根据浏览器去添加视频兼容性的配置。

## 快速上手

### Vue@2

```shell
# 添加依赖
npm i vue2-h5-compatibility-video
```

引入：

```javascript
import Vue from "vue";
import { getVideoComponents } from 'vue2-h5-compatibility-video'
import 'vue2-h5-compatibility-video/lib/style.css'

const { InsideVideo, FullscreenVideo } = getVideoComponents();
Vue.component("InsideVideo", InsideVideo);
Vue.component("FullscreenVideo", FullscreenVideo);
```

### 使用

使用内联视频：

```html
<inside-video :src="url" :height="height" :poster="poster" :autoplay="true" :loop="true" />
```

使用全屏视频：

```html
<fullscreen-video
  :src="url"
  :height="height"
  :poster="poster"
  orientation="landscape"
  @click="show"
  ref="refFullscreenVideo"
/>

<script>
const refFullscreenVideo = ref()
const show = () => {
  refFullscreenVideo.value?.showFullScreen()
}
</script>
```

### 自定义组件默认属性

可以在 `getVideoComponents` 方法中，传入你自定义规则：

```javascript
import Vue from "vue";
import { getVideoComponents, getDefaultSchedule, getBrowserInfo } from 'vue2-h5-compatibility-video'
import 'vue2-h5-compatibility-video/lib/style.css'

const { fullscreenParams, insideParams } = getDefaultSchedule()

// 强制要求 ios 下的浏览器只显示封面图
if (getBrowserInfo().isIos) {
  insideParams.showPoster = true
  insideParams.hideVideo = true
}

const { InsideVideo, FullscreenVideo } = getVideoComponents({ fullscreenParams, insideParams });
Vue.component("InsideVideo", InsideVideo);
Vue.component("FullscreenVideo", FullscreenVideo);
```

通过这种方式可以修改默认的组件属性

### 通知组件触发 `play` 

```vue
<template>
  <div id="app" @touchstart="touch" @touchmove="touch">
    <div class="app-header">
      <router-link to="/p1">p1</router-link>
      <router-link to="/p2">p2</router-link>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import { throttle } from "lodash-es";
import { getEmitter } from "vue2-h5-compatibility-video";

const touch = throttle(() => getEmitter().emit("docTouch"), 900, {
  trailing: true,
  leading: true,
});
</script>
```

安卓设备是不支持视频自动播放的，我这边通过当用户触摸设备时，通知各个 video 组件执行 `play`  方法

## 属性

### 清单

| 属性                    | 说明                        | 类型    | 默认值     | 可选值                   |
| ----------------------- | --------------------------- | ------- | ---------- | ------------------------ |
| mode                    | 视频播放模式                | string  | inside     | inside/fullscreen        |
| muted                   | 是否禁音                    | boolean | true       | true/false               |
| playsinline             | 是否内联播放                | boolean | 按规则变化 | true/false               |
| autoplay                | 自动播放                    | boolean | 按规则变化 | true/false               |
| loop                    | 循环播放                    | boolean | 按规则变化 | true/false               |
| preload                 | 预加载                      | string  | auto       | none \| auto \| metadata |
| controls                | 显示视频默认控件            | boolean | false      | true/false               |
| src                     | 视频链接                    | string  | -          | -                        |
| poster                  | 封面图链接                  | string  | -          | -                        |
| height                  | 视频高度                    | Number  | 1          | -                        |
| x5VideoPlayerType       | X5 属性                     | string  | h5-page    | '' \| h5-page            |
| x5VideoPlayerFullscreen | X5 属性                     | Boolean | 按规则变化 | true/false               |
| orientation             | 视频播放方向                | string  | -          | -                        |
| hideContainer           | 是否隐藏组件内的容器        | boolean | 按规则变化 | true/false               |
| hideVideo               | 是否隐藏组件内的视频        | boolean | 按规则变化 | true/false               |
| displayHideVideo        | 是否使用 display 隐藏视频   | boolean | 按规则变化 | true/false               |
| translateVideo          | 是否使用 transform 隐藏视频 | boolean | 按规则变化 | true/false               |
| Hide                    | 是否隐藏组件                | boolean | 按规则变化 | true/false               |
| insideFullscreen        | 是否内联全屏播放视频        | boolean | 按规则变化 | true/false               |
| showPoster              | 是否显示封面图              | boolean | 按规则变化 | true/false               |

组件内的属性大部分是 `video` 的属性和特定浏览器的属性，有一小部分是为了解决浏览器兼容性问题的：`hideContainer`, `hideVideo`, `insideFullscreen`, `showPoster`

这四个属性通常要组合性的使用，下面说下具体的场景

### 需要内联播放的视频，但某些浏览器只显示封面图

需要设置 `showPoster: true` 和 `hideVideo: true`

```javascript
const {
  isBaidu, isIos
} = getBrowserInfo()
const {
  fullscreenParams, insideParams
} = getDefaultSchedule()

if (isIos) {
  if (isBaidu) {
    insideParams.showPoster = true
    insideParams.hideVideo = true
  }
}

```

### 需要全屏播放的视频，在未播放的时候，只使用封面图显示

需要设置 `translateVideo: true`,  `showPoster: true` 和 `hideContainer: true`

```javascript
const {
  isBaidu, isIos
} = getBrowserInfo()
const {
  fullscreenParams, insideParams
} = getDefaultSchedule()

if (isIos) {
  if (isBaidu) {
    fullscreenParams.hideContainer = true
    fullscreenParams.showPoster = true
    fullscreenParams.translateVideo = true
  }
}

```

### 需要全屏播放的视频，但只能在可视区内全屏播放，不能使用浏览器自带的全屏功能

需要设置 `showPoster: true` 和 `hideVideo: true`

```javascript
const {
  isBaidu, isIos
} = getBrowserInfo()
const {
  fullscreenParams, insideParams
} = getDefaultSchedule()

if (isIos) {
  if (isBaidu) {
    fullscreenParams.insideFullscreen = true
  }
}

```

### 其他

上面介绍的是统一在组件配置修改，这样可以不需要每次使用都配置属性。但有时候需要针对性地修改，可以直接在组件属性上配置：

```html
<inside-video :showPoster="true" :hideVideo="true" />
```

## 方法

| 方法名         | 说明       | 参数 | 返回值 |
| -------------- | ---------- | ---- | ------ |
| showFullScreen | 使视频全屏 | -    | -      |
|                |            |      |        |
|                |            |      |        |

## 插槽

### close

内联全屏下，关闭按钮的插槽

```html
<fullscreen-video>
  <tempalte name="close">X</tempalte>
</fullscreen-video>
```

## 其他模块

```javascript
import {
  getVideoComponents, getDefaultSchedule, getBrowserInfo, getEmitter
} from 'vue2-h5-compatibility-video'
```

### 规则定义

```typescript
export interface IScheduleParams {
    muted: boolean;
    playsinline: boolean;
    autoplay: boolean;
    loop: boolean;
    preload: 'none' | 'auto' | 'metadata';
    controls: boolean;
    x5VideoPlayerType: 'none' | 'h5-page';
    x5VideoPlayerFullscreen: boolean;
    orientation?: string;
    hideContainer?: boolean;
    hideVideo?: boolean;
    insideFullscreen?: boolean;
    showPoster?: boolean;
    src: string;
    mode: 'inside' | 'fullscreen';
    poster?: string;
    height?: number;
    hide?: boolean;
    translateVideo?: boolean;
    displayHideVideo?: boolean;
}
```

### getVideoComponents

```typescript
export interface IVideoSchedule {
    fullscreenParams: IScheduleParams;
    insideParams: IScheduleParams;
}

export const getVideoComponents = (schedule?: IVideoSchedule) => ({
    InsideVideo: VueComponent;
    FullscreenVideo: VueComponent;
});

```

### getDefaultSchedule

```typescript
export type getDefaultSchedule = () => ({
  fullscreenParams: IScheduleParams;
  insideParams: IScheduleParams;
})
```

### getBrowserInfo

```typescript
export type getBrowserInfo = () => ({
  isAndroid: boolean,
  isIpad: boolean,
  isIos: boolean,
  isWeixin: boolean,
  isAli: boolean,
  isPhone: boolean,
  isBaidu: boolean,
  isQuark: boolean,
  isUC: boolean,
})
```

### getEmitter

通知组件触发视频播放

```vue
<template>
  <div id="app" @touchstart="touch" @touchmove="touch">
    <div class="app-header">
      <router-link to="/p1">p1</router-link>
      <router-link to="/p2">p2</router-link>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import { throttle } from "lodash-es";
import { getEmitter } from "vue2-h5-compatibility-video";

const touch = throttle(() => getEmitter().emit("docTouch"), 900, {
  trailing: true,
  leading: true,
});
</script>
```

