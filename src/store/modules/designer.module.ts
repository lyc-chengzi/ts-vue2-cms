import { EnumComponentType } from "@/enum";
import { EnumComponentGroup } from "@/enum/cmsDesigner";
import { IPageModuleState } from "@/interface/cmsComponents/page";
import {
    IDesignerComponent,
    IDesignerModuleState,
} from "@/interface/cmsDesigner";
import { getUUID } from "@/utils";
import registerComponent from "@/views/cms/renderer/templateRenderer/componentRegister";
import { Module } from "vuex";

// 生成一个默认的page配置
const getDefaultPageModule = (): IPageModuleState =>
    ({
        id: `page_${getUUID()}`,
        name: "页面1",
        title: "页面1",
        type: EnumComponentType.page,
        group: EnumComponentGroup.page,
        selected: false,
        children: [],
        apis: [],
        css: {},
        props: {},
    } as IPageModuleState);
// 添加页面
export const commit_designer_add_page = "commit_designer_add_page";
type payload_designer_add_page = {
    page?: IPageModuleState;
};
// 初始化第一个页面
export const commit_designer_init_page = "commit_designer_init_page";
// 初始化一个设计器页面
export const commit_designer_init_designer_page =
    "commit_designer_init_designer_page";

// 设置当前页面
export const commit_designer_setSelectPage = "commit_designer_setSelectPage";
type payload_designer_setSelectPage = {
    pageId: string;
};

// 组件拖入设计面板后，增加渲染组件
export const commit_designer_dragAddComponent =
    "commit_designer_dragAddComponent";
type payload_designer_dragAddComponent = {
    parent: IDesignerComponent;
    component: IDesignerComponent;
};

// 设置拖动的组件
export const commit_designer_setDragComponent =
    "commit_designer_setDragComponent";
type payload_designer_setDragComponent = {
    component: IDesignerComponent;
};

// 设置当前选中的组件
export const commit_designer_selectedComponent =
    "commit_designer_selectedComponent";
type payload_designer_selectedComponent = {
    component: IDesignerComponent;
};

const componentList = registerComponent();
// console.log("componentList", componentList);

const DesignerModule = <Module<IDesignerModuleState, any>>{
    namespaced: true,
    state: () => ({
        menus: [],
        pages: [],
        selectedPage: undefined,
        selectedPageComponentList: [],
        selectedComponent: undefined,
        componentList: componentList,
    }),
    getters: {
        pages: (state) => state.pages || [],
        componentList: (state) => state.componentList || [],
        selectedPage: (state) => state.selectedPage,
        selectedPageComponentList: (state) => state.selectedPageComponentList,
        selectedComponent: (state) => state.selectedComponent,
        dragComponent: (state) => state.dragComponent,
    },
    mutations: {
        [commit_designer_add_page]: (
            state,
            payload?: payload_designer_add_page
        ) => {
            if (payload && payload.page) {
                state.pages.push(payload.page);
            } else {
                const newPage = getDefaultPageModule();
                newPage.name = "page" + (state.pages.length + 1);
                state.pages.push(newPage);
            }
        },
        [commit_designer_init_page]: (
            state,
            payload: payload_designer_add_page
        ) => {
            if (payload.page) {
                state.pages.push(payload.page);
                state.selectedPage = payload.page;
            }
        },
        [commit_designer_init_designer_page]: (state) => {
            const newPage = getDefaultPageModule();
            newPage.selected = true;
            state.pages.push(newPage);
            state.selectedPage = newPage;
        },
        [commit_designer_setSelectPage]: (
            state,
            payload: payload_designer_setSelectPage
        ) => {
            state.pages.forEach((page) => {
                page.selected = page.id === payload.pageId;
                if (page.id === payload.pageId) {
                    state.selectedPage = page;
                }
            });
        },
        // 设计面板拖入组件
        [commit_designer_dragAddComponent]: (
            state,
            payload: payload_designer_dragAddComponent
        ) => {
            // console.log("dragIntoComponent", payload.component);
            if (payload.parent) {
                state.selectedPageComponentList.push(payload.component);
                state.selectedComponent = payload.component;
            }
        },
        // 设置选中的拖动组件
        [commit_designer_setDragComponent]: (
            state,
            payload: payload_designer_setDragComponent
        ) => {
            state.dragComponent = payload.component;
        },
        [commit_designer_selectedComponent]: (
            state,
            payload: payload_designer_selectedComponent
        ) => {
            state.selectedComponent = payload.component;
        },
    },
};

export default DesignerModule;
