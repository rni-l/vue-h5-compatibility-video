import Vue from "vue";
import App from "./App.vue";
import { setLog } from "common";
import { getVideoComponents } from "../packages";
import { router } from "./router";
const { InsideVideo, FullscreenVideo } = getVideoComponents();
setLog(true);
Vue.component("InsideVideo", InsideVideo);
Vue.component("FullscreenVideo", FullscreenVideo);

const app = new Vue({
  render: (h) => h(App),
  router,
});

app.$mount("#app");
