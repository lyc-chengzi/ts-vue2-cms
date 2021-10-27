import { ILayoutModuleState } from "@/interface/cmsComponents/layout";
import { IPageModuleState } from "@/interface/cmsComponents/page";
import { Module } from "vuex";

type commit_page_addLayout_payload = {
    layout: ILayoutModuleState;
};

// 页面添加布局组件
export const commit_page_addLayout = "commit_page_addLayout";

const PageModule = <Module<IPageModuleState, any>>{
    namespaced: true,
    store: {},
    mutations: {
        [commit_page_addLayout]: (
            state,
            payload: commit_page_addLayout_payload
        ) => {
            if (state.children) {
                state.children.push(payload.layout);
            }
        },
    },
};

export default PageModule;
