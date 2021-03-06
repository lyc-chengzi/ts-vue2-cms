import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router";
import createStore from "./store";
import { sync } from "vuex-router-sync";
import antdV from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;
Vue.use(antdV);

export function createApp() {
    const router = createRouter();
    const store = createStore();
    sync(store, router);
    const app = new Vue({
        router,
        store,
        render: (h) => h(App),
    });
    return { app, router, store };
}
