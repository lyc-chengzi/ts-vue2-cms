import { CreateElement, VNode } from "vue";
import { IComponentConfig } from "./cmsComponents";

export type factoryRenderFunc = (
    createElement: CreateElement,
    element?: IComponentConfig
) => VNode | undefined;
export type componentRenderFunc = (
    createElement: CreateElement,
    element: IComponentConfig,
    factory: factoryRenderFunc
) => VNode | undefined;
