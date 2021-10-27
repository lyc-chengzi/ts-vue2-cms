// import { EnumComponentType } from "@/enum";
import { EnumComponentType } from "@/enum";
import { IAPPStateModule } from "@/interface/cmsComponents/index";
import { IPageModuleState } from "@/interface/cmsComponents/page";
import { getUUID } from "@/utils";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 生成一个默认的page配置
const getDefaultPageModule = (): IPageModuleState =>
    ({
        id: `page_${getUUID()}`,
        name: "页面1",
        type: EnumComponentType.page,
        children: [],
        apis: [],
        css: {},
        props: {},
    } as IPageModuleState);
// 添加页面
export const commit_app_add_page = "commit_app_add_page";
type commit_app_add_page_payload = {
    page: IPageModuleState;
};
// 初始化第一个页面
export const commit_app_init_page = "commit_app_init_page";
// 初始化一个设计器页面
export const commit_app_init_designer_page = "commit_app_init_designer_page";

export default new Vuex.Store<IAPPStateModule>({
    state: {
        menus: [],
        pages: [],
        currentPage: undefined,
        itcode: "liuyc14",
        componentList: [],
    },
    getters: {
        pages: (state) => state.pages || [],
        componentList: (state) => state.componentList || [],
        currentPage: (state) => state.currentPage,
    },
    mutations: {
        [commit_app_add_page]: (
            state,
            payload: commit_app_add_page_payload
        ) => {
            state.pages.push(payload.page);
        },
        [commit_app_init_page]: (
            state,
            payload: commit_app_add_page_payload
        ) => {
            state.pages.push(payload.page);
            state.currentPage = payload.page;
        },
        [commit_app_init_designer_page]: (state) => {
            const newPage = getDefaultPageModule();
            state.pages.push(newPage);
            state.currentPage = newPage;
        },
    },
    actions: {},
    modules: {},
});
