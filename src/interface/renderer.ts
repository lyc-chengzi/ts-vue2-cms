import { CreateElement, VNode } from "vue";
import { IPageJSONConfig } from "./cmsComponents";

export type factoryRenderFunc = (
    createElement: CreateElement,
    element?: IPageJSONConfig
) => VNode | undefined;
export type componentRenderFunc = (
    createElement: CreateElement,
    element: IPageJSONConfig,
    factory: factoryRenderFunc
) => VNode | undefined;
