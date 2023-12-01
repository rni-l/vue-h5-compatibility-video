import Vue from "vue";
import App from "./App.vue";
import { setLog, getBrowserInfo } from "vue2-h5-compatibility-video-common";
import { getVideoComponents } from "../packages";
import { router } from "./router";
const { InsideVideo, FullscreenVideo } = getVideoComponents();
setLog(true);
console.log(getBrowserInfo());
Vue.component("InsideVideo", InsideVideo);
Vue.component("FullscreenVideo", FullscreenVideo);

const app = new Vue({
  render: (h) => h(App),
  router,
});

app.$mount("#app");
