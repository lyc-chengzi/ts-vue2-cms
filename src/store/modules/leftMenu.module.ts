import { IMenus } from "@/interface/cmsDesigner/leftPanel";
import { ILeftMenuModuleState } from "@/interface/cmsDesigner/leftPanel";
import { Module } from "vuex";

// 左侧菜单选中
export const commit_leftMenu_selectMenu = "commit_leftMenu_selectMenu";
type commit_leftMenu_selectMenu_payload = {
    menu: IMenus;
};

const LeftMenuModule = <Module<ILeftMenuModuleState, any>>{
    namespaced: true,
    state: () => ({
        menus: [
            {
                level: 1,
                key: "pageList",
                title: "页面列表",
                icon: "desktop",
                selected: true,
            },
            {
                level: 1,
                key: "componentList",
                title: "组件列表",
                icon: "appstore",
                selected: false,
            },
            {
                level: 1,
                key: "pageStructure",
                title: "页面结构",
                icon: "appstore",
                selected: false,
            },
        ],
        selectedMenuId: "pageList",
    }),
    getters: {
        // 一级菜单列表
        menus: (state) => {
            return state.menus;
        },
        // 选中的一级菜单
        selectedMenu: (state) => {
            // 选中一级菜单
            const menu = state.menus.find((c) => c.selected === true);
            if (menu) {
                return menu;
            } else {
                return null;
            }
        },
    },
    mutations: {
        [commit_leftMenu_selectMenu]: (
            state,
            payload: commit_leftMenu_selectMenu_payload
        ) => {
            const menu = payload.menu;
            state.menus.forEach((c) => {
                // 将当前菜单selected属性设为true
                c.selected = c.key === menu.key;
                if (c.key === menu.key) {
                    // 并修改选中id列表
                    state.selectedMenuId = menu.key;
                }
            });
        },
    },
};

export default LeftMenuModule;
