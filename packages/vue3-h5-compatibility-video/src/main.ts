import { createApp } from "vue";
import App from "./App.vue";
import { setLog, getBrowserInfo } from "vue2-h5-compatibility-video-common";
import { getVideoComponents } from "../packages";
import { router } from "./router";
const { InsideVideo, FullscreenVideo } = getVideoComponents();
setLog(true);
console.log(getBrowserInfo());

const app = createApp(App);

app.use(router)
app.component("InsideVideo", InsideVideo);
app.component("FullscreenVideo", FullscreenVideo);

app.mount("#app");
