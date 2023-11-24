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

使用内联视频：

```html
<inside-video :src="url" :height="height" :poster="poster" :autoplay="true" :loop="true" />
```

使用全屏视频：

```html
<fullscreen-video
  :src="url" :height="height"
  :poster="poster" :autoplay="false" :loop="false"
  :muted="false" orientation="landscape"  @click="show"
  ref="refFullscreenVideo"
/>

<script>
const refFullscreenVideo = ref()
const show = () => {
  refFullscreenVideo.value?.showFullScreen()
}
</script>
```
