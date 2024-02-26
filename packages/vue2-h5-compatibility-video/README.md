# vue2-h5-compatibility-video


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
<inside-video
  :src="url"
  :height="height"
  :poster="poster"
  :autoplay="true"
  :loop="true"
/>
```

使用全屏视频：

```html
<fullscreen-video
  :src="url"
  :height="height"
  :poster="poster"
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

添加全局点击事件：

```javascript
import { getEmitter } from 'vue2-h5-compatibility-video'
// 当页面触发点击时，调用下面的方法，这样会通知视频组件播放
getEmitter().emit("docTouch")
```
