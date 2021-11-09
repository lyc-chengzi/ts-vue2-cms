import Vue from "vue";
import Vuex from "vuex";

import designerModule from "@/store/modules/designer.module";
import LeftMenuModule from "@/store/modules/leftMenu.module";
import { IAppModuleState } from "@/interface/cmsDesigner";

Vue.use(Vuex);

const createStore = () => {
    return new Vuex.Store<IAppModuleState>({
        state: {
            itcode: "liuyc14",
            access: false,
        },
        getters: {},
        mutations: {
            setAccess: (state, payload) => {
                state.access = payload.access;
            },
        },
        actions: {
            fetchAccess(context) {
                new Promise((ok) => {
                    setTimeout(() => {
                        ok("success");
                    }, 1000);
                }).then(() => {
                    context.commit("setAccess", { access: true });
                });
            },
        },
        modules: {
            leftMenu: LeftMenuModule,
            designer: designerModule,
        },
    });
};
export default createStore;
