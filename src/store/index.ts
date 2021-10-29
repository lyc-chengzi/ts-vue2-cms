import Vue from "vue";
import Vuex from "vuex";

import designerModule from "@/store/modules/designer.module";
import LeftMenuModule from "@/store/modules/leftMenu.module";
import { IAppModuleState } from "@/interface/cmsDesigner";

Vue.use(Vuex);

export default new Vuex.Store<IAppModuleState>({
    state: {
        itcode: "liuyc14",
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        leftMenu: LeftMenuModule,
        designer: designerModule,
    },
});
