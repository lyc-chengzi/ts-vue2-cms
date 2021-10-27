import { EnumComponentType } from "@/enum";
import { IDesignerComponent } from "../cmsDesigner";
import { IButtonProps } from "./button";
import { IInputProps } from "./input";
import { IPageModuleState } from "./page";
import { IRateProps } from "./rate";

export interface IAPPStateModule {
    menus: any[];
    pages: IPageModuleState[];
    currentPage?: IPageModuleState;
    itcode: string;
    componentList: IDesignerComponent[];
}

export interface IComponentConfig {
    id: string;
    name: string;
    type: EnumComponentType;
    children?: IComponentConfig[];
    apis?: string[];
    props?: IButtonProps | IInputProps | IRateProps;
    css?: Record<string, string>;
    style?: string;
    events?: IComponentEvent;
}

export interface IComponentEvent {
    onClick?: (e: Event, component: Vue) => void;
    onFocus?: (e: Event, component: Vue) => void;
}
