import { IComponentConfig } from "../cmsComponents";
import { IPageModuleState } from "../cmsComponents/page";

export interface IDesignerComponent extends IComponentConfig {
    title: string;
    icon?: string;
}

export type registerComponentFunc = () => IDesignerComponent;

export interface IAppModuleState {
    itcode: string;
    access: boolean;
}

export interface IDesignerModuleState {
    menus: any[];
    pages: IPageModuleState[]; // 所有页面
    selectedPage?: IPageModuleState; // 当前显示页面
    selectedPageComponentList: IDesignerComponent[]; // 当前页面所有组件列表
    selectedComponent?: IDesignerComponent; // 当前页面所选择的组件
    dragComponent?: IDesignerComponent;
    componentList: IDesignerComponent[]; // 所有组件列表，用于左侧拖动面板展示
}
